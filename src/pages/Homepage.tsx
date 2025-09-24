import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/Layout";
import heroImage from "@/assets/hero-background.jpg";
import { 
  ArrowRight, 
  Users, 
  Target, 
  Award, 
  Brain, 
  BarChart3, 
  Shield,
  Zap,
  Globe
} from "lucide-react";

const Homepage = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Matching",
      description: "Smart algorithms match you with the perfect internships based on your skills and preferences."
    },
    {
      icon: Shield,
      title: "Fairness First",
      description: "Our inclusive system ensures equal opportunities for everyone, regardless of background."
    },
    {
      icon: Zap,
      title: "Instant Recommendations",
      description: "Get personalized internship suggestions instantly with real-time AI analysis."
    },
    {
      icon: BarChart3,
      title: "Track Progress",
      description: "Monitor your applications and profile completion with our comprehensive dashboard."
    }
  ];

  const stats = [
    { icon: Users, number: "10,000+", label: "Active Students" },
    { icon: Target, number: "5,000+", label: "Internships Available" },
    { icon: Award, number: "85%", label: "Success Rate" },
    { icon: Globe, number: "28", label: "States Covered" }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero text-white">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-secondary/80" />
        <div className="relative container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-heading font-bold leading-tight">
              Smart Internships,{" "}
              <span className="text-primary-light">Simplified</span>{" "}
              for Everyone
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
              DISHA connects you with perfect internship opportunities through AI-powered matching, 
              making the PM Internship Scheme accessible to all.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="bg-primary hover:bg-primary-dark text-lg px-8">
                <Link to="/signup">
                  Get Started
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white hover:text-secondary text-lg px-8">
                <Link to="/login">
                  Sign In
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center space-y-2 animate-slide-up" style={{animationDelay: `${index * 0.1}s`}}>
                <div className="flex justify-center">
                  <div className="p-3 rounded-full bg-primary/10">
                    <stat.icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div className="text-2xl md:text-3xl font-heading font-bold text-primary">{stat.number}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold">
              Why Choose <span className="text-primary">DISHA</span>?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience the future of internship matching with our advanced AI technology 
              and commitment to fairness.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center p-6 border-0 shadow-disha hover:shadow-disha-md transition-all duration-300 hover:scale-105 bg-gradient-card animate-slide-up" style={{animationDelay: `${index * 0.1}s`}}>
                <CardContent className="space-y-4 p-0">
                  <div className="flex justify-center">
                    <div className="p-4 rounded-full bg-primary/10">
                      <feature.icon className="w-8 h-8 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-xl font-heading font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-secondary text-secondary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-heading font-bold">
              Ready to Find Your Perfect Internship?
            </h2>
            <p className="text-xl text-secondary-foreground/80">
              Join thousands of students who have already found their dream internships through DISHA.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="text-lg px-8">
                <Link to="/ai-matching">
                  Start AI Matching
                  <Brain className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-secondary-foreground text-secondary-foreground hover:bg-secondary-foreground hover:text-secondary text-lg px-8">
                <Link to="/internships">
                  Browse Internships
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Homepage;