import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/Layout";
import { 
  BarChart3, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Eye, 
  Send,
  Calendar,
  Building,
  MapPin,
  TrendingUp,
  Award,
  Bell
} from "lucide-react";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("all");

  const applicationStats = [
    { label: "Total Applied", value: 12, icon: Send, color: "text-primary" },
    { label: "Under Review", value: 8, icon: Clock, color: "text-warning" },
    { label: "Shortlisted", value: 3, icon: CheckCircle2, color: "text-success" },
    { label: "Selected", value: 1, icon: Award, color: "text-secondary" }
  ];

  const applications = [
    {
      id: "1",
      title: "Frontend Developer Intern",
      company: "TechFlow Solutions",
      location: "Mumbai, Maharashtra",
      appliedDate: "2024-02-25",
      status: "selected",
      stipend: "₹20,000/month",
      duration: "3 months",
      nextStep: "Offer letter pending",
      matchScore: 95
    },
    {
      id: "2",
      title: "Data Science Intern",
      company: "DataMinds Analytics",
      location: "Bangalore, Karnataka",
      appliedDate: "2024-02-22",
      status: "shortlisted",
      stipend: "₹25,000/month",
      duration: "4 months",
      nextStep: "Final interview on March 5",
      matchScore: 88
    },
    {
      id: "3",
      title: "Business Analyst Intern",
      company: "FinanceFirst Consulting",
      location: "Pune, Maharashtra",
      appliedDate: "2024-02-20",
      status: "shortlisted",
      stipend: "₹18,000/month",
      duration: "5 months",
      nextStep: "Technical round on March 3",
      matchScore: 82
    },
    {
      id: "4",
      title: "Digital Marketing Intern",
      company: "BrandCraft Agency",
      location: "Delhi, NCR",
      appliedDate: "2024-02-18",
      status: "under-review",
      stipend: "₹15,000/month",
      duration: "6 months",
      nextStep: "Waiting for HR response",
      matchScore: 76
    },
    {
      id: "5",
      title: "Content Writer Intern",
      company: "Creative Words Studio",
      location: "Remote",
      appliedDate: "2024-02-15",
      status: "under-review",
      stipend: "₹12,000/month",
      duration: "3 months",
      nextStep: "Portfolio review in progress",
      matchScore: 71
    },
    {
      id: "6",
      title: "Graphic Design Intern",
      company: "Visual Impact Studio",
      location: "Chennai, Tamil Nadu",
      appliedDate: "2024-02-12",
      status: "rejected",
      stipend: "₹14,000/month",
      duration: "4 months",
      nextStep: "Position filled",
      matchScore: 68
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "selected": return <Award className="w-4 h-4 text-secondary" />;
      case "shortlisted": return <CheckCircle2 className="w-4 h-4 text-success" />;
      case "under-review": return <Clock className="w-4 h-4 text-warning" />;
      case "rejected": return <XCircle className="w-4 h-4 text-destructive" />;
      default: return <Send className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "selected": return "Selected";
      case "shortlisted": return "Shortlisted";
      case "under-review": return "Under Review";
      case "rejected": return "Not Selected";
      default: return "Applied";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "selected": return "bg-secondary/10 text-secondary border-secondary/20";
      case "shortlisted": return "bg-success/10 text-success border-success/20";
      case "under-review": return "bg-warning/10 text-warning border-warning/20";
      case "rejected": return "bg-destructive/10 text-destructive border-destructive/20";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const filteredApplications = applications.filter(app => {
    if (activeTab === "all") return true;
    return app.status === activeTab;
  });

  const upcomingEvents = [
    {
      date: "March 3",
      time: "2:00 PM",
      event: "Technical Interview",
      company: "FinanceFirst Consulting",
      type: "interview"
    },
    {
      date: "March 5",
      time: "10:30 AM",
      event: "Final Interview",
      company: "DataMinds Analytics",
      type: "interview"
    },
    {
      date: "March 7",
      time: "All Day",
      event: "Offer Letter Expected",
      company: "TechFlow Solutions",
      type: "offer"
    }
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-heading font-bold">Application Dashboard</h1>
              <p className="text-muted-foreground">Track your internship applications and stay updated</p>
            </div>
            <Button asChild>
              <Link to="/ai-matching">
                Find More Matches
              </Link>
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {applicationStats.map((stat, index) => (
              <Card key={index} className="shadow-disha border-0 bg-gradient-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                    </div>
                    <stat.icon className={`w-8 h-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Applications List */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="shadow-disha border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-primary" />
                    My Applications
                  </CardTitle>
                  
                  {/* Filter Tabs */}
                  <div className="flex flex-wrap gap-2">
                    {[
                      { key: "all", label: "All", count: applications.length },
                      { key: "selected", label: "Selected", count: 1 },
                      { key: "shortlisted", label: "Shortlisted", count: 2 },
                      { key: "under-review", label: "Under Review", count: 2 },
                      { key: "rejected", label: "Not Selected", count: 1 }
                    ].map((tab) => (
                      <Button
                        key={tab.key}
                        variant={activeTab === tab.key ? "default" : "outline"}
                        size="sm"
                        onClick={() => setActiveTab(tab.key)}
                        className="text-xs"
                      >
                        {tab.label} ({tab.count})
                      </Button>
                    ))}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {filteredApplications.map((application) => (
                    <Card key={application.id} className="border bg-card/50">
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <div className="flex justify-between items-start">
                            <div className="space-y-1">
                              <h3 className="font-semibold">{application.title}</h3>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Building className="w-4 h-4" />
                                {application.company}
                              </div>
                            </div>
                            <Badge className={getStatusColor(application.status)}>
                              {getStatusIcon(application.status)}
                              <span className="ml-1">{getStatusLabel(application.status)}</span>
                            </Badge>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                            <div className="flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-muted-foreground" />
                              <span className="text-muted-foreground">{application.location}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3 text-muted-foreground" />
                              <span className="text-muted-foreground">{application.duration}</span>
                            </div>
                            <div className="text-muted-foreground">{application.stipend}</div>
                            <div className="text-muted-foreground">Match: {application.matchScore}%</div>
                          </div>

                          <div className="flex justify-between items-center pt-2 border-t">
                            <div className="text-sm">
                              <span className="text-muted-foreground">Next: </span>
                              <span className="font-medium">{application.nextStep}</span>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm" asChild>
                                <Link to={`/internships/${application.id}`}>
                                  <Eye className="w-3 h-3 mr-1" />
                                  View
                                </Link>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  {filteredApplications.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      No applications found for this status.
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Upcoming Events */}
              <Card className="shadow-disha border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="w-5 h-5 text-primary" />
                    Upcoming Events
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {upcomingEvents.map((event, index) => (
                    <div key={index} className="flex gap-3 p-3 bg-muted/50 rounded-lg">
                      <div className="text-center min-w-[60px]">
                        <div className="text-sm font-medium">{event.date}</div>
                        <div className="text-xs text-muted-foreground">{event.time}</div>
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="font-medium text-sm">{event.event}</div>
                        <div className="text-xs text-muted-foreground">{event.company}</div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card className="shadow-disha border-0 bg-gradient-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    Your Progress
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Success Rate</span>
                      <span className="font-semibold">25%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-success h-2 rounded-full w-1/4" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Profile Views</span>
                      <span className="font-semibold">47</span>
                    </div>
                    <div className="text-xs text-muted-foreground">+12% from last week</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Response Rate</span>
                      <span className="font-semibold">67%</span>
                    </div>
                    <div className="text-xs text-muted-foreground">Above average</div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="shadow-disha border-0">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link to="/profile">
                      Update Profile
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link to="/ai-matching">
                      Get New Matches
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link to="/internships">
                      Browse All Internships
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

export default Dashboard;