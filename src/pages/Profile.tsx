import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/Layout";
import ProgressBar from "@/components/ProgressBar";
import {
  User,
  Edit,
  Save,
  MapPin,
  GraduationCap,
  Briefcase,
  Star,
  Award,
  Target,
  Plus,
  X,
  Upload,
  FileText
} from "lucide-react";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const [formData, setFormData] = useState({
    name: "Prabhakaran",
    email: "prabhakaran@xyz.in",
    phone: "9876543210",
    aadhaar: "1234-5678-9012",
    education: "Undergraduate (Bachelor's)",
    college: "Anna University",
    course: "Computer Science",
    year: "3",
    skills: ["JavaScript", "React", "Python", "Django", "Communication"],
    location: "Bangalore",
    preferredSector: "Technology",
    preferredStipend: "₹5,000",
    preferredDuration: "3 months",
    bio: "Passionate computer science student with strong analytical skills and experience in web development. Looking for opportunities to apply my technical knowledge in real-world projects.",
    dateOfBirth: "1999-05-15",
    interests: "Web Development, Machine Learning, UI/UX Design",
    qualifications: "Bachelor's in Computer Science from Anna University, Currently in 3rd year with CGPA 8.5/10",
    resume: null as File | null
  });

  const profileCompletion = 85;

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    // Simulate save
  };

  const achievements = [
    { title: "Profile 85% Complete", icon: Target, color: "bg-success" },
    { title: "AI Matching Active", icon: Star, color: "bg-primary" },
    { title: "Verified Profile", icon: Award, color: "bg-secondary" }
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-heading font-bold">My Profile</h1>
              <p className="text-muted-foreground">Manage your personal information and preferences</p>
            </div>
            <Button
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              variant={isEditing ? "default" : "outline"}
            >
              {isEditing ? (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </>
              ) : (
                <>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </>
              )}
            </Button>
          </div>

          {/* Profile Completion */}
          <Card className="bg-gradient-card border-0 shadow-disha">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                Profile Completion
              </CardTitle>
              <CardDescription>
                Complete your profile to get better internship matches
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ProgressBar
                value={profileCompletion}
                label="Profile Strength"
                variant="success"
              />
              <div className="flex flex-wrap gap-2 mt-4">
                {achievements.map((achievement, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    <achievement.icon className="w-3 h-3" />
                    {achievement.title}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Personal Information */}
          <Card className="shadow-disha border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Mobile Number</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="aadhaar">Aadhaar Number</Label>
                  <Input
                    id="aadhaar"
                    value={formData.aadhaar}
                    disabled={true}
                    className="bg-muted"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  disabled={!isEditing}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="resume" className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Resume
                </Label>
                {isEditing ? (
                  <div className="space-y-2">
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
                    <p className="text-xs text-muted-foreground">
                      Upload your resume in PDF, DOC, or DOCX format (max 5MB)
                    </p>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 p-3 border rounded-md bg-muted/50">
                    <Upload className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {formData.resume ? formData.resume.name : "No resume uploaded"}
                    </span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Education Information */}
          <Card className="shadow-disha border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-primary" />
                Education
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="education">Education Level</Label>
                  <Select
                    value={formData.education}
                    onValueChange={(value) => handleInputChange('education', value)}
                    disabled={!isEditing}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="High School (10th)">High School (10th)</SelectItem>
                      <SelectItem value="Senior Secondary (12th)">Senior Secondary (12th)</SelectItem>
                      <SelectItem value="Undergraduate (Bachelor's)">Undergraduate (Bachelor's)</SelectItem>
                      <SelectItem value="Postgraduate (Master's)">Postgraduate (Master's)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="college">College/University</Label>
                  <Input
                    id="college"
                    value={formData.college}
                    onChange={(e) => handleInputChange('college', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="course">Course/Major</Label>
                  <Input
                    id="course"
                    value={formData.course}
                    onChange={(e) => handleInputChange('course', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="year">Current Year</Label>
                  <Select
                    value={formData.year}
                    onValueChange={(value) => handleInputChange('year', value)}
                    disabled={!isEditing}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4">4</SelectItem>
                      <SelectItem value="5">5</SelectItem>
                      <SelectItem value="Graduated">Graduated</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Skills & Preferences */}
          <Card className="shadow-disha border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-primary" />
                Skills & Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="skills">Skills</Label>
                {isEditing ? (
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <Input
                        id="skills"
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type a skill (e.g., Java, Python, React)"
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        onClick={addSkill}
                        disabled={!newSkill.trim()}
                        size="sm"
                        className="px-3"
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        Add
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {formData.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="flex items-center gap-1 pr-1">
                          {skill}
                          <button
                            type="button"
                            onClick={() => removeSkill(skill)}
                            className="ml-1 hover:bg-red-100 rounded-full p-0.5 transition-colors"
                          >
                            <X className="w-3 h-3 text-red-500" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {formData.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location" className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    Preferred Location
                  </Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="preferredStipend">Minimum Stipend</Label>
                  <Input
                    id="preferredStipend"
                    value={formData.preferredStipend}
                    onChange={(e) => handleInputChange('preferredStipend', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="preferredDuration">Preferred Duration</Label>
                  <Select
                    value={formData.preferredDuration}
                    onValueChange={(value) => handleInputChange('preferredDuration', value)}
                    disabled={!isEditing}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1 month">1 month</SelectItem>
                      <SelectItem value="2 months">2 months</SelectItem>
                      <SelectItem value="3 months">3 months</SelectItem>
                      <SelectItem value="4 months">4 months</SelectItem>
                      <SelectItem value="5 months">5 months</SelectItem>
                      <SelectItem value="6 months">6 months</SelectItem>
                      <SelectItem value="7 months">7 months</SelectItem>
                      <SelectItem value="8 months">8 months</SelectItem>
                      <SelectItem value="9 months">9 months</SelectItem>
                      <SelectItem value="10 months">10 months</SelectItem>
                      <SelectItem value="11 months">11 months</SelectItem>
                      <SelectItem value="12 months">12 months</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;