import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/Layout";
import ProgressBar from "@/components/ProgressBar";
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  IndianRupee, 
  Building, 
  Users, 
  Clock, 
  CheckCircle,
  BookOpen,
  Award,
  Heart,
  Share2,
  ExternalLink
} from "lucide-react";

const InternshipDetail = () => {
  const { id } = useParams();

  // Mock data - in real app, this would be fetched based on ID
  const internship = {
    id: "1",
    title: "Frontend Developer Intern",
    company: "TechFlow Solutions",
    location: "Mumbai, Maharashtra",
    stipend: "₹20,000/month",
    duration: "3 months",
    sector: "Technology",
    description: "Join our dynamic team to work on cutting-edge web applications using React and modern JavaScript frameworks. You'll collaborate with senior developers, participate in code reviews, and contribute to real projects that impact thousands of users.",
    requirements: [
      "Currently pursuing Bachelor's in Computer Science or related field",
      "Basic knowledge of HTML, CSS, and JavaScript",
      "Familiarity with React.js framework preferred",
      "Good problem-solving and communication skills",
      "Ability to work in a collaborative team environment"
    ],
    responsibilities: [
      "Develop responsive user interfaces using React.js",
      "Collaborate with designers to implement UI/UX designs",
      "Write clean, maintainable, and well-documented code",
      "Participate in daily standups and sprint planning",
      "Learn and apply best practices in web development"
    ],
    benefits: [
      "Mentorship from experienced developers",
      "Flexible working hours",
      "Work-from-home options available",
      "Certificate of completion",
      "Potential for full-time offer based on performance"
    ],
    skills: ["React", "JavaScript", "HTML/CSS", "Git", "RESTful APIs"],
    matchPercentage: 85,
    fairnessBoost: true,
    companyInfo: {
      employees: "50-200",
      founded: "2018",
      website: "www.techflowsolutions.com",
      description: "A fast-growing software development company specializing in web and mobile applications for startups and enterprises."
    },
    deadline: "2024-03-15",
    posted: "2024-02-20"
  };

  const whyMatches = [
    { reason: "Skills match", percentage: 90 },
    { reason: "Location preference", percentage: 100 },
    { reason: "Sector interest", percentage: 95 },
    { reason: "Duration preference", percentage: 70 }
  ];

  const upskillSuggestions = [
    { skill: "Advanced React Patterns", duration: "2 weeks", platform: "Free Online" },
    { skill: "TypeScript Fundamentals", duration: "1 week", platform: "Free Online" },
    { skill: "Git & Version Control", duration: "3 days", platform: "Free Online" }
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="space-y-6">
          {/* Back Button */}
          <Button variant="ghost" asChild className="mb-4">
            <Link to="/internships">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Internships
            </Link>
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Header */}
              <Card className="shadow-disha border-0">
                <CardHeader>
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                    <div className="space-y-2">
                      <h1 className="text-3xl font-heading font-bold">{internship.title}</h1>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Building className="w-4 h-4" />
                        <span className="text-lg">{internship.company}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Heart className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      {internship.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <IndianRupee className="w-4 h-4 text-muted-foreground" />
                      {internship.stipend}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      {internship.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      Posted: {new Date(internship.posted).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Badge>{internship.sector}</Badge>
                    {internship.fairnessBoost && (
                      <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
                        <Award className="w-3 h-3 mr-1" />
                        Fairness Boost
                      </Badge>
                    )}
                    {internship.skills.slice(0, 3).map((skill, index) => (
                      <Badge key={index} variant="outline">{skill}</Badge>
                    ))}
                  </div>
                </CardHeader>
              </Card>

              {/* Description */}
              <Card className="shadow-disha border-0">
                <CardHeader>
                  <CardTitle>About the Internship</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {internship.description}
                  </p>
                </CardContent>
              </Card>

              {/* Requirements */}
              <Card className="shadow-disha border-0">
                <CardHeader>
                  <CardTitle>Requirements</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {internship.requirements.map((req, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{req}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Responsibilities */}
              <Card className="shadow-disha border-0">
                <CardHeader>
                  <CardTitle>Key Responsibilities</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {internship.responsibilities.map((resp, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <span className="text-muted-foreground">{resp}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Benefits */}
              <Card className="shadow-disha border-0">
                <CardHeader>
                  <CardTitle>What You'll Get</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {internship.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Award className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Company Info */}
              <Card className="shadow-disha border-0">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    About {internship.company}
                    <Button variant="outline" size="sm">
                      <ExternalLink className="w-4 h-4 mr-1" />
                      Visit Website
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{internship.companyInfo.description}</p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Employees:</span>
                      <span className="ml-2 font-medium">{internship.companyInfo.employees}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Founded:</span>
                      <span className="ml-2 font-medium">{internship.companyInfo.founded}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Apply Card */}
              <Card className="shadow-disha border-0 bg-gradient-card">
                <CardContent className="p-6 space-y-4">
                  <div className="text-center space-y-2">
                    <div className="text-2xl font-bold text-primary">Apply Now</div>
                    <div className="text-sm text-muted-foreground">
                      Deadline: {new Date(internship.deadline).toLocaleDateString()}
                    </div>
                  </div>
                  <Button className="w-full" size="lg">
                    Apply for this Internship
                  </Button>
                  <div className="text-xs text-center text-muted-foreground">
                    You'll be redirected to the application form
                  </div>
                </CardContent>
              </Card>

              {/* Match Score */}
              <Card className="shadow-disha border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-success" />
                    This fits you: {internship.matchPercentage}%
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {whyMatches.map((match, index) => (
                    <ProgressBar
                      key={index}
                      value={match.percentage}
                      label={match.reason}
                      variant="success"
                    />
                  ))}
                </CardContent>
              </Card>

              {/* Upskill Suggestions */}
              <Card className="shadow-disha border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-primary" />
                    Boost Your Chances
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {upskillSuggestions.map((suggestion, index) => (
                    <div key={index} className="p-3 bg-muted/50 rounded-lg space-y-1">
                      <div className="font-medium text-sm">{suggestion.skill}</div>
                      <div className="text-xs text-muted-foreground">
                        {suggestion.duration} • {suggestion.platform}
                      </div>
                      <Button variant="outline" size="sm" className="w-full mt-2">
                        Start Learning
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Skills Required */}
              <Card className="shadow-disha border-0">
                <CardHeader>
                  <CardTitle>Skills Required</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {internship.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary">{skill}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default InternshipDetail;