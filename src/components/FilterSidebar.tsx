import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import { MapPin, IndianRupee, Calendar, Briefcase, X } from "lucide-react";

interface FilterSidebarProps {
  filters: {
    location: string;
    stipend: string;
    duration: string;
    sector: string;
    workType: string;
    company: string;
  };
  setFilters: React.Dispatch<React.SetStateAction<{
    location: string;
    stipend: string;
    duration: string;
    sector: string;
    workType: string;
    company: string;
  }>>;
  clearFilters: () => void;
}

export function FilterSidebar({ filters, setFilters, clearFilters }: FilterSidebarProps) {
  const { state } = useSidebar();

  const locations = ["Bangalore", "Mumbai", "Delhi NCR", "Pune", "Chennai", "Hyderabad", "Kolkata", "Ahmedabad", "Remote"];
  const stipendRanges = ["₹10,000-15,000", "₹15,000-20,000", "₹20,000-25,000", "₹25,000+"];
  const durations = ["1-3 months", "3-6 months", "6+ months"];
  const sectors = ["Technology", "Finance", "Marketing", "Design", "Healthcare", "Education"];
  const workTypes = ["Full-time", "Part-time", "Flexible"];
  const companies = ["Startup", "MNC", "Government", "NGO"];

  const activeFiltersCount = Object.values(filters).filter(f => f).length;

  if (state === "collapsed") {
    return (
      <Sidebar collapsible="icon" className="w-14">
        <SidebarContent className="flex items-center justify-center pt-4">
          <div className="p-2 rounded-lg bg-primary/10">
            <Briefcase className="w-6 h-6 text-primary" />
          </div>
          {activeFiltersCount > 0 && (
            <Badge variant="secondary" className="mt-2 text-xs">
              {activeFiltersCount}
            </Badge>
          )}
        </SidebarContent>
      </Sidebar>
    );
  }

  return (
    <Sidebar collapsible="icon" className="w-80">
      <SidebarHeader className="p-6 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-primary" />
            <h2 className="font-heading font-semibold">Filters</h2>
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="text-xs">
                {activeFiltersCount}
              </Badge>
            )}
          </div>
          {activeFiltersCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-xs"
            >
              <X className="w-4 h-4 mr-1" />
              Clear All
            </Button>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="p-6">
        <div className="space-y-6">
          <SidebarGroup>
            <SidebarGroupLabel className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Location
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <Select value={filters.location} onValueChange={(value) => setFilters(prev => ({...prev, location: value}))}>
                <SelectTrigger>
                  <SelectValue placeholder="Any location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Any location</SelectItem>
                  {locations.map(location => (
                    <SelectItem key={location} value={location}>{location}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel className="flex items-center gap-2">
              <IndianRupee className="w-4 h-4" />
              Stipend Range
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <Select value={filters.stipend} onValueChange={(value) => setFilters(prev => ({...prev, stipend: value}))}>
                <SelectTrigger>
                  <SelectValue placeholder="Any stipend" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Any stipend</SelectItem>
                  {stipendRanges.map(range => (
                    <SelectItem key={range} value={range}>{range}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Duration
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <Select value={filters.duration} onValueChange={(value) => setFilters(prev => ({...prev, duration: value}))}>
                <SelectTrigger>
                  <SelectValue placeholder="Any duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Any duration</SelectItem>
                  {durations.map(duration => (
                    <SelectItem key={duration} value={duration}>{duration}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel className="flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              Sector
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <Select value={filters.sector} onValueChange={(value) => setFilters(prev => ({...prev, sector: value}))}>
                <SelectTrigger>
                  <SelectValue placeholder="Any sector" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Any sector</SelectItem>
                  {sectors.map(sector => (
                    <SelectItem key={sector} value={sector}>{sector}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel>Work Type</SidebarGroupLabel>
            <SidebarGroupContent>
              <Select value={filters.workType} onValueChange={(value) => setFilters(prev => ({...prev, workType: value}))}>
                <SelectTrigger>
                  <SelectValue placeholder="Any type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Any type</SelectItem>
                  {workTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel>Company Type</SidebarGroupLabel>
            <SidebarGroupContent>
              <Select value={filters.company} onValueChange={(value) => setFilters(prev => ({...prev, company: value}))}>
                <SelectTrigger>
                  <SelectValue placeholder="Any company" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Any company</SelectItem>
                  {companies.map(company => (
                    <SelectItem key={company} value={company}>{company}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}