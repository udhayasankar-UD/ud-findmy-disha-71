import { Card, CardContent } from '@/components/ui/card';
import { IndianRupee, Trophy, BookOpen, Users, Briefcase, TrendingUp } from 'lucide-react';

const benefits = [
  {
    icon: IndianRupee,
    title: 'Monthly Stipend',
    description: 'Receive ₹5,000-₹20,000 monthly stipend based on role and organization',
  },
  {
    icon: Trophy,
    title: 'Government Certificate',
    description: 'Official government certification upon successful completion',
  },
  {
    icon: BookOpen,
    title: 'Skill Development',
    description: 'Learn industry-relevant skills through structured training programs',
  },
  {
    icon: Users,
    title: 'Mentorship',
    description: 'One-on-one mentorship from experienced government professionals',
  },
  {
    icon: Briefcase,
    title: 'Work Experience',
    description: 'Gain real-world experience in government projects and initiatives',
  },
  {
    icon: TrendingUp,
    title: 'Career Growth',
    description: 'Potential for full-time employment and career advancement opportunities',
  }
];

export function BenefitsSection() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold">
            Core Program <span className="text-primary">Benefits</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive benefits designed to accelerate your career growth and professional development
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <Card key={index} className="text-center shadow-disha hover:shadow-disha-md transition-all duration-300 hover:scale-105 group">
                <CardContent className="p-6 space-y-4">
                  <div className="flex justify-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-heading font-semibold text-xl">{benefit.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
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