import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Users, Building } from 'lucide-react';

const stateData = [
  { name: 'Maharashtra', internships: 450, organizations: 28, color: 'bg-primary' },
  { name: 'Karnataka', internships: 380, organizations: 24, color: 'bg-primary/80' },
  { name: 'Delhi', internships: 320, organizations: 22, color: 'bg-primary/60' },
  { name: 'Tamil Nadu', internships: 290, organizations: 19, color: 'bg-primary/40' },
  { name: 'Gujarat', internships: 250, organizations: 16, color: 'bg-primary/20' },
];

export function IndiaMapVisualization() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold">
            Nationwide <span className="text-primary">Coverage</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            DISHA internships are available across all states and union territories
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="grid gap-4">
              {stateData.map((state, index) => (
                <Card key={index} className="shadow-disha hover:shadow-disha-md transition-all duration-300">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-full ${state.color}`} />
                        <h3 className="font-heading font-semibold">{state.name}</h3>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          <span>{state.internships}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Building className="h-4 w-4" />
                          <span>{state.organizations}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="grid grid-cols-2 gap-6 pt-4">
              <div className="text-center space-y-2">
                <div className="text-3xl font-heading font-bold text-primary">28</div>
                <div className="text-sm text-muted-foreground">States & UTs Covered</div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-3xl font-heading font-bold text-primary">150+</div>
                <div className="text-sm text-muted-foreground">Partner Organizations</div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center">
            <Card className="w-full max-w-md shadow-disha">
              <CardContent className="p-8 text-center space-y-6">
                <div className="w-24 h-24 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                  <MapPin className="h-12 w-12 text-primary" />
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-heading font-bold">Pan-India Presence</h3>
                  <p className="text-muted-foreground">
                    From metropolitan cities to rural districts, DISHA ensures equal access to government internship opportunities across the nation.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">5000+</div>
                    <div className="text-xs text-muted-foreground">Active Internships</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">85%</div>
                    <div className="text-xs text-muted-foreground">Success Rate</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}