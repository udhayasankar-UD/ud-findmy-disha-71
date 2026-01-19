#!/usr/bin/env python3
import csv
import json
import sys
import re

def parse_stipend(stipend_str):
    """Parse stipend string to number"""
    if not stipend_str or stipend_str.strip() == '':
        return 0
    # Remove commas and convert to int
    return int(stipend_str.replace(',', ''))

def parse_location(location_str):
    """Extract city from location array format"""
    # Location format: ["City", "Pincode"]
    try:
        # Remove quotes and brackets
        location_str = location_str.strip('[]"')
        # Split by comma and get first part
        parts = location_str.split(',')
        if parts:
            city = parts[0].strip().strip('"')
            return city
        return location_str
    except:
        return location_str

def parse_array_field(field_str):
    """Parse array field like skills which are in JSON format"""
    if not field_str or field_str.strip() == '':
        return []
    try:
        # Replace single quotes with double quotes if needed
        field_str = field_str.replace("'", '"')
        # Try to parse as JSON array
        return json.loads(field_str)
    except:
        # If parsing fails, return as-is or split by semicolon
        if ';' in field_str:
            return [s.strip() for s in field_str.split(';')]
        return [field_str]

def convert_csv_to_json(csv_file, json_file):
    """Convert CSV to JSON"""
    internships = []
    
    with open(csv_file, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            # Parse skills array
            skills = parse_array_field(row.get('skills', '[]'))
            
            internship = {
                'id': row.get('id', ''),
                'title': row.get('title', ''),
                'company': row.get('company', ''),
                'sector': row.get('sector', ''),
                'location': parse_location(row.get('location', '')),
                'stipend': parse_stipend(row.get('stipend', '0')),
                'duration': int(row.get('duration', 0)),
                'datePosted': row.get('datePosted', ''),
                'startDate': row.get('startDate', ''),
                'description': row.get('description', ''),
                'responsibilities': row.get('responsibilities', ''),
                'requirements': row.get('requirements', ''),
                'skills': skills,
                'perks': row.get('perks', ''),
                'numberOfOpenings': int(row.get('numberOfOpenings', 1)),
                'type': row.get('type', 'onsite'),
                'deadline': row.get('deadline', ''),
                'final_score': 75  # Default score for AI matching
            }
            internships.append(internship)
    
    # Write to JSON file
    with open(json_file, 'w', encoding='utf-8') as f:
        json.dump(internships, f, indent=2, ensure_ascii=False)
    
    print(f"✓ Successfully converted CSV to JSON")
    print(f"✓ Total internships: {len(internships)}")
    print(f"✓ Output file: {json_file}")

if __name__ == '__main__':
    csv_file = r'd:\SIH-2025\FrontEnd\ud-findmy-disha-71\src\data\internships_rows.csv'
    json_file = r'd:\SIH-2025\FrontEnd\ud-findmy-disha-71\src\data\internships.json'
    
    try:
        convert_csv_to_json(csv_file, json_file)
    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)
        sys.exit(1)
