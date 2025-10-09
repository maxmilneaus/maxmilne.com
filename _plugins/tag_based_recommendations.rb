require 'set'

module Jekyll
  class TagBasedRecommendations < Generator
    safe true
    priority :low

    def generate(site)
      return unless should_generate?(site)
      
      puts "Generating tag-based recommendations (fallback for embeddings)..."
      
      # Process notes collection
      process_notes(site)
    end
    
    private
    
    def should_generate?(site)
      # Prefer new `recommendations` config; fall back to deprecated `embeddings_recommendations` if present
      config = site.config['recommendations'] || site.config['embeddings_recommendations'] || {}
      config.fetch('enabled', true)
    end
    
    def process_notes(site, parser = nil)
      return unless site.collections['notes']
      
      config = site.config['recommendations'] || site.config['embeddings_recommendations'] || {}
      max_recommendations = config.fetch('max_recommendations', 5)
      similarity_threshold = config.fetch('similarity_threshold', 0.1)
      
      # Build tag index for efficient lookup
      tag_index = build_tag_index(site)
      
      site.collections['notes'].docs.each do |note|
        # Skip if manually disabled
        next if note.data['exclude_from_recommendations']
        
        # Get similar notes based on tags
        similar_notes = find_similar_by_tags(note, tag_index, site, max_recommendations, similarity_threshold)
        
        # Add to note data
        note.data['similar_notes'] = similar_notes
        note.data['has_recommendations'] = !similar_notes.empty?
        
        if similar_notes.any?
          puts "  → #{note.data['title']}: #{similar_notes.size} tag-based recommendations"
        end
      end
    end
    
    def build_tag_index(site)
      tag_index = Hash.new { |h, k| h[k] = [] }
      
      site.collections['notes'].docs.each do |note|
        tags = note.data['tags'] || []
        tags.each do |tag|
          tag_index[tag.downcase] << note
        end
      end
      
      tag_index
    end
    
    def find_similar_by_tags(target_note, tag_index, site, limit, threshold = 0.1)
      target_tags = (target_note.data['tags'] || []).map(&:downcase)
      return [] if target_tags.empty?
      
      # Calculate similarity scores for all other notes
      scores = {}
      
      site.collections['notes'].docs.each do |note|
        next if note == target_note
        
        note_tags = (note.data['tags'] || []).map(&:downcase)
        next if note_tags.empty?
        
        # Calculate Jaccard similarity (intersection over union)
        intersection = (target_tags & note_tags).size
        union = (target_tags | note_tags).size
        
        similarity = intersection.to_f / union
        scores[note] = similarity if similarity > threshold # Minimum threshold
      end
      
      # Sort by similarity and return top recommendations
      scores.sort_by { |_, score| -score }
            .first(limit)
            .map do |note, score|
              {
                'title' => note.data['title'] || File.basename(note.path, '.*'),
                'url' => note.url,
                'similarity_score' => score.round(3),
                'tags' => note.data['tags'] || [],
                'date' => note.data['last_modified_at'] || note.data['date'],
                'method' => 'tag_similarity'
              }
            end
    end
  end
end
