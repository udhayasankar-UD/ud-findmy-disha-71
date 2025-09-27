import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { FileText } from "lucide-react";

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  internshipTitle: string;
  userProfile?: {
    name: string;
    email: string;
    phone: string;
    dateOfBirth?: string;
    skills: string[];
    interests?: string;
    qualifications?: string;
    resume?: File | null;
  };
}

export const ApplicationModal = ({ isOpen, onClose, internshipTitle, userProfile }: ApplicationModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: userProfile?.name || "",
    dateOfBirth: userProfile?.dateOfBirth || "",
    skills: userProfile?.skills?.join(", ") || "",
    interests: userProfile?.interests || "",
    qualifications: userProfile?.qualifications || "",
    whyInterested: "",
    resume: userProfile?.resume || null as File | null,
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.fullName || !formData.dateOfBirth || !formData.skills || !formData.whyInterested) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    // Simulate application submission
    toast({
      title: "Application Submitted!",
      description: `Your application for ${internshipTitle} has been submitted successfully.`,
    });
    
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-primary">Apply for Internship</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {internshipTitle}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">
                Full Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">
                Date of Birth <span className="text-red-500">*</span>
              </Label>
              <Input
                id="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="skills">
              Skills <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="skills"
              value={formData.skills}
              onChange={(e) => handleInputChange('skills', e.target.value)}
              placeholder="List your relevant skills (e.g., Programming, Data Analysis, Communication)"
              rows={3}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="interests">
              Interests <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="interests"
              value={formData.interests}
              onChange={(e) => handleInputChange('interests', e.target.value)}
              placeholder="Describe your interests and career goals"
              rows={3}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="qualifications">
              Educational Qualifications <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="qualifications"
              value={formData.qualifications}
              onChange={(e) => handleInputChange('qualifications', e.target.value)}
              placeholder="List your educational background, degree, institution, etc."
              rows={3}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="resume" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Resume
            </Label>
            <Input
              id="resume"
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => {
                const file = e.target.files?.[0] || null;
                setFormData(prev => ({ ...prev, resume: file }));
              }}
              className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/80"
            />
            {formData.resume && (
              <p className="text-xs text-muted-foreground">
                Selected: {formData.resume.name}
              </p>
            )}
            <p className="text-xs text-muted-foreground">
              Upload your resume in PDF, DOC, or DOCX format (max 5MB)
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="whyInterested">
              Why are you interested in this internship? <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="whyInterested"
              value={formData.whyInterested}
              onChange={(e) => handleInputChange('whyInterested', e.target.value)}
              placeholder="Tell us why you're interested in this opportunity and what you hope to achieve"
              rows={4}
              required
            />
          </div>

          <div className="flex flex-col-reverse sm:flex-row gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-gradient-to-r from-primary to-orange-500 hover:from-primary/80 hover:to-orange-500/80">
              Submit Application
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};