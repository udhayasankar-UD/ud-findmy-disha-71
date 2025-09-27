// src/pages/InternshipDetail.tsx

import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/Layout";
import { ArrowLeft, MapPin, Calendar, IndianRupee, Building, CheckCircle, Award, Bookmark, Share2, Briefcase } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ApplicationModal } from "@/components/ApplicationModal";
import axios from "axios";

// Interface for a single internship, matching our data structure
interface InternshipDetails {
  id: string;
  title: string;
  company: string;
  location: string;
  stipend: string;
  duration: string;
  sector: string;
  description: string;
  requirements: string | string[];
  responsibilities: string | string[];
  skills: string | string[];
  perks: string | string[];
  deadline: string | null;
  startdate: string | null;
  numberofopenings: number | null;
  type: string;
}

// Helper to format ["City", "Pincode"] into just "City"
const formatLocation = (locationStr: string): string => {
  try {
    const arr = JSON.parse(locationStr.replace(/'/g, '"'));
    if (Array.isArray(arr) && arr.length > 0) return arr[0];
  } catch (e) { return locationStr; }
  return locationStr;
};

// Helper to parse stringified lists
const parseListFromString = (str: string | string[] | undefined | null): string[] => {
    if (Array.isArray(str)) return str;
    if (typeof str !== 'string' || !str) return [];
    try {
        return JSON.parse(str.replace(/'/g, '"'));
    } catch (e) {
        return str.split(';').map(s => s.trim()).filter(Boolean);
    }
};

const InternshipDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [internship, setInternship] = useState<InternshipDetails | null>(null);
  const [similarOpportunities, setSimilarOpportunities] = useState<InternshipDetails[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);

  // Mock user profile data (in a real app, this would come from user context/auth)
  const userProfile = {
    name: "Prabhakaran",
    email: "prabhakaran@xyz.in",
    phone: "9876543210",
    dateOfBirth: "1999-05-15",
    skills: ["JavaScript", "React", "Python", "Django", "Communication"],
    interests: "Web Development, Machine Learning, UI/UX Design",
    qualifications: "Bachelor's in Computer Science from Anna University, Currently in 3rd year with CGPA 8.5/10",
    resume: null as File | null
  };

  const handleShare = async () => {
    try {
      const url = window.location.href;
      await navigator.clipboard.writeText(url);
      toast({
        title: "Copied the internship",
        description: "Internship link has been copied to clipboard",
      });
    } catch (err) {
      console.error('Failed to copy URL:', err);
      toast({
        title: "Failed to copy",
        description: "Could not copy the internship link",
        variant: "destructive",
      });
    }
  };

  const toggleSave = () => {
    setIsSaved(!isSaved);
  };

  useEffect(() => {
    if (!id) return;
    const fetchInternshipData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Fetch all internships to find the current one and the next ones
        const response = await axios.get('http://127.0.0.1:8000/internships');
        const allInternships = response.data.internships as InternshipDetails[];
        
        const currentIndex = allInternships.findIndex(item => item.id === id);

        if (currentIndex === -1) {
            setError("Internship not found.");
            return;
        }
        
        const currentInternship = allInternships[currentIndex];
        setInternship(currentInternship);

        // Find the next two internships for the "Similar Opportunities" section
        const nextOpportunities = [];
        if (allInternships[currentIndex + 1]) {
            nextOpportunities.push(allInternships[currentIndex + 1]);
        }
        if (allInternships[currentIndex + 2]) {
            nextOpportunities.push(allInternships[currentIndex + 2]);
        }
        setSimilarOpportunities(nextOpportunities);

      } catch (err) {
        setError("Failed to load internship details. Please ensure the API is running.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchInternshipData();
  }, [id]);

  if (isLoading) return <Layout><div className="text-center p-10">Loading Details...</div></Layout>;
  if (error) return <Layout><div className="text-center p-10 text-red-500">{error}</div></Layout>;
  if (!internship) return <Layout><div className="text-center p-10">Internship not found.</div></Layout>;

  // Parse fields for rendering
  const requirementsList = parseListFromString(internship.requirements);
  const responsibilitiesList = parseListFromString(internship.responsibilities);
  const perksList = parseListFromString(internship.perks);
  const skillsList = parseListFromString(internship.skills);

  return (
    <Layout>
      <div className="bg-gray-50/50">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <Button variant="ghost" asChild className="mb-6 text-muted-foreground">
            <Link to="/internships"><ArrowLeft className="w-4 h-4 mr-2" />Back to Internships</Link>
          </Button>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="shadow-none border rounded-lg bg-card">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-4">
                        <h1 className="text-3xl font-heading font-bold">{internship.title}</h1>
                        <Badge variant="outline" className="border-purple-500 text-purple-500 bg-purple-50">{internship.type}</Badge>
                      </div>
                      <p className="text-lg text-muted-foreground mt-1">{internship.company}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="icon" onClick={toggleSave}>
                        <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current text-orange-500' : ''}`} />
                      </Button>
                      <Button variant="outline" size="icon" onClick={handleShare}>
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground pt-4">
                    <div className="flex items-center gap-1.5"><MapPin className="w-4 h-4" />{formatLocation(internship.location)}</div>
                    <div className="flex items-center gap-1.5"><IndianRupee className="w-4 h-4" />{internship.stipend}</div>
                    <div className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />{internship.duration + " month"}</div>
                  </div>
                </CardHeader>
              </Card>

              <Card><CardHeader><CardTitle>About This Internship</CardTitle></CardHeader><CardContent><p className="text-muted-foreground">{internship.description}</p></CardContent></Card>
              <Card><CardHeader><CardTitle>Requirements</CardTitle></CardHeader>
                <CardContent><ul className="space-y-3">{requirementsList.map((req, index) => (<li key={index} className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-success mt-0.5" /><span className="text-muted-foreground">{req}</span></li>))}</ul></CardContent>
              </Card>
              <Card><CardHeader><CardTitle>Key Responsibilities</CardTitle></CardHeader>
                <CardContent><ul className="space-y-3">{responsibilitiesList.map((resp, index) => (<li key={index} className="flex items-start gap-3"><div className="w-1.5 h-1.5 bg-primary rounded-full mt-2" /><span className="text-muted-foreground">{resp}</span></li>))}</ul></CardContent>
              </Card>
              <Card><CardHeader><CardTitle>What You'll Get</CardTitle></CardHeader>
                <CardContent><ul className="space-y-3">{perksList.map((perk, index) => (<li key={index} className="flex items-start gap-3"><Award className="w-5 h-5 text-primary mt-0.5" /><span className="text-muted-foreground">{perk}</span></li>))}</ul></CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6 lg:sticky top-24">
              <Card className="bg-orange-500/10 border-orange-500/20">
                <CardHeader><CardTitle className="text-orange-600">Apply Now</CardTitle><p className="text-xs text-muted-foreground">Don't miss this opportunity to grow your career.</p></CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3 text-sm border-t pt-4">
                    <div className="flex justify-between"><span>Application Deadline</span><span className="font-semibold">{internship.deadline ? new Date(internship.deadline).toLocaleDateString('en-IN') : 'N/A'}</span></div>
                    {/* <div className="flex justify-between"><span>Start Date</span><span className="font-semibold">{internship.startdate}</span></div>  */}
                    <div className="flex justify-between"><span>Start Date</span><span className="font-semibold">{"Immediate"}</span></div>
                    <div className="flex justify-between">
                      <span>Openings</span>
                      <span className="font-semibold">
                        {internship.numberofopenings ? `${internship.numberofopenings} positions` : 'N/A'}
                      </span>
                    </div>
                    <div className="flex justify-between"><span>Sector</span><span className="font-semibold">{internship.sector}</span></div>
                  </div>
                  <Button 
                    className="w-full" 
                    size="lg"
                    onClick={() => setIsApplicationModalOpen(true)}
                  >
                    <Briefcase className="w-4 h-4 mr-2" />
                    Apply for This Internship
                  </Button>
                  <p className="text-xs text-center text-muted-foreground">By applying, you agree to our Terms of Service and Privacy Policy.</p>
                </CardContent>
              </Card>
              
              <Card><CardHeader><CardTitle>Skills Required</CardTitle></CardHeader>
                <CardContent><div className="flex flex-wrap gap-2">{skillsList.map((skill, index) => (<Badge key={index}>{skill}</Badge>))}</div></CardContent>
              </Card>
              
              <Card><CardHeader><CardTitle>Similar Opportunities</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  {similarOpportunities.length > 0 ? (
                    similarOpportunities.map(opp => (
                      <Link to={`/internships/${opp.id}`} key={opp.id} className="block hover:bg-muted/50 p-2 rounded-md">
                        <p className="font-semibold text-sm">{opp.title}</p>
                        <p className="text-xs text-muted-foreground">{opp.company}</p>
                      </Link>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">No similar opportunities found.</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <ApplicationModal
        isOpen={isApplicationModalOpen}
        onClose={() => setIsApplicationModalOpen(false)}
        internshipTitle={internship.title}
        userProfile={userProfile}
      />
    </Layout>
  );
};

export default InternshipDetail;