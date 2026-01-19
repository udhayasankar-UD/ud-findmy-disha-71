// This file helps convert CSV data to JSON format
// Run this to generate the internships-full.json file

const fs = require('fs');
const path = require('path');
const csv = require('csv-parse/sync');

// Read the CSV file
const csvData = fs.readFileSync(path.join(__dirname, 'internships_rows.csv'), 'utf-8');

// Parse CSV
const records = csv.parse(csvData, {
  columns: true,
  skip_empty_lines: true,
});

// Transform records
const internships = records.map((record) => {
  // Parse stipend
  let stipend_numeric = null;
  if (record.stipend) {
    const numMatch = record.stipend.match(/(\d+)/);
    if (numMatch) {
      stipend_numeric = parseInt(numMatch[0]);
    }
  }

  // Parse location
  let location = record.location;
  if (location && location.includes('[')) {
    try {
      const locArray = JSON.parse(location.replace(/"/g, '"'));
      location = Array.isArray(locArray) ? locArray[0] : location;
    } catch (e) {
      // Keep original if parse fails
    }
  }

  // Parse skills
  let skills = [];
  if (record.skills) {
    try {
      skills = JSON.parse(record.skills.replace(/'/g, '"'));
    } catch (e) {
      skills = [];
    }
  }

  return {
    id: record.id,
    title: record.title,
    company: record.company,
    sector: record.sector,
    location: location,
    stipend: record.stipend,
    stipend_numeric: stipend_numeric,
    duration: record.duration,
    datePosted: record.datePosted,
    startDate: record.startDate,
    description: record.description,
    responsibilities: record.responsibilities,
    requirements: record.requirements,
    skills: skills,
    perks: record.perks,
    numberOfOpenings: parseInt(record.numberOfOpenings) || 1,
    type: record.type?.toLowerCase() || 'onsite',
    deadline: record.deadline,
  };
});

// Write the output
const output = {
  internships: internships,
};

fs.writeFileSync(
  path.join(__dirname, 'internships-full.json'),
  JSON.stringify(output, null, 2)
);

console.log(`Converted ${internships.length} internships to internships-full.json`);
