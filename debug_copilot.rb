#!/usr/bin/env ruby

require 'json'
require 'digest'

# Debug script to understand Co-Pilot embeddings structure
class CopilotDebugger
  def initialize
    @vault_path = File.expand_path('../.obsidian', __dir__)
    @copilot_file = find_copilot_file
  end
  
  def debug
    puts "=== Co-Pilot Embeddings Debug ==="
    puts "Vault path: #{@vault_path}"
    puts "Co-Pilot file: #{@copilot_file}"
    puts
    
    return unless @copilot_file && File.exist?(@copilot_file)
    
    # File stats
    file_size = File.size(@copilot_file)
    puts "File size: #{(file_size / (1024.0 * 1024)).round(1)} MB"
    puts
    
    # Parse JSON structure
    puts "Parsing JSON structure..."
    begin
      data = JSON.parse(File.read(@copilot_file))
      analyze_structure(data)
      
      # Try to find notes mapping
      find_note_mappings(data)
      
    rescue => e
      puts "Error parsing JSON: #{e.message}"
      
      # Try to parse incrementally
      puts "\nTrying incremental parse..."
      analyze_raw_content
    end
  end
  
  private
  
  def find_copilot_file
    copilot_files = Dir.glob(File.join(@vault_path, 'copilot-index-*.json'))
    copilot_files.max_by { |f| File.mtime(f) }
  end
  
  def analyze_structure(data)
    puts "Main JSON keys:"
    data.keys.each do |key|
      value = data[key]
      type = value.class.name
      size = value.respond_to?(:size) ? value.size : 'unknown'
      puts "  #{key}: #{type} (size: #{size})"
    end
    puts
    
    # Analyze internalDocumentIDStore
    if data['internalDocumentIDStore']
      analyze_document_store(data['internalDocumentIDStore'])
    end
    
    # Look for vector data
    analyze_vectors(data)
  end
  
  def analyze_document_store(store)
    puts "Document ID Store:"
    store.keys.each do |key|
      value = store[key]
      puts "  #{key}: #{value.class.name}"
      
      if key == 'internalIdToId' && value.is_a?(Array)
        puts "    First 5 IDs: #{value.first(5)}"
        puts "    Total documents: #{value.size}"
      end
    end
    puts
  end
  
  def analyze_vectors(data)
    puts "Looking for vector data..."
    
    # Common keys where vectors might be stored
    vector_keys = ['vectorStore', 'vectors', 'embeddings', 'index']
    
    vector_keys.each do |key|
      if data[key]
        puts "Found #{key}:"
        analyze_vector_structure(data[key], key)
      end
    end
    
    # Look for nested vector data
    data.each do |key, value|
      next unless value.is_a?(Hash)
      
      value.each do |subkey, subvalue|
        if subkey.include?('vector') || subkey.include?('embedding')
          puts "Found potential vectors at #{key}.#{subkey}:"
          puts "  Type: #{subvalue.class.name}"
          puts "  Size: #{subvalue.size if subvalue.respond_to?(:size)}"
        end
      end
    end
  end
  
  def analyze_vector_structure(vectors, key_name)
    puts "  Type: #{vectors.class.name}"
    
    if vectors.is_a?(Hash)
      puts "  Hash keys: #{vectors.keys.first(5)}"
      
      # Sample a value to see if it's a vector
      sample_key = vectors.keys.first
      if sample_key
        sample_value = vectors[sample_key]
        puts "  Sample value type: #{sample_value.class.name}"
        
        if sample_value.is_a?(Array) && sample_value.first.is_a?(Numeric)
          puts "  Sample vector length: #{sample_value.size}"
          puts "  Sample values: #{sample_value.first(5)}"
        end
      end
      
    elsif vectors.is_a?(Array)
      puts "  Array length: #{vectors.size}"
      
      if vectors.first.is_a?(Array)
        puts "  Sample vector length: #{vectors.first.size}"
        puts "  Sample values: #{vectors.first.first(5)}"
      end
    end
    puts
  end
  
  def analyze_raw_content
    File.open(@copilot_file, 'r') do |file|
      # Read first 50KB to understand structure
      content = file.read(50_000)
      
      puts "First 1000 characters:"
      puts content[0..1000]
      puts "\n" + "="*50 + "\n"
      
      # Look for key patterns
      patterns = [
        /"vectorStore"/,
        /"vectors"/,
        /"embeddings"/,
        /"index"/,
        /\[[\d\.\-,\s]+\]/  # Array of numbers (potential vectors)
      ]
      
      patterns.each do |pattern|
        matches = content.scan(pattern)
        puts "Pattern #{pattern}: #{matches.size} matches"
      end
    end
  end
  
  def find_note_mappings(data)
    puts "\n=== Trying to map to Jekyll notes ==="
    
    notes_dir = File.join(File.dirname(@vault_path), 'Website', '_notes')
    return unless Dir.exist?(notes_dir)
    
    note_files = Dir.glob(File.join(notes_dir, '**', '*.md'))
    puts "Found #{note_files.size} Jekyll notes"
    
    # Sample a few notes and try to find them in the embeddings
    note_files.first(3).each do |note_file|
      puts "\nAnalyzing note: #{File.basename(note_file)}"
      
      content = File.read(note_file)
      content_hash = Digest::MD5.hexdigest(content)
      basename = File.basename(note_file, '.md')
      
      puts "  Content hash: #{content_hash}"
      puts "  Basename: #{basename}"
      
      # Check if we can find this in the document IDs
      if data['internalDocumentIDStore'] && data['internalDocumentIDStore']['internalIdToId']
        ids = data['internalDocumentIDStore']['internalIdToId']
        
        # Try various matching strategies
        exact_match = ids.include?(content_hash)
        partial_match = ids.any? { |id| id.include?(basename) || basename.include?(id) }
        
        puts "  Exact hash match: #{exact_match}"
        puts "  Partial name match: #{partial_match}"
        
        if partial_match
          matching_id = ids.find { |id| id.include?(basename) || basename.include?(id) }
          puts "  Matching ID: #{matching_id}"
        end
      end
    end
  end
end

# Run the debugger
debugger = CopilotDebugger.new
debugger.debug