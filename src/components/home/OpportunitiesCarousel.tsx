import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Code, Heart, Leaf, Building, Plane, Shield, Users, GraduationCap } from 'lucide-react';

const opportunities = [
  {
    id: 1,
    icon: Code,
    title: 'Technology & IT',
    description: 'Software development, cybersecurity, and digital transformation projects',
    count: 250
  },
  {
    id: 2,
    icon: Heart,
    title: 'Healthcare',
    description: 'Public health initiatives, medical research, and healthcare policy',
    count: 180
  },
  {
    id: 3,
    icon: Leaf,
    title: 'Environment',
    description: 'Climate change, renewable energy, and sustainable development',
    count: 120
  },
  {
    id: 4,
    icon: Building,
    title: 'Infrastructure',
    description: 'Urban planning, smart cities, and transportation projects',
    count: 200
  },
  {
    id: 5,
    icon: Plane,
    title: 'Foreign Affairs',
    description: 'International relations, diplomacy, and trade development',
    count: 80
  },
  {
    id: 6,
    icon: Shield,
    title: 'Defence & Security',
    description: 'National security, defence research, and strategic planning',
    count: 150
  },
  {
    id: 7,
    icon: Users,
    title: 'Social Welfare',
    description: 'Rural development, social justice, and community programs',
    count: 300
  },
  {
    id: 8,
    icon: GraduationCap,
    title: 'Education',
    description: 'Educational policy, curriculum development, and skill training',
    count: 220
  }
];

export function OpportunitiesCarousel() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold">
            Explore Opportunities by <span className="text-primary">Sector</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover internships across diverse government sectors and ministries
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {opportunities.map((opportunity) => {
            const Icon = opportunity.icon;
            return (
              <Card key={opportunity.id} className="text-center shadow-disha hover:shadow-disha-md transition-all duration-300 group cursor-pointer">
                <CardContent className="p-6 space-y-4">
                  <div className="flex justify-center">
                    <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                      <Icon className="h-8 w-8 text-secondary group-hover:text-primary transition-colors" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-heading font-semibold text-lg leading-tight">
                      {opportunity.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {opportunity.description}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-center">
                    <Badge className="bg-primary text-primary-foreground text-lg font-bold px-3 py-1">
                      {opportunity.count}+ Openings
                    </Badge>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="w-full group/btn opacity-0 group-hover:opacity-100 transition-opacity duration-300 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    View Opportunities
                    <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}