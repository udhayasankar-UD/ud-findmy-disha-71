import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Layout from "@/components/Layout";
import InternshipCard from "@/components/InternshipCard";
import { FilterSidebar } from "@/components/FilterSidebar";
import { Search } from "lucide-react";
import internshipsData from "@/data/internships.json";

const Internships = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    location: "",
    stipend: "",
    duration: "",
    sector: "",
    workType: "",
    company: ""
  });



  const filteredInternships = internshipsData.filter(internship => {
    const matchesSearch = internship.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         internship.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         internship.sector.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesLocation = !filters.location || internship.location.includes(filters.location);
    const matchesSector = !filters.sector || internship.sector === filters.sector;
    
    return matchesSearch && matchesLocation && matchesSector;
  });

  const clearFilters = () => {
    setFilters({
      location: "",
      stipend: "",
      duration: "",
      sector: "",
      workType: "",
      company: ""
    });
  };

  return (
    <Layout>
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <FilterSidebar 
            filters={filters}
            setFilters={setFilters}
            clearFilters={clearFilters}
          />
          
          <main className="flex-1">
            <div className="container mx-auto px-4 py-8">
              <div className="space-y-6">
                {/* Header with Sidebar Trigger */}
                <div className="flex items-center gap-4">
                  <SidebarTrigger className="lg:hidden" />
                  <div className="text-center space-y-4 flex-1">
                    <h1 className="text-3xl md:text-4xl font-heading font-bold">
                      Find Your Perfect <span className="text-primary">Internship</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                      Discover thousands of internship opportunities from top companies across India
                    </p>
                  </div>
                </div>

                {/* Search Bar */}
                <Card className="shadow-disha border-0">
                  <CardContent className="p-6">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        placeholder="Search internships, companies, or skills..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 text-base"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Results Summary */}
                <div className="flex items-center justify-between">
                  <div className="text-muted-foreground">
                    {filteredInternships.length} internships found
                    {searchQuery && ` for "${searchQuery}"`}
                  </div>
                  <div className="hidden lg:block">
                    <SidebarTrigger />
                  </div>
                </div>

                {/* Internship Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredInternships.map((internship, index) => (
                    <div key={internship.id} className="animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                      <InternshipCard {...internship} />
                    </div>
                  ))}
                </div>

                {filteredInternships.length === 0 && (
                  <div className="text-center py-12 space-y-4">
                    <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center">
                      <Search className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold">No internships found</h3>
                    <p className="text-muted-foreground">Try adjusting your search criteria or filters</p>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </SidebarProvider>
    </Layout>
  );
};

export default Internships;