// src/pages/Internships.tsx

import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, Filter } from "lucide-react";
import Layout from "@/components/Layout";
import axios from "axios";
import InternshipCard from "@/components/InternshipCard";

// Define the type for a single internship
interface Internship {
  id: string;
  title: string;
  company: string;
  location: string;
  stipend: string;
  stipend_numeric: number | null;
  duration: string;
  sector: string;
  skills: string | string[];
  type: string;
  dateposted?: string | null;
  deadline?: string | null;
}

// The new, detailed filter options
const filterOptions = {
  location: ["New Delhi", "Mumbai", "Bengaluru", "Hyderabad", "Chennai", "Pune", "Remote"],
  workType: ["Full-time", "Remote", "Hybrid", "Part-time"],
  duration: ["1-3 months", "3-6 months", "6+ months"],
  stipend: ["Under ₹15k", "₹15k - ₹25k", "₹25k - ₹35k", "Above ₹35k"],
  skills: ["Python", "JavaScript", "React", "Node.js", "SQL", "Data Analysis", "Digital Marketing", "UI Design", "Content Writing", "Research"]
};

// --- Helper Functions for Filtering ---
const parseStipendRange = (range: string): { min: number; max: number } => {
    if (range.startsWith("Under")) return { min: 0, max: 15000 };
    if (range.startsWith("Above")) return { min: 35000, max: Infinity };
    const [min, max] = range.replace(/₹|k/g, '').split(' - ').map(s => parseInt(s, 10) * 1000);
    return { min, max };
};

const parseDurationRange = (range: string): { min: number; max: number } => {
    if (range.includes('+')) return { min: 6, max: Infinity };
    const [min, max] = range.replace(/ months/g, '').split('-').map(s => parseInt(s, 10));
    return { min, max };
};

const getDurationInMonths = (durationStr: string): number => {
    const num = parseInt(durationStr, 10);
    return isNaN(num) ? 0 : num;
}

const Internships = () => {
  // State for UI controls
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    location: [] as string[], workType: [] as string[],
    duration: [] as string[], stipend: [] as string[],
    skills: [] as string[],
  });
  const [visibleCount, setVisibleCount] = useState(10); // State for pagination

  // --- Data Fetching with React Query for Caching ---
  const fetchInternships = async (): Promise<Internship[]> => {
    const { data } = await axios.get('http://127.0.0.1:8000/internships');
    return data.internships.map((internship: any) => {
        let parsedSkills = [];
        if (typeof internship.skills === 'string') {
            try {
                parsedSkills = JSON.parse(internship.skills.replace(/'/g, '"'));
            } catch (e) { console.error("Could not parse skills:", internship.skills); }
        }
        return { ...internship, skills: parsedSkills };
    });
  };

  const { data: internships = [], isLoading, error } = useQuery({
    queryKey: ['internships'],
    queryFn: fetchInternships,
  });

  const handleFilterChange = (category: keyof typeof selectedFilters, value: string, checked: boolean) => {
    setSelectedFilters(prev => ({
      ...prev,
      [category]: checked
        ? [...prev[category], value]
        : prev[category].filter(item => item !== value)
    }));
    setVisibleCount(10); // Reset pagination on filter change
  };
  
  const clearAllFilters = () => {
    setSelectedFilters({ location: [], workType: [], duration: [], stipend: [], skills: [] });
    setVisibleCount(10);
  };

  // --- Memoized Filtering Logic ---
  const filteredInternships = useMemo(() => {
    return internships
      .filter(internship => {
        // Search Query Filter
        const matchesSearch = internship.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              internship.company.toLowerCase().includes(searchQuery.toLowerCase());
        if (!matchesSearch) return false;

        // Checkbox Filters
        const matchesLocation = selectedFilters.location.length === 0 || 
                                selectedFilters.location.some(loc => internship.location.includes(loc));
        if (!matchesLocation) return false;

        const matchesWorkType = selectedFilters.workType.length === 0 || 
                                selectedFilters.workType.includes(internship.type);
        if (!matchesWorkType) return false;

        const matchesSkills = selectedFilters.skills.length === 0 || 
                              selectedFilters.skills.some(skill => Array.isArray(internship.skills) && internship.skills.includes(skill));
        if (!matchesSkills) return false;

        // Range Filters
        const matchesStipend = selectedFilters.stipend.length === 0 || 
                               selectedFilters.stipend.some(range => {
                                   const { min, max } = parseStipendRange(range);
                                   const stipend = internship.stipend_numeric ?? 0;
                                   return stipend >= min && stipend < max;
                               });
        if (!matchesStipend) return false;

        const matchesDuration = selectedFilters.duration.length === 0 ||
                                selectedFilters.duration.some(range => {
                                    const { min, max } = parseDurationRange(range);
                                    const durationMonths = getDurationInMonths(internship.duration);
                                    return durationMonths >= min && durationMonths <= max;
                                });
        if (!matchesDuration) return false;

        return true;
      });
  }, [internships, searchQuery, selectedFilters]);

  const activeFiltersCount = Object.values(selectedFilters).flat().length;
  const paginatedInternships = filteredInternships.slice(0, visibleCount);

  return (
    <Layout>
      <div className="bg-background">
        <div className="container mx-auto px-4 py-6">
          <div className="mb-6">
            {/* Header and Search UI ... */}
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            {/* Filters Sidebar */}
            <div className="w-full md:w-64 flex-shrink-0">
              <Card>
                <CardHeader className="pb-3 flex flex-row items-center justify-between">
                  <CardTitle className="text-base font-semibold">Filters</CardTitle>
                  {activeFiltersCount > 0 && <Button variant="ghost" size="sm" onClick={clearAllFilters} className="text-xs">Clear All</Button>}
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(filterOptions).map(([category, options]) => (
                    <div key={category}>
                      <h4 className="font-medium text-sm mb-2 capitalize">{category.replace('workType', 'Work Type')}</h4>
                      <div className="space-y-2">
                        {options.map((option) => (
                          <div key={option} className="flex items-center space-x-2">
                            <Checkbox
                              id={`${category}-${option}`}
                              checked={selectedFilters[category as keyof typeof selectedFilters].includes(option)}
                              onCheckedChange={(checked) => handleFilterChange(category as keyof typeof selectedFilters, option, checked as boolean)}
                            />
                            <label htmlFor={`${category}-${option}`} className="text-sm cursor-pointer">{option}</label>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Internships List */}
            <div className="flex-1">
              {isLoading ? (
                <p className="text-muted-foreground">Loading internships...</p>
              // src/pages/Internships.tsx (Corrected)
                ) : error ? (
                  <p className="text-destructive">{typeof error === 'string' ? error : 'An unexpected error occurred.'}</p>
                ) : (
                <>
                  <div className="mb-4 text-sm text-gray-600">Showing {paginatedInternships.length} of {filteredInternships.length} internships</div>
                  <div className="space-y-4">
                    {paginatedInternships.map((internship) => (
                      <InternshipCard
                        description={""} key={internship.id}
                        {...internship}
                        stipend={internship.stipend_numeric ? `₹${internship.stipend_numeric.toLocaleString()}/month` : 'Varies'}
                        skills={Array.isArray(internship.skills) ? internship.skills : []}                      />
                    ))}
                  </div>
                  {visibleCount < filteredInternships.length && (
                    <div className="text-center mt-8">
                      <Button variant="outline" className="px-8" onClick={() => setVisibleCount(prev => prev + 10)}>
                        Load More Internships
                      </Button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Internships;