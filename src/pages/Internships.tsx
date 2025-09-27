// src/pages/Internships.tsx

import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter } from "lucide-react";
import Layout from "@/components/Layout";
import axios from "axios";
import InternshipCard from "@/components/InternshipCard";

// --- THE FIX: Correctly import all necessary pagination components ---
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis, // <-- ADDED THIS IMPORT
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePagination, DOTS } from "@/hooks/usePagination"; // This will now work

// --- (The rest of the file is the same as the previous version) ---
interface Internship {
  id: string; title: string; company: string; location: string; stipend: string;
  stipend_numeric: number | null; duration: string; sector: string;
  skills: string | string[]; type: string; dateposted?: string | null;
  deadline?: string | null; description: string;
}

const filterOptions = {
  location: ["New Delhi", "Mumbai", "Bangalore", "Hyderabad", "Chennai", "Pune", "Remote"],
  workType: ["Hybrid", "Remote", "Onsite"],
  duration: ["1-3 months", "4-6 months", "6+ months"],
  stipend: ["Under ₹15k", "₹15k - ₹25k", "₹25k - ₹35k", "Above ₹35k"],
  skills: ["Python", "JavaScript", "React", "Node.js", "SQL", "Data Analysis", "Digital Marketing", "UI Design", "Content Writing", "Research"]
};

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
const getDurationInMonths = (durationStr: string | null): number => {
  if (!durationStr) return 0;
  const num = parseInt(durationStr, 10);
  return isNaN(num) ? 0 : num;
};

const ITEMS_PER_PAGE = 7;

