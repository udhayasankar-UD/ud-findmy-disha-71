import fs from 'fs';
import path from 'path';
import readline from 'readline';

const CSV_FILE = './src/data/internships_rows.csv';
const JSON_FILE = './src/data/internships.json';

function parseStipend(stipendStr) {
  if (!stipendStr || stipendStr.trim() === '') return 0;
  return parseInt(stipendStr.replace(/,/g, ''));
}

function parseLocation(locationStr) {
  try {
    // Remove brackets and quotes
    locationStr = locationStr.trim().slice(1, -1);
    // Split by comma and get first part
    const parts = locationStr.split(',');
    if (parts.length > 0) {
      return parts[0].trim().slice(1, -1); // Remove quotes
    }
    return locationStr;
  } catch {
    return locationStr;
  }
}

function parseArrayField(fieldStr) {
  if (!fieldStr || fieldStr.trim() === '') return [];
  try {
    // Replace single quotes with double quotes
    fieldStr = fieldStr.replace(/'/g, '"');
    return JSON.parse(fieldStr);
  } catch {
    if (fieldStr.includes(';')) {
      return fieldStr.split(';').map(s => s.trim());
    }
    return [fieldStr];
  }
}

function parseCSVLine(line) {
  const result = [];
  let current = '';
  let insideQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      insideQuotes = !insideQuotes;
      current += char;
    } else if (char === ',' && !insideQuotes) {
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }

  if (current) {
    result.push(current);
  }

  return result;
}

async function convertCSVToJSON() {
  const fileStream = fs.createReadStream(CSV_FILE);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  const internships = [];
  let headers = [];
  let lineCount = 0;

  for await (const line of rl) {
    if (lineCount === 0) {
      headers = parseCSVLine(line).map(h => h.trim());
    } else {
      const values = parseCSVLine(line).map(v => v.trim().slice(1, -1)); // Remove quotes
      const row = {};

      headers.forEach((header, i) => {
        row[header] = values[i] || '';
      });

      const internship = {
        id: row.id,
        title: row.title,
        company: row.company,
        sector: row.sector,
        location: parseLocation(row.location),
        stipend: parseStipend(row.stipend),
        duration: parseInt(row.duration) || 0,
        datePosted: row.datePosted,
        startDate: row.startDate,
        description: row.description,
        responsibilities: row.responsibilities,
        requirements: row.requirements,
        skills: parseArrayField(row.skills),
        perks: row.perks,
        numberOfOpenings: parseInt(row.numberOfOpenings) || 1,
        type: row.type,
        deadline: row.deadline,
        final_score: 75 // Default score for AI matching
      };

      internships.push(internship);
    }

    lineCount++;
  }

  // Write to JSON file
  fs.writeFileSync(JSON_FILE, JSON.stringify(internships, null, 2));

  console.log(`✓ Successfully converted CSV to JSON`);
  console.log(`✓ Total internships: ${internships.length}`);
  console.log(`✓ Output file: ${JSON_FILE}`);
}

convertCSVToJSON().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
