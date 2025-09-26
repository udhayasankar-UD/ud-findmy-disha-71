// src/components/AIMatchCard.tsx

import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, IndianRupee, Building } from "lucide-react";
import ProgressBar from "./ProgressBar";

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
  stipend_numeric: number | null;
  duration: string;
  sector: string;
  description: string;
  skills: string[];
  explanation?: { why_this_fits: Explanation };
  final_score: number;
}


// --- (Keep helper functions the same) ---
const formatLocation = (locationStr: string): string => {
  try {
    const arr = JSON.parse(locationStr.replace(/'/g, '"'));
    if (Array.isArray(arr) && arr.length > 0) return arr[0];
  } catch (e) { return locationStr; }
  return locationStr;
};
const formatDuration = (durationStr: string): string => {
    if (!durationStr) return "";
    const num = parseInt(durationStr, 10);
    if (isNaN(num)) return durationStr;
    return `${num} ${num === 1 ? 'month' : 'months'}`;
};


const AIMatchCard = ({ internship }: { internship: Recommendation }) => {
  const whyFitsData = internship.explanation?.why_this_fits;
  
  const factorLabels: Record<keyof ExplanationDetails, string> = {
      semantic_match: 'Semantic Match',
      skill_match: 'Skills Match',
      location_match: 'Location',
      stipend_match: 'Stipend',
      deadline_match: 'Deadline'
  };

  return (
    <Card className="shadow-disha border rounded-lg flex flex-col h-full p-6">
      <div className="flex-1 space-y-4">
        {/* Header Section */}
        <div className="flex items-center gap-2">
            <Building className="w-4 h-4 text-muted-foreground" />
            <p className="text-md text-muted-foreground">{internship.company}</p>
        </div>
        <h3 className="font-heading font-bold text-2xl">{internship.title}</h3>

        {/* Match Score */}
        <ProgressBar
            value={whyFitsData?.total_score || 0}
            label="Match Score"
            variant="success"
        />

        {/* Description */}
        <p className="text-md text-muted-foreground line-clamp-2 pt-4 border-t">
            {internship.description}
        </p>

        {/* Details Line */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-md text-muted-foreground">
            <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" />{formatLocation(internship.location)}</span>
            <span className="flex items-center gap-1.5"><IndianRupee className="w-4 h-4" />{internship.stipend_numeric?.toLocaleString() ?? 'N/A'}</span>
            <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />{formatDuration(internship.duration)}</span>
        </div>
        
        {/* Skills Tags */}
        <div className="flex flex-wrap gap-2 pt-2">
            <Badge variant="outline">{internship.sector}</Badge>
            {internship.skills.slice(0, 3).map(skill => (
                <Badge key={skill} className="bg-primary hover:bg-primary/90 text-primary-foreground">{skill}</Badge>
            ))}
        </div>
        
        {/* "Why This Fits" Section */}
        <div className="mt-auto pt-6">
            <div className="border-t pt-4 space-y-4">
                <h4 className="text-lg font-semibold text-foreground mb-3">Why This Fits:</h4>
                {whyFitsData && 
                    (Object.keys(factorLabels) as Array<keyof ExplanationDetails>).map(key => {
                        const factor = whyFitsData[key];
                        if (!factor) return null;
                        return (
                            // ** THE FIX IS HERE **
                            // The ProgressBar and the explanation text are now separate elements inside the div
                            <div key={key}>
                                <ProgressBar
                                    value={factor.score}
                                    label={factorLabels[key]}
                                    variant="primary"
                                />
                                {factor.explanation && (
                                    <p className="text-sm text-muted-foreground mt-1 pl-1">{factor.explanation}</p>
                                )}
                            </div>
                        );
                    })
                }
            </div>
        </div>
      </div>

      <div className="mt-6">
        <Button asChild className="w-full">
          <Link to={`/internships/${internship.id}`}>View Details</Link>
        </Button>
      </div>
    </Card>
  );
};

export default AIMatchCard;