import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Users, GraduationCap, Calendar, MapPin } from 'lucide-react';

const eligibilityItems = [
  {
    icon: Calendar,
    title: 'Age Requirement',
    description: '18-28 years',
    status: 'eligible',
    details: 'Valid age range for PM internship scheme'
  },
  {
    icon: Users,
    title: 'Job Status', 
    description: 'Student/Graduate',
    status: 'eligible',
    details: 'Currently enrolled or recent graduate'
  },
  {
    icon: MapPin,
    title: 'Location',
    description: 'Pan India',
    status: 'eligible', 
    details: 'Available across all states and UTs'
  },
  {
    icon: GraduationCap,
    title: 'Education',
    description: '10th+ Qualification',
    status: 'eligible',
    details: 'Minimum 10th grade completion required'
  }
];

export function EligibilityDashboard() {
  return (
    <section className="py-16 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold">
            Eligibility <span className="text-primary">Dashboard</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Check if you meet the criteria for PM Internship Scheme
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {eligibilityItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Card key={index} className="text-center shadow-disha hover:shadow-disha-md transition-all duration-300 border-l-4 border-l-primary">
                <CardContent className="p-6 space-y-4">
                  <div className="flex justify-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-heading font-semibold text-lg">{item.title}</h3>
                    <p className="text-primary font-semibold text-xl">{item.description}</p>
                    <p className="text-sm text-muted-foreground">{item.details}</p>
                  </div>
                  
                  <div className="flex items-center justify-center gap-2 pt-2">
                    <CheckCircle className="h-5 w-5 text-success" />
                    <span className="text-sm font-medium text-success">Eligible</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}