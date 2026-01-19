import internshipsRawCSV from '../data/internships_rows.csv?raw';

export interface Internship {
  id: string;
  title: string;
  company: string;
  sector: string;
  location: string;
  stipend: number;
  duration: number;
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
  final_score?: number;
}

function parseStipend(stipendStr: string): number {
  if (!stipendStr || stipendStr.trim() === '') return 0;
  return parseInt(stipendStr.replace(/,/g, ''));
}

function parseLocation(locationStr: string): string {
  try {
    // Location format: ["City", "Pincode"]
    const cleaned = locationStr.trim().replace(/[\[\]"]/g, '');
    const parts = cleaned.split(',');
    return parts[0]?.trim() || locationStr;
  } catch {
    return locationStr;
  }
}

function parseArrayField(fieldStr: string): string[] {
  if (!fieldStr || fieldStr.trim() === '') return [];
  try {
    const normalized = fieldStr.replace(/'/g, '"');
    const parsed = JSON.parse(normalized);
    return Array.isArray(parsed) ? parsed : [fieldStr];
  } catch {
    if (fieldStr.includes(';')) {
      return fieldStr.split(';').map(s => s.trim());
    }
    return [fieldStr];
  }
}

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
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

export function parseCSVData(csvContent: string): Internship[] {
  const lines = csvContent.split('\n').filter(line => line.trim());
  
  if (lines.length < 2) {
    console.warn('CSV file appears to be empty or malformed');
    return [];
  }

  const headers = parseCSVLine(lines[0]).map(h => h.trim());
  const internships: Internship[] = [];

  for (let i = 1; i < lines.length; i++) {
    try {
      const values = parseCSVLine(lines[i]);
      const row: Record<string, string> = {};

      headers.forEach((header, idx) => {
        row[header] = values[idx]?.replace(/^"|"$/g, '') || '';
      });

      const internship: Internship = {
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
        type: row.type || 'onsite',
        deadline: row.deadline,
        final_score: 75 // Default score for matching
      };

      internships.push(internship);
    } catch (error) {
      console.error(`Error parsing line ${i + 1}:`, error);
      continue;
    }
  }

  return internships;
}

let cachedInternships: Internship[] | null = null;

export async function loadAllInternships(): Promise<Internship[]> {
  if (cachedInternships && cachedInternships.length > 0) {
    return cachedInternships;
  }

  try {
    const internships = parseCSVData(internshipsRawCSV);
    cachedInternships = internships;
    console.log(`✓ Loaded ${internships.length} internships from CSV`);
    return internships;
  } catch (error) {
    console.error('Error loading internships:', error);
    return [];
  }
}

export function getInternshipById(id: string, internships: Internship[]): Internship | undefined {
  return internships.find(i => i.id === id);
}
