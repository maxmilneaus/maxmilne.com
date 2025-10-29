#!/usr/bin/env python3

import json
import re
import os
from pathlib import Path

class CopilotAnalyzer:
    def __init__(self, vault_path):
        self.vault_path = Path(vault_path)
        self.copilot_file = self.find_copilot_file()
        
    def find_copilot_file(self):
        obsidian_dir = self.vault_path / '.obsidian'
        copilot_files = list(obsidian_dir.glob('copilot-index-*.json'))
        
        if not copilot_files:
            return None
            
        # Return the most recent file
        return max(copilot_files, key=lambda f: f.stat().st_mtime)
    
    def analyze(self):
        if not self.copilot_file:
            print("No Co-Pilot embeddings file found")
            return
            
        print(f"=== Analyzing {self.copilot_file.name} ===")
        file_size = self.copilot_file.stat().st_size / (1024 * 1024)
        print(f"File size: {file_size:.1f} MB")
        print()
        
        # Parse structure incrementally
        self.parse_structure()
        
        # Extract document IDs
        doc_ids = self.extract_document_ids()
        print(f"Found {len(doc_ids)} document IDs")
        
        # Look for vector data
        self.find_vector_data()
        
        # Try to map to actual notes
        self.map_to_notes(doc_ids[:10])  # Sample first 10
        
    def parse_structure(self):
        print("=== File Structure Analysis ===")
        
        with open(self.copilot_file, 'r') as f:
            # Read enough to find main structure
            content = f.read(100000)
            
            # Find main sections
            sections = []
            
            # internalDocumentIDStore
            if '"internalDocumentIDStore"' in content:
                sections.append('internalDocumentIDStore')
                
            # index section
            if '"index":' in content:
                sections.append('index')
                
            # Look for potential vector sections
            potential_sections = re.findall(r'"([^"]+)":\s*{[^}]{50,}', content)
            sections.extend([s for s in potential_sections if s not in sections])
            
        print(f"Main sections found: {sections}")
        print()
        
    def extract_document_ids(self):
        print("=== Extracting Document IDs ===")
        
        with open(self.copilot_file, 'r') as f:
            content = f.read(100000)  # Should be enough for the ID array
            
            # Extract the internalIdToId array
            id_match = re.search(r'"internalIdToId":\s*\[(.*?)\]', content, re.DOTALL)
            if id_match:
                id_string = id_match.group(1)
                # Extract individual IDs
                ids = re.findall(r'"([a-f0-9]{32})"', id_string)
                return ids
                
        return []
    
    def find_vector_data(self):
        print("=== Looking for Vector Data ===")
        
        # Since the file is too large to parse as JSON, let's look for patterns
        with open(self.copilot_file, 'r') as f:
            # Skip the document ID section
            f.seek(60000)  # Start after the IDs
            
            # Read chunks and look for vector patterns
            chunk_size = 50000
            chunk_count = 0
            max_chunks = 10
            
            while chunk_count < max_chunks:
                chunk = f.read(chunk_size)
                if not chunk:
                    break
                    
                # Look for arrays of numbers (potential vectors)
                vector_patterns = re.findall(r'\[[\d\.\-e,\s]{100,}\]', chunk)
                if vector_patterns:
                    print(f"Found {len(vector_patterns)} potential vectors in chunk {chunk_count}")
                    
                    # Analyze first vector
                    if vector_patterns:
                        sample_vector = vector_patterns[0]
                        numbers = re.findall(r'[\d\.\-e]+', sample_vector)
                        print(f"  Sample vector length: {len(numbers)}")
                        if numbers:
                            print(f"  Sample values: {numbers[:5]}")
                
                chunk_count += 1
                
        print()
    
    def map_to_notes(self, doc_ids):
        print("=== Mapping to Jekyll Notes ===")
        
        notes_dir = self.vault_path / 'Website' / '_notes'
        if not notes_dir.exists():
            print(f"Notes directory not found: {notes_dir}")
            return
            
        note_files = list(notes_dir.glob('**/*.md'))
        print(f"Found {len(note_files)} note files")
        
        for doc_id in doc_ids[:3]:  # Test first 3
            print(f"\nTrying to map document ID: {doc_id[:16]}...")
            
            # Try different mapping strategies
            found = False
            
            for note_file in note_files:
                # Strategy 1: Check if ID appears in filename
                if doc_id in note_file.name:
                    print(f"  Found filename match: {note_file.name}")
                    found = True
                    break
                    
                # Strategy 2: Check content hash
                try:
                    import hashlib
                    content = note_file.read_text(encoding='utf-8')
                    content_hash = hashlib.md5(content.encode()).hexdigest()
                    if content_hash == doc_id:
                        print(f"  Found content hash match: {note_file.name}")
                        found = True
                        break
                except:
                    continue
            
            if not found:
                print(f"  No mapping found for {doc_id[:16]}")

if __name__ == "__main__":
    vault_path = "/Users/maxmilne/Library/Mobile Documents/iCloud~md~obsidian/Documents/aVault"
    analyzer = CopilotAnalyzer(vault_path)
    analyzer.analyze()