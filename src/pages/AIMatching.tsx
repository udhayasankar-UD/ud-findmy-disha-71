// src/pages/AIMatching.tsx

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/Layout";
import ProgressBar from "@/components/ProgressBar";
import AIMatchCard from "@/components/AIMatchCard";
import { Brain, Sparkles, Target, Award, BookOpen, RefreshCw, TrendingUp, Users, Shield, AlertTriangle } from "lucide-react";
import axios from "axios";

// --- (Keep all TypeScript interfaces the same) ---
interface ExplanationFactor { score: number; explanation: string; }
interface ExplanationDetails {
  semantic_match: ExplanationFactor;
  skill_match: ExplanationFactor;
  location_match: ExplanationFactor;
  stipend_match: ExplanationFactor;
  deadline_match: ExplanationFactor;
}
interface Explanation extends ExplanationDetails { total_score: number; }
interface Recommendation {
  id: string;
  title: string;
  company: string;
  location: string;
  stipend: string;
  stipend_numeric: number | null;
  duration: string;
  sector: string;
  description: string;
  skills: string[];
  explanation?: { why_this_fits: Explanation };
  final_score: number;
}


const AIMatching = () => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const userProfile = {
    skills: ["SCORM", "ISO 22000", "Thermal Imaging", "Mapbox"],
    qualification: "B.Tech in Environmental Science",
    preferred_location: "Sambalpur",
    pincode: "768001",
    min_stipend: 7000,
    available_from: "2025-09-20",
    remote_ok: true,
  };

  const fetchRecommendations = async (): Promise<Recommendation[]> => {
    const response = await axios.post('http://127.0.0.1:8000/recommend', userProfile);
    return response.data.recommendations.map((rec: any) => ({
      ...rec,
      skills: typeof rec.skills === 'string' ? JSON.parse(rec.skills.replace(/'/g, '"')) : [],
      stipend_numeric: rec.stipend_numeric || null,
    }));
  };

  const { data, refetch, isFetching, isError, isSuccess } = useQuery<Recommendation[], Error>({
    queryKey: ['recommendations'],
    queryFn: fetchRecommendations,
    enabled: false,
  });

  useEffect(() => {
    if (isSuccess && data) setRecommendations(data);
    if (isError) setError("Failed to fetch recommendations. Please ensure the API is running.");
  }, [data, isSuccess, isError]);

  const handleGenerateMatches = () => {
    setIsGenerating(true);
    setError(null);
    setRecommendations([]);
    refetch().finally(() => setIsGenerating(false));
  };

  const topMatch = recommendations.length > 0 ? recommendations[0] : null;
  const matchAnalysisData = topMatch?.explanation?.why_this_fits;

  // --- MAPPING FOR DYNAMIC "MATCH ANALYSIS" ---
  const factorMap: { key: keyof ExplanationDetails; label: string }[] = [
    { key: 'skill_match', label: 'Skills Compatibility' },
    { key: 'location_match', label: 'Location Preference' },
    { key: 'semantic_match', label: 'Sector Interest' },
    // You can add more factors here if your backend sends them
  ];

  // --- HARDCODED DATA FOR SIDEBAR & INSIGHTS (As requested) ---
  const upskillSuggestions = [
    { skill: "Advanced React Patterns", impact: "Boost match score by 8%", details: "2 weeks • Free Online", priority: "High" },
    { skill: "Data Structures & Algorithms", impact: "Unlock 15+ more matches", details: "4 weeks • Free Online", priority: "Medium" },
    { skill: "API Development", impact: "Boost match score by 5%", details: "1 week • Free Online", priority: "Low" }
  ];
  const aiInsights = [
    { icon: TrendingUp, title: "Growing Demand", description: "Frontend developer roles increased by 25% this month" },
    { icon: Users, title: "Competition Level", description: "You're in the top 15% of candidates for tech internships" },
    { icon: Shield, title: "Fairness Check", description: "2 of your matches received fairness boost for inclusive hiring" }
  ];

  return (
    <Layout>
      <div className="bg-gray-50/50">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <div className="space-y-12">
            {/* Header */}
            <div className="text-center space-y-4">
              <div className="flex justify-center"><div className="p-4 rounded-full bg-primary/10"><Brain className="w-8 h-8 text-primary" /></div></div>
              <h1 className="text-3xl md:text-4xl font-heading font-bold">Your <span className="text-primary">AI-Powered</span> Matches</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Discover internships tailored specifically for you using advanced AI matching algorithms</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card><CardContent className="p-6 text-center"><div className="text-2xl font-bold text-primary">{topMatch ? `${Math.round(topMatch.final_score * 100)}%` : 'N/A'}</div><div className="text-sm text-muted-foreground">Best Match Score</div></CardContent></Card>
              <Card><CardContent className="p-6 text-center"><div className="text-2xl font-bold text-secondary">{topMatch ? '127' : 'N/A'}</div><div className="text-sm text-muted-foreground">Total Matches</div></CardContent></Card>
              <Card><CardContent className="p-6 text-center"><div className="text-2xl font-bold text-success">{topMatch ? '8' : 'N/A'}</div><div className="text-sm text-muted-foreground">Fairness Boosts</div></CardContent></Card>
              <Card><CardContent className="p-6 text-center"><div className="text-2xl font-bold text-warning">{topMatch ? '3' : 'N/A'}</div><div className="text-sm text-muted-foreground">Skills to Improve</div></CardContent></Card>
            </div>

            {/* Generate Button */}
            <Card>
              <CardContent className="p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div><h3 className="font-heading font-semibold">Get Fresh Matches</h3><p className="text-sm text-muted-foreground">Updated your profile? Generate new AI matches based on your latest information.</p></div>
                <Button onClick={handleGenerateMatches} disabled={isGenerating}>
                  {isGenerating ? (<><div className="animate-spin rounded-full h-4 w-4 border-b-2 mr-2" />Generating...</>) : "Generate AI Matches"}
                </Button>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                <div className="space-y-6">
                  <h2 className="text-2xl font-heading font-bold flex items-center gap-2"><Sparkles className="w-6 h-6 text-primary" />Your Best Matches</h2>
                  {isGenerating && <p className="text-muted-foreground">Loading...</p>}
                  {error && <div className="text-destructive p-4 bg-destructive/10 rounded-lg">{error}</div>}
                  {!isGenerating && recommendations.length > 0 && (
                    <div className="space-y-6">
                      {recommendations.map((internship) => <AIMatchCard key={internship.id} internship={internship} />)}
                      <div className="text-center"><Button variant="outline" asChild><Link to="/internships">View All Matches</Link></Button></div>
                    </div>
                  )}
                </div>

                {/* AI Insights (Hardcoded as requested) */}
                <div className="space-y-6">
                  <h2 className="text-2xl font-heading font-bold flex items-center gap-2"><Brain className="w-6 h-6 text-primary" />AI Insights</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {aiInsights.map((insight, index) => (
                      <Card key={index}>
                        <CardContent className="p-6 space-y-2">
                          <insight.icon className="w-6 h-6 text-primary" />
                          <h3 className="font-semibold">{insight.title}</h3>
                          <p className="text-sm text-muted-foreground">{insight.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6 lg:sticky top-24">
                {/* DYNAMIC Match Analysis */}
                <Card>
                  <CardHeader><CardTitle className="flex items-center gap-2"><Target className="w-5 h-5 text-primary" />Match Analysis</CardTitle></CardHeader>
                  <CardContent className="space-y-4">
                    {recommendations.length > 0 && matchAnalysisData ? (
                      factorMap.map(item => {
                        const factor = matchAnalysisData[item.key];
                        if (!factor) return null;
                        return (
                          <div key={item.key}>
                            <ProgressBar value={factor.score} label={item.label} variant="success" />
                            {/* THE FIX: Add the explanation text */}
                            <p className="text-xs text-muted-foreground mt-1">{factor.explanation}</p>
                          </div>
                        );
                      })
                    ) : (
                      <p className="text-sm text-muted-foreground">Generate matches to see your analysis.</p>
                    )}
                  </CardContent>
                </Card>

                {/* Hardcoded Upskill Now */}
                <Card>
                  <CardHeader><CardTitle className="flex items-center gap-2"><BookOpen className="w-5 h-5 text-primary" />Upskill Now</CardTitle></CardHeader>
                  <CardContent className="space-y-4">
                    {upskillSuggestions.map((suggestion) => (
                      <div key={suggestion.skill} className="p-4 bg-muted/50 rounded-lg space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-sm">{suggestion.skill}</h4>
                          <Badge variant={suggestion.priority === "High" ? "default" : suggestion.priority === "Medium" ? "secondary" : "outline"}>{suggestion.priority}</Badge>
                        </div>
                        <p className="text-xs text-success font-medium">{suggestion.impact}</p>
                        <p className="text-xs text-muted-foreground">{suggestion.details}</p>
                        <Button variant="outline" size="sm" className="w-full !mt-3">Start Learning</Button>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Hardcoded Profile Strength */}
                <Card>
                  <CardHeader><CardTitle className="flex items-center gap-2"><Award className="w-5 h-5 text-primary" />Profile Strength</CardTitle></CardHeader>
                  <CardContent className="space-y-4">
                    <ProgressBar value={85} label="Overall Score" variant="primary" />
                    <div className="text-sm space-y-2 border-t pt-3">
                      <div className="flex items-center justify-between"><span>Complete your skills</span><span className="text-success font-medium">+10% matches</span></div>
                      <div className="flex items-center justify-between"><span>Add portfolio link</span><span className="text-success font-medium">+15% matches</span></div>
                    </div>
                    <Button variant="outline" className="w-full" asChild><Link to="/profile">Complete Profile</Link></Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AIMatching;