const Internships = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    location: [] as string[], workType: [] as string[],
    duration: [] as string[], stipend: [] as string[],
    skills: [] as string[],
  });
  const [sortBy, setSortBy] = useState("latest");
  const [currentPage, setCurrentPage] = useState(1);

  const fetchInternships = async (): Promise<Internship[]> => {
    const { data } = await axios.get('http://127.0.0.1:8000/internships');
    return data.internships.map((internship: any) => ({
      ...internship,
      skills: typeof internship.skills === 'string' ? JSON.parse(internship.skills.replace(/'/g, '"')) : [],
    }));
  };

  const { data: internships = [], isLoading, error } = useQuery({ queryKey: ['internships'], queryFn: fetchInternships });

  const filteredInternships = useMemo(() => {
    return internships.filter(internship => {
      const matchesSearch = internship.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        internship.company.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesLocation = selectedFilters.location.length === 0 ||
        selectedFilters.location.some(loc => internship.location.toLowerCase().includes(loc.toLowerCase()));
      const matchesWorkType = selectedFilters.workType.length === 0 ||
        selectedFilters.workType.some(type => internship.type?.toLowerCase() === type.toLowerCase());
      const matchesSkills = selectedFilters.skills.length === 0 ||
        selectedFilters.skills.some(skill => Array.isArray(internship.skills) && internship.skills.some(s => s.toLowerCase() === skill.toLowerCase()));
      const matchesStipend = selectedFilters.stipend.length === 0 ||
        selectedFilters.stipend.some(range => {
          const { min, max } = parseStipendRange(range);
          return (internship.stipend_numeric ?? 0) >= min && (internship.stipend_numeric ?? 0) < max;
        });
      const matchesDuration = selectedFilters.duration.length === 0 ||
        selectedFilters.duration.some(range => {
          const { min, max } = parseDurationRange(range);
          const durationMonths = getDurationInMonths(internship.duration);
          return durationMonths >= min && durationMonths <= max;
        });
      return matchesSearch && matchesLocation && matchesWorkType && matchesSkills && matchesStipend && matchesDuration;
    });
  }, [internships, searchQuery, selectedFilters]);

  const totalPages = Math.ceil(filteredInternships.length / ITEMS_PER_PAGE);
  const paginatedInternships = filteredInternships.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const paginationRange = usePagination({ currentPage, totalCount: filteredInternships.length, siblingCount: 1, pageSize: ITEMS_PER_PAGE });

  const onNext = () => { if (currentPage < totalPages) setCurrentPage(currentPage + 1) };
  const onPrevious = () => { if (currentPage > 1) setCurrentPage(currentPage - 1) };

  const handleFilterChange = (category: keyof typeof selectedFilters, value: string, checked: boolean) => {
    setSelectedFilters(prev => ({ ...prev, [category]: checked ? [...prev[category], value] : prev[category].filter(item => item !== value) }));
    setCurrentPage(1);
  };
  const clearAllFilters = () => {
    setSelectedFilters({ location: [], workType: [], duration: [], stipend: [], skills: [] });
    setCurrentPage(1);
  };
  const activeFiltersCount = Object.values(selectedFilters).flat().length;

  return (
    <Layout>
      <div className="bg-background">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between mb-4 gap-4">
            <div className="relative w-full max-w-2xxl">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input placeholder="Search Job Title or Company..." value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }} className="pl-10" />
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="flex items-center gap-2"><Filter className="h-4 w-4" /> Filters {activeFiltersCount > 0 && <Badge variant="secondary" className="ml-1">{activeFiltersCount}</Badge>}</Button>
              <Select value={sortBy} onValueChange={setSortBy}><SelectTrigger className="w-32"><SelectValue placeholder="Sort by" /></SelectTrigger><SelectContent><SelectItem value="latest">Latest</SelectItem><SelectItem value="stipend">Stipend</SelectItem></SelectContent></Select>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-64 flex-shrink-0">
              <Card>
                <CardHeader className="pb-3 flex flex-row items-center justify-between"><CardTitle className="text-base font-semibold">Filters</CardTitle>{activeFiltersCount > 0 && <Button variant="ghost" size="sm" onClick={clearAllFilters} className="text-xs">Clear All</Button>}</CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(filterOptions).map(([category, options]) => (
                    <div key={category}>
                      <h4 className="font-medium text-sm mb-2 capitalize">{category.replace('workType', 'Work Type')}</h4>
                      <div className="space-y-2">
                        {options.map((option) => (
                          <div key={option} className="flex items-center space-x-2">
                            <Checkbox id={`${category}-${option}`} checked={selectedFilters[category as keyof typeof selectedFilters].includes(option)} onCheckedChange={(checked) => handleFilterChange(category as keyof typeof selectedFilters, option, checked as boolean)} />
                            <label htmlFor={`${category}-${option}`} className="text-sm cursor-pointer">{option}</label>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
            <div className="flex-1">
              {isLoading ? (<p>Loading internships...</p>) :
                error ? (<p className="text-destructive">{typeof error === 'string' ? error : 'An unexpected error occurred.'}</p>) : (
                  <>
                    <div className="mb-4 text-sm text-gray-600">Showing {paginatedInternships.length} of {filteredInternships.length} internships</div>
                    <div className="space-y-4">
                      {paginatedInternships.map((internship) => (
                        <InternshipCard key={internship.id} {...internship} stipend={internship.stipend_numeric ? `₹${internship.stipend_numeric.toLocaleString()}/month` : 'Varies'} skills={Array.isArray(internship.skills) ? internship.skills : []} />
                      ))}
                    </div>
                    {totalPages > 1 && (
                      <div className="mt-8">
                        <Pagination>
                          <PaginationContent>
                            <PaginationItem><PaginationPrevious href="#" onClick={onPrevious} className={currentPage === 1 ? "pointer-events-none opacity-50" : ""} /></PaginationItem>
                            {paginationRange?.map((pageNumber, index) => (
                              pageNumber === DOTS
                                ? <PaginationItem key={index}><PaginationEllipsis /></PaginationItem>
                                : <PaginationItem key={index}><PaginationLink href="#" isActive={currentPage === pageNumber} onClick={() => setCurrentPage(pageNumber as number)}>{pageNumber}</PaginationLink></PaginationItem>
                            ))}
                            <PaginationItem><PaginationNext href="#" onClick={onNext} className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""} /></PaginationItem>
                          </PaginationContent>
                        </Pagination>
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