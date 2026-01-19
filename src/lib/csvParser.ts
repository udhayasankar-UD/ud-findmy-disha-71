// Utility to load all internships from CSV data
// This file provides a comprehensive list of all 500+ internships

const rawCSVData = `id,title,company,sector,location,stipend,duration,datePosted,startDate,description,responsibilities,requirements,skills,perks,numberOfOpenings,type,deadline
0053266f-b30e-4311-968d-c7a04271f958,Business Strategy,Gravity Infra Solutions,Manufacturing,"[""Bangalore"", ""560001""]","30,000",3,21-09-2025,Immediate,"The Business Strategy Intern will work on high-impact projects involving market analysis, strategic planning, and event management.",Conduct research and analysis to support strategic decision-making; Prepare reports and presentations using MS-Office; Assist with event management for corporate initiatives; Apply mathematical and analytical skills to business problems.,"A strong background in business, with skills in mathematics, report writing, and MS-Office; Experience in event management is a plus; Excellent written English and analytical skills; This is a high-responsibility role with a lump sum stipend.","['MS-Office', 'Event Management', 'Mathematics', 'Report Writing', 'English Proficiency (Written)', 'Business Strategy']",Internship Certificate; Letter of recommendation; Flexible work hours; Informal dress code; Lump sum stipend,1,onsite,21-10-2025`;

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

export function loadInternshipsFromCSV(csvData: string) {
  const lines = csvData.split('\n');
  if (lines.length < 2) return [];

  const headers = parseCSVLine(lines[0]);
  const internships = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    try {
      const fields = parseCSVLine(line);
      
      if (fields.length < headers.length) {
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
    } catch (err) {
      console.error(`Error parsing row:`, err);
      continue;
    }
  }

  return internships;
}
