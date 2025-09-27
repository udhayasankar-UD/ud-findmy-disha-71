import { Card, CardContent } from '@/components/ui/card';
import { IndianRupee, Trophy, BookOpen, Users, Briefcase, TrendingUp } from 'lucide-react';
import monthlyStipendImg from '@/assets/benefits/monthly-stipend.jpg';
import governmentCertImg from '@/assets/benefits/government-certificate.jpg';
import skillDevImg from '@/assets/benefits/skill-development.jpg';

export function BenefitsSection() {
  const benefits = [
    {
      icon: IndianRupee,
      image: monthlyStipendImg,
      title: 'Monthly Stipend',
      description: 'Receive ₹5,000-₹20,000 monthly stipend based on role and organization',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      icon: Trophy,
      image: governmentCertImg,
      title: 'Government Certificate',
      description: 'Official government certification upon successful completion',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      icon: BookOpen,
      image: skillDevImg,
      title: 'Skill Development',
      description: 'Learn industry-relevant skills through structured training programs',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      icon: Users,
      title: 'Mentorship',
      description: 'One-on-one mentorship from experienced government professionals',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      icon: Briefcase,
      title: 'Work Experience',
      description: 'Gain real-world experience in government projects and initiatives',
      color: 'text-teal-600',
      bgColor: 'bg-teal-50'
    },
    {
      icon: TrendingUp,
      title: 'Career Growth',
      description: 'Potential for full-time employment and career advancement opportunities',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50'
    }
  ];

  return (
    <section className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-foreground">Core Program Benefits</h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Comprehensive benefits designed to accelerate your career growth and professional development
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {benefits.map((benefit, index) => {
          const Icon = benefit.icon;
          return (
            <Card key={index} className="card-gradient shadow-soft hover:shadow-medium transition-all duration-300 group max-w-sm mx-auto">
              <CardContent className="p-6 space-y-4">
                {benefit.image ? (
                  <div className="w-full h-32 rounded-lg overflow-hidden">
                    <img
                      src={benefit.image}
                      alt={benefit.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ) : (
                  <div className={`w-14 h-14 ${benefit.bgColor} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                    <Icon className={`h-7 w-7 ${benefit.color}`} />
                  </div>
                )}

                <div className="space-y-2">
                  <h3 className="font-bold text-foreground text-xl">{benefit.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}