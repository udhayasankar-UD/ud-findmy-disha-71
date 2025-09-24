import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import Layout from "@/components/Layout";
import { UserPlus, ArrowRight, Shield, GraduationCap } from "lucide-react";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    aadhaar: "",
    education: "",
    skills: "",
    location: "",
    preferredSector: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate registration
    setTimeout(() => {
      window.location.href = "/profile";
    }, 2000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const educationLevels = [
    "High School (10th)",
    "Senior Secondary (12th)",
    "Undergraduate (Bachelor's)",
    "Postgraduate (Master's)",
    "PhD",
    "Diploma",
    "Certificate Course"
  ];

  const sectors = [
    "Technology",
    "Healthcare",
    "Finance",
    "Education",
    "Manufacturing",
    "Retail",
    "Agriculture",
    "Government",
    "Non-Profit",
    "Media & Entertainment"
  ];

  return (
    <Layout>
      <div className="min-h-[calc(100vh-theme(spacing.32))] flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
        <div className="w-full max-w-2xl animate-fade-in">
          <Card className="shadow-disha-lg border-0 bg-card/80 backdrop-blur">
            <CardHeader className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="p-4 rounded-full bg-gradient-primary">
                  <UserPlus className="w-8 h-8 text-primary-foreground" />
                </div>
              </div>
              <div>
                <CardTitle className="text-2xl font-heading">Join DISHA</CardTitle>
                <CardDescription className="text-base">
                  Create your account and start your internship journey
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium">
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-medium">
                      Mobile Number *
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="10-digit mobile number"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value.replace(/\D/g, '').slice(0, 10))}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="aadhaar" className="text-sm font-medium">
                      Aadhaar Number *
                    </Label>
                    <Input
                      id="aadhaar"
                      type="text"
                      placeholder="12-digit Aadhaar number"
                      value={formData.aadhaar}
                      onChange={(e) => handleInputChange('aadhaar', e.target.value.replace(/\D/g, '').slice(0, 12))}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="education" className="text-sm font-medium">
                      Education Level *
                    </Label>
                    <Select onValueChange={(value) => handleInputChange('education', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your education level" />
                      </SelectTrigger>
                      <SelectContent>
                        {educationLevels.map((level) => (
                          <SelectItem key={level} value={level}>
                            {level}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-sm font-medium">
                      Preferred Location *
                    </Label>
                    <Input
                      id="location"
                      type="text"
                      placeholder="City, State"
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="preferredSector" className="text-sm font-medium">
                    Preferred Sector
                  </Label>
                  <Select onValueChange={(value) => handleInputChange('preferredSector', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your preferred sector" />
                    </SelectTrigger>
                    <SelectContent>
                      {sectors.map((sector) => (
                        <SelectItem key={sector} value={sector}>
                          {sector}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="skills" className="text-sm font-medium">
                    Skills & Interests
                  </Label>
                  <Textarea
                    id="skills"
                    placeholder="List your skills, interests, and any relevant experience..."
                    value={formData.skills}
                    onChange={(e) => handleInputChange('skills', e.target.value)}
                    rows={3}
                  />
                </div>

                <Button 
                  type="submit"
                  disabled={isLoading}
                  className="w-full"
                  size="lg"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground mr-2" />
                      Creating Account...
                    </>
                  ) : (
                    <>
                      <GraduationCap className="mr-2 w-4 h-4" />
                      Create Account
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </>
                  )}
                </Button>

                <div className="text-center space-y-4">
                  <div className="text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link to="/login" className="text-primary hover:underline font-medium">
                      Sign in here
                    </Link>
                  </div>
                  
                  <div className="flex items-center justify-center space-x-2 text-xs text-muted-foreground">
                    <Shield className="w-4 h-4" />
                    <span>By signing up, you agree to our Terms & Privacy Policy</span>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default SignUp;