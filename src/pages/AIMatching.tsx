import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/Layout";
import InternshipCard from "@/components/InternshipCard";
import ProgressBar from "@/components/ProgressBar";
import { 
  Brain, 
  Sparkles, 
  Target, 
  Award, 
  BookOpen, 
  RefreshCw,
  TrendingUp,
  Users,
  Shield
} from "lucide-react";

const AIMatching = () => {
  const [isGenerating, setIsGenerating] = useState(false);

  const generateMatches = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
    }, 3000);
  };

  const topMatches = [
    {
      id: "1",
      title: "Frontend Developer Intern",
      company: "TechFlow Solutions",
      location: "Mumbai, Maharashtra",
      stipend: "₹20,000/month",
      duration: "3 months",
      sector: "Technology",
      description: "Join our dynamic team to work on cutting-edge web applications using React and modern JavaScript frameworks.",
      matchPercentage: 95,
      fairnessBoost: true,
      skills: ["React", "JavaScript", "HTML/CSS"]
    },
    {
      id: "2",
      title: "Data Science Intern",
      company: "DataMinds Analytics",
      location: "Bangalore, Karnataka",
      stipend: "₹25,000/month",
      duration: "4 months",
      sector: "Technology",
      description: "Work with large datasets, build predictive models, and gain hands-on experience with machine learning.",
      matchPercentage: 88,
      fairnessBoost: false,
      skills: ["Python", "Machine Learning", "SQL"]
    },
    {
      id: "3",
      title: "Business Analyst Intern",
      company: "FinanceFirst Consulting",
      location: "Pune, Maharashtra",
      stipend: "₹18,000/month",
      duration: "5 months",
      sector: "Finance",
      description: "Analyze business processes, create reports, and support strategic decision-making initiatives.",
      matchPercentage: 82,
      fairnessBoost: true,
      skills: ["Excel", "Analysis", "Reporting"]
    }
  ];

  const matchingFactors = [
    { factor: "Skills Compatibility", score: 92, description: "Perfect skills match – you're ready for this role!" },
    { factor: "Location Preference", score: 100, description: "Right location – close to your preferred city." },
    { factor: "Sector Interest", score: 85, description: "Aligned with your interests – you'll enjoy this internship." },
    { factor: "Experience Level", score: 88, description: "Entry-level friendly – designed for students like you." }
  ];

  const upskillSuggestions = [
    {
      skill: "Advanced React Patterns",
      impact: "Boost match score by 8%",
      duration: "2 weeks",
      platform: "Free Online",
      priority: "High"
    },
    {
      skill: "Data Structures & Algorithms",
      impact: "Unlock 15+ more matches",
      duration: "4 weeks",
      platform: "Free Online",
      priority: "Medium"
    },
    {
      skill: "API Development",
      impact: "Boost match score by 5%",
      duration: "1 week",
      platform: "Free Online",
      priority: "Low"
    }
  ];

  const aiInsights = [
    {
      icon: TrendingUp,
      title: "Growing Demand",
      description: "Frontend developer roles increased by 25% this month"
    },
    {
      icon: Users,
      title: "Competition Level",
      description: "You're in the top 15% of candidates for tech internships"
    },
    {
      icon: Shield,
      title: "Fairness Check",
      description: "2 of your matches received fairness boost for inclusive hiring"
    }
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="p-4 rounded-full bg-gradient-primary">
                <Brain className="w-8 h-8 text-primary-foreground" />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-heading font-bold">
              Your <span className="text-primary">AI-Powered</span> Matches
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover internships tailored specifically for you using advanced AI matching algorithms
            </p>
          </div>

          {/* AI Matching Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="text-center shadow-disha border-0 bg-gradient-card">
              <CardContent className="p-6">
                <div className="text-2xl font-bold text-primary">95%</div>
                <div className="text-sm text-muted-foreground">Best Match Score</div>
              </CardContent>
            </Card>
            <Card className="text-center shadow-disha border-0 bg-gradient-card">
              <CardContent className="p-6">
                <div className="text-2xl font-bold text-secondary">127</div>
                <div className="text-sm text-muted-foreground">Total Matches</div>
              </CardContent>
            </Card>
            <Card className="text-center shadow-disha border-0 bg-gradient-card">
              <CardContent className="p-6">
                <div className="text-2xl font-bold text-success">8</div>
                <div className="text-sm text-muted-foreground">Fairness Boosts</div>
              </CardContent>
            </Card>
            <Card className="text-center shadow-disha border-0 bg-gradient-card">
              <CardContent className="p-6">
                <div className="text-2xl font-bold text-warning">3</div>
                <div className="text-sm text-muted-foreground">Skills to Improve</div>
              </CardContent>
            </Card>
          </div>

          {/* Generate New Matches */}
          <Card className="shadow-disha border-0">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1">
                  <h3 className="font-heading font-semibold">Get Fresh Matches</h3>
                  <p className="text-sm text-muted-foreground">
                    Updated your profile? Generate new AI matches based on your latest information.
                  </p>
                </div>
                <Button onClick={generateMatches} disabled={isGenerating} className="flex-shrink-0">
                  {isGenerating ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground mr-2" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Generate Matches
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Top Matches */}
              <div className="space-y-6">
                <h2 className="text-2xl font-heading font-bold flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-primary" />
                  Your Best Matches
                </h2>
                <div className="space-y-6">
                  {topMatches.map((internship, index) => (
                    <div key={internship.id} className="animate-fade-in" style={{animationDelay: `${index * 0.2}s`}}>
                      <InternshipCard {...internship} />
                    </div>
                  ))}
                </div>
                <div className="text-center">
                  <Button variant="outline" asChild>
                    <Link to="/internships">
                      View All 127 Matches
                    </Link>
                  </Button>
                </div>
              </div>

              {/* AI Insights */}
              <div className="space-y-6">
                <h2 className="text-2xl font-heading font-bold flex items-center gap-2">
                  <Brain className="w-6 h-6 text-primary" />
                  AI Insights
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {aiInsights.map((insight, index) => (
                    <Card key={index} className="shadow-disha border-0 bg-gradient-card">
                      <CardContent className="p-4 space-y-3">
                        <div className="flex items-center gap-2">
                          <insight.icon className="w-5 h-5 text-primary" />
                          <h3 className="font-semibold text-sm">{insight.title}</h3>
                        </div>
                        <p className="text-xs text-muted-foreground">{insight.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Matching Analysis */}
              <Card className="shadow-disha border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-primary" />
                    Match Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {matchingFactors.map((factor, index) => (
                    <div key={index} className="space-y-2">
                      <ProgressBar
                        value={factor.score}
                        label={factor.factor}
                        variant="success"
                      />
                      <p className="text-xs text-muted-foreground">{factor.description}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Upskill Suggestions */}
              <Card className="shadow-disha border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-primary" />
                    Upskill Now
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {upskillSuggestions.map((suggestion, index) => (
                    <div key={index} className="p-3 bg-muted/50 rounded-lg space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-sm">{suggestion.skill}</h4>
                        <Badge 
                          variant={suggestion.priority === "High" ? "default" : 
                                  suggestion.priority === "Medium" ? "secondary" : "outline"}
                          className="text-xs"
                        >
                          {suggestion.priority}
                        </Badge>
                      </div>
                      <div className="text-xs text-success font-medium">{suggestion.impact}</div>
                      <div className="text-xs text-muted-foreground">
                        {suggestion.duration} • {suggestion.platform}
                      </div>
                      <Button variant="outline" size="sm" className="w-full">
                        Start Learning
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Profile Completeness */}
              <Card className="shadow-disha border-0 bg-gradient-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-primary" />
                    Profile Strength
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ProgressBar value={85} label="Overall Score" variant="primary" />
                  <div className="text-sm space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Complete your skills</span>
                      <span className="text-success">+10% matches</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Add portfolio link</span>
                      <span className="text-success">+15% matches</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <Link to="/profile">
                      Complete Profile
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AIMatching;