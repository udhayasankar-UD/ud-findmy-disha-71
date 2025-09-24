import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Search, 
  MapPin, 
  IndianRupee, 
  Clock, 
  Building2, 
  Filter,
  Calendar,
  FileText,
  Bookmark,
  Star,
  Users
} from "lucide-react";
import Layout from "@/components/Layout";
import internshipsData from "@/data/internships-new.json";

const filterOptions = {
  location: ["New Delhi", "Mumbai", "Bengaluru", "Hyderabad", "Chennai", "Pune"],
  workType: ["Full-time", "Remote", "Hybrid", "Part-time"],
  duration: ["1-3 months", "3-6 months", "6+ months"],
  stipend: ["Under ₹15k", "₹15k - ₹25k", "₹25k - ₹35k", "Above ₹35k"],
  skills: ["Python", "JavaScript", "React", "Node.js", "SQL", "Data Analysis", "Digital Marketing", "UI Design", "Content Writing", "Research"]
};

const Internships = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<{[key: string]: string[]}>({
    location: [],
    workType: [],
    duration: [],
    stipend: [],
    skills: []
  });
  const [sortBy, setSortBy] = useState("latest");

  const handleFilterChange = (category: string, value: string, checked: boolean) => {
    setSelectedFilters(prev => ({
      ...prev,
      [category]: checked 
        ? [...prev[category], value]
        : prev[category].filter(item => item !== value)
    }));
  };

  const clearAllFilters = () => {
    setSelectedFilters({
      location: [],
      workType: [],
      duration: [],
      stipend: [],
      skills: []
    });
  };

  const filteredInternships = internshipsData.filter(internship => {
    const matchesSearch = internship.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         internship.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         internship.sector.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesLocation = selectedFilters.location.length === 0 || 
                           selectedFilters.location.some(loc => internship.location.includes(loc));
    
    const matchesSector = selectedFilters.skills.length === 0 || 
                         selectedFilters.skills.some(skill => internship.skills?.includes(skill));
    
    return matchesSearch && matchesLocation && matchesSector;
  });

  const activeFiltersCount = Object.values(selectedFilters).flat().length;

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-6">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search Job Title, Company or Skill..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Filters
                  {activeFiltersCount > 0 && (
                    <Badge variant="secondary" className="ml-1">
                      {activeFiltersCount}
                    </Badge>
                  )}
                </Button>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="latest">Latest</SelectItem>
                    <SelectItem value="stipend">Stipend</SelectItem>
                    <SelectItem value="deadline">Deadline</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>Showing {filteredInternships.length} Internships</span>
              <span>Sort by: {sortBy}</span>
            </div>
          </div>

          <div className="flex gap-6">
            {/* Filters Sidebar */}
            <div className="w-64 flex-shrink-0">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base font-semibold">Filters</CardTitle>
                    {activeFiltersCount > 0 && (
                      <Button variant="ghost" size="sm" onClick={clearAllFilters} className="text-xs">
                        Clear All
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(filterOptions).map(([category, options]) => (
                    <div key={category}>
                      <h4 className="font-medium text-sm mb-2 capitalize">
                        {category === 'workType' ? 'Work Type' : category}
                      </h4>
                      <div className="space-y-2">
                        {options.map((option) => (
                          <div key={option} className="flex items-center space-x-2">
                            <Checkbox
                              id={`${category}-${option}`}
                              checked={selectedFilters[category].includes(option)}
                              onCheckedChange={(checked) => 
                                handleFilterChange(category, option, checked as boolean)
                              }
                            />
                            <label 
                              htmlFor={`${category}-${option}`}
                              className="text-sm cursor-pointer"
                            >
                              {option}
                            </label>
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
              <div className="space-y-4">
                {filteredInternships.map((internship) => (
                  <Card key={internship.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex gap-3 flex-1">
                          {/* Company Icon */}
                          <div className="w-12 h-12 bg-blue-100 rounded flex items-center justify-center flex-shrink-0">
                            <Building2 className="h-6 w-6 text-blue-600" />
                          </div>

                          <div className="flex-1">
                            {/* Title and Company */}
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-lg">{internship.title}</h3>
                              <Badge className="bg-orange-500 text-white text-xs">Featured</Badge>
                            </div>
                            <p className="text-blue-600 font-medium mb-2">{internship.company}</p>

                            {/* Description */}
                            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                              {internship.description}
                            </p>

                            {/* Details */}
                            <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                              <span className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {internship.location}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {internship.duration}
                              </span>
                              <span className="flex items-center gap-1">
                                <IndianRupee className="h-3 w-3" />
                                {internship.stipend}/month
                              </span>
                              <span className="flex items-center gap-1">
                                <Users className="h-3 w-3" />
                                254 applicants
                              </span>
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                Deadline: {internship.deadline}
                              </span>
                            </div>

                            {/* Skills */}
                            <div className="flex flex-wrap gap-2">
                              {internship.skills?.slice(0, 4).map((skill) => (
                                <Badge key={skill} variant="secondary" className="text-xs">
                                  {skill}
                                </Badge>
                              ))}
                              {internship.skills && internship.skills.length > 4 && (
                                <Badge variant="secondary" className="text-xs">
                                  +{internship.skills.length - 4} more
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col items-end gap-2">
                          <Button variant="ghost" size="sm">
                            <Bookmark className="h-4 w-4" />
                          </Button>
                          <div className="text-xs text-gray-500 mb-2">
                            Posted 3 days ago
                          </div>
                          <Button className="bg-blue-600 hover:bg-blue-700">
                            Apply Now
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Load More */}
              <div className="text-center mt-8">
                <Button variant="outline" className="px-8">
                  Load More Internships
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Internships;