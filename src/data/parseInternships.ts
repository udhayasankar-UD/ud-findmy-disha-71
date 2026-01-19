// Utility to parse CSV data for internships
import internshipsRowsData from './internships_rows.csv?raw';

interface ParsedInternship {
  id: string;
  title: string;
  company: string;
  sector: string;
  location: string;
  stipend: string;
  stipend_numeric: number | null;
  duration: string;
  datePosted: string;
  startDate: string;
  description: string;
  responsibilities: string;
  requirements: string;
  skills: string[];
  perks: string;
  numberOfOpenings: number;
  type: string;
  deadline: string;
}

export function parseInternshipsCsv(): ParsedInternship[] {
  const lines = internshipsRowsData.split('\n');
  
  if (lines.length < 2) return [];
  
  const headers = lines[0].split(',').map(h => h.trim());
  const internships: ParsedInternship[] = [];
  
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    try {
      // More robust CSV parsing that handles quoted fields
      const fields: string[] = [];
      let current = '';
      let inQuotes = false;
      
      for (let j = 0; j < line.length; j++) {
        const char = line[j];
        
        if (char === '"') {
          if (inQuotes && line[j + 1] === '"') {
            current += '"';
            j++;
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
      
      if (fields.length < headers.length) continue;
      
      // Parse stipend to numeric
      let stipend_numeric: number | null = null;
      const stipendStr = fields[headers.indexOf('stipend')] || '';
      const numMatch = stipendStr.match(/(\d+)/);
      if (numMatch) {
        stipend_numeric = parseInt(numMatch[0]);
      }
      
      // Parse location - handle array format
      let location = fields[headers.indexOf('location')] || '';
      if (location.includes('[') && location.includes('"')) {
        try {
          const locArray = JSON.parse(location.replace(/'/g, '"'));
          location = Array.isArray(locArray) ? locArray[0] : location;
        } catch (e) {
          // Keep original if parse fails
        }
      }
      
      // Parse skills array
      let skills: string[] = [];
      const skillsStr = fields[headers.indexOf('skills')] || '';
      if (skillsStr) {
        try {
          skills = JSON.parse(skillsStr.replace(/'/g, '"'));
        } catch (e) {
          skills = [];
        }
      }
      
      const internship: ParsedInternship = {
        id: fields[headers.indexOf('id')] || `intern-${i}`,
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
    } catch (error) {
      console.error(`Error parsing row ${i}:`, error);
      continue;
    }
  }
  
  return internships;
}

export const internshipsCsv = {
  internships: parseInternshipsCsv(),
};
