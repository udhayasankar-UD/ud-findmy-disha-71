import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, IndianRupee, Building, Award } from "lucide-react";

interface InternshipCardProps {
  id: string;
  title: string;
  company: string;
  location: string;
  stipend: string;
  duration: string;
  sector: string;
  description: string;
  matchPercentage?: number;
  fairnessBoost?: boolean;
  skills?: string[];
}

const InternshipCard = ({ 
  id, 
  title, 
  company, 
  location, 
  stipend, 
  duration, 
  sector, 
  description,
  matchPercentage,
  fairnessBoost,
  skills = []
}: InternshipCardProps) => {
  return (
    <Card className="h-full flex flex-col shadow-disha hover:shadow-disha-md transition-all duration-300 hover:scale-[1.02] border-0 bg-gradient-card">
      <CardHeader className="space-y-2">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h3 className="font-heading font-semibold text-lg leading-tight">{title}</h3>
            <div className="flex items-center text-muted-foreground text-sm">
              <Building className="w-4 h-4 mr-1" />
              {company}
            </div>
          </div>
          {fairnessBoost && (
            <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
              <Award className="w-3 h-3 mr-1" />
              Fair
            </Badge>
          )}
        </div>
        
        {matchPercentage && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Match Score</span>
              <span className="font-semibold text-success">{matchPercentage}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-success h-2 rounded-full transition-all duration-500"
                style={{ width: `${matchPercentage}%` }}
              />
            </div>
          </div>
        )}
      </CardHeader>

      <CardContent className="flex-1 space-y-4">
        <p className="text-muted-foreground text-sm line-clamp-2">{description}</p>
        
        <div className="space-y-2">
          <div className="flex items-center text-sm">
            <MapPin className="w-4 h-4 mr-2 text-muted-foreground" />
            {location}
          </div>
          <div className="flex items-center text-sm">
            <IndianRupee className="w-4 h-4 mr-2 text-muted-foreground" />
            {stipend}
          </div>
          <div className="flex items-center text-sm">
            <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
            {duration}
          </div>
        </div>

        <div className="flex flex-wrap gap-1">
          <Badge variant="outline" className="text-xs">{sector}</Badge>
          {skills.slice(0, 2).map((skill, index) => (
            <Badge key={index} variant="secondary" className="text-xs">{skill}</Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter>
        <Button asChild className="w-full">
          <Link to={`/internships/${id}`}>
            View Details
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default InternshipCard;