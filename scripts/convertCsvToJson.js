#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const CSV_FILE = path.join(__dirname, '../src/data/internships_rows.csv');
const JSON_FILE = path.join(__dirname, '../src/data/internships.json');

async function parseCSVToJSON() {
  const fileStream = fs.createReadStream(CSV_FILE);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let headers = [];
  let internships = [];
  let lineNumber = 0;

  for await (const line of rl) {
    lineNumber++;

    if (lineNumber === 1) {
      // Parse header
      headers = parseCSVLine(line);
      continue;
    }

    try {
      const fields = parseCSVLine(line);
      
      if (fields.length < headers.length) {
        console.warn(`Skipping line ${lineNumber}: insufficient fields`);
        continue;
      }

      // Parse stipend to numeric
      let stipend_numeric = null;
      const stipendStr = fields[headers.indexOf('stipend')] || '';
      const numMatch = stipendStr.match(/(\d+)/);
      if (numMatch) {
        stipend_numeric = parseInt(numMatch[0]);
      }

      // Parse location
      let location = fields[headers.indexOf('location')] || '';
      if (location.includes('[') && location.includes('"')) {
        try {
          const locArray = JSON.parse(location.replace(/'/g, '"'));
          location = Array.isArray(locArray) ? locArray[0] : location;
        } catch (e) {
          // Keep original
        }
      }

      // Parse skills array
      let skills = [];
      const skillsStr = fields[headers.indexOf('skills')] || '';
      if (skillsStr) {
        try {
          skills = JSON.parse(skillsStr.replace(/'/g, '"'));
        } catch (e) {
          skills = [];
        }
      }

      const internship = {
        id: fields[headers.indexOf('id')] || `intern-${lineNumber}`,
        title: fields[headers.indexOf('title')] || '',
        company: fields[headers.indexOf('company')] || '',
        sector: fields[headers.indexOf('sector')] || '',
        location: location,
        stipend: fields[headers.indexOf('stipend')] || '',
        stipend_numeric: stipend_numeric,
        duration: fields[headers.indexOf('duration')] || '',
        datePosted: fields[headers.indexOf('datePosted')] || '',
        startDate: fields[headers.indexOf('startDate')] || '',
        description: fields[headers.indexOf('description')] || '',
        responsibilities: fields[headers.indexOf('responsibilities')] || '',
        requirements: fields[headers.indexOf('requirements')] || '',
        skills: skills,
        perks: fields[headers.indexOf('perks')] || '',
        numberOfOpenings: parseInt(fields[headers.indexOf('numberOfOpenings')] || '1') || 1,
        type: (fields[headers.indexOf('type')] || 'onsite').toLowerCase(),
        deadline: fields[headers.indexOf('deadline')] || '',
      };

      internships.push(internship);
    } catch (err) {
      console.error(`Error parsing line ${lineNumber}:`, err.message);
    }
  }

  // Write to JSON file
  const output = { internships };
  fs.writeFileSync(JSON_FILE, JSON.stringify(output, null, 2));
  console.log(`✅ Successfully converted ${internships.length} internships to JSON!`);
  console.log(`📝 Output file: ${JSON_FILE}`);
}

function parseCSVLine(line) {
  const fields = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      fields.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  fields.push(current.trim());

  return fields;
}

parseCSVToJSON().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
