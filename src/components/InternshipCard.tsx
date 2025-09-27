// src/components/InternshipCard.tsx

import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building2, MapPin, Calendar, IndianRupee } from "lucide-react";

interface InternshipCardProps {
  id: string;
  title: string;
  company: string;
  location: string;
  stipend: string;
  duration: string;
  description: string; 
  skills?: string[];
  deadline?: string | null;
}

// Helper functions
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

const InternshipCard = ({
  id,
  title,
  company,
  location,
  stipend,
  duration,
  description,
  skills = [],
  deadline,
}: InternshipCardProps) => {

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300 p-6 h-full">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
          <Building2 className="h-6 w-6 text-orange-600" />
        </div>

        <div className="flex-1 space-y-3">
          <div>
            <h3 className="font-semibold text-lg text-slate-800">{title}</h3>
            <p className="text-muted-foreground font-medium text-sm">{company}</p>
          </div>

          <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
          
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" />{formatLocation(location)}</span>
            <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" />{formatDuration(duration)}</span>
            <span className="flex items-center gap-1.5"><IndianRupee className="h-4 w-4" />{stipend}</span>
            {deadline && <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" />Deadline: {new Date(deadline).toLocaleDateString('en-IN')}</span>}
          </div>
          
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2">
              {Array.isArray(skills) && skills.slice(0, 3).map((skill) => (
                <Badge key={skill} variant="outline" className="font-normal">{skill}</Badge>
              ))}
              {Array.isArray(skills) && skills.length > 3 && (
                <Badge variant="secondary">+{skills.length - 3} more</Badge>
              )}
            </div>
            
            <Button 
              asChild 
              variant="outline" 
              size="sm"
            >
              <Link to={`/internships/${id}`}>
                View Details
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default InternshipCard;