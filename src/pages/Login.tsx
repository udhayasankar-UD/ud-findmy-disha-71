import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Layout from "@/components/Layout";
import { Smartphone, ArrowRight, Shield } from "lucide-react";

const Login = () => {
  const [aadhaar, setAadhaar] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOtp = async () => {
    if (aadhaar.length !== 12) return;
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setShowOtp(true);
      setIsLoading(false);
    }, 2000);
  };

  const handleLogin = async () => {
    if (otp.length !== 6) return;
    
    setIsLoading(true);
    // Simulate login
    setTimeout(() => {
      window.location.href = "/profile";
    }, 2000);
  };

  return (
    <Layout>
      <div className="min-h-[calc(100vh-theme(spacing.32))] flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
        <div className="w-full max-w-md animate-fade-in">
          <Card className="shadow-disha-lg border-0 bg-card/80 backdrop-blur">
            <CardHeader className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="p-4 rounded-full bg-gradient-primary">
                  <Shield className="w-8 h-8 text-primary-foreground" />
                </div>
              </div>
              <div>
                <CardTitle className="text-2xl font-heading">Welcome Back</CardTitle>
                <CardDescription className="text-base">
                  Sign in to your DISHA account securely
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {!showOtp ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="aadhaar" className="text-sm font-medium">
                      Aadhaar Number
                    </Label>
                    <Input
                      id="aadhaar"
                      type="text"
                      placeholder="Enter your 12-digit Aadhaar number"
                      value={aadhaar}
                      onChange={(e) => setAadhaar(e.target.value.replace(/\D/g, '').slice(0, 12))}
                      className="text-lg tracking-wider"
                    />
                    <p className="text-xs text-muted-foreground">
                      We use Aadhaar for secure authentication only
                    </p>
                  </div>

                  <Button 
                    onClick={handleSendOtp}
                    disabled={aadhaar.length !== 12 || isLoading}
                    className="w-full"
                    size="lg"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground mr-2" />
                        Sending OTP...
                      </>
                    ) : (
                      <>
                        <Smartphone className="mr-2 w-4 h-4" />
                        Send OTP
                      </>
                    )}
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="text-center space-y-2">
                    <div className="text-sm text-muted-foreground">
                      OTP sent to mobile number ending with
                    </div>
                    <div className="font-mono text-lg">****789</div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="otp" className="text-sm font-medium">
                      Enter OTP
                    </Label>
                    <Input
                      id="otp"
                      type="text"
                      placeholder="6-digit OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      className="text-lg tracking-widest text-center"
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      onClick={() => setShowOtp(false)}
                      className="flex-1"
                    >
                      Back
                    </Button>
                    <Button 
                      onClick={handleLogin}
                      disabled={otp.length !== 6 || isLoading}
                      className="flex-1"
                    >
                      {isLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground mr-2" />
                          Verifying...
                        </>
                      ) : (
                        <>
                          Login
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </>
                      )}
                    </Button>
                  </div>

                  <div className="text-center">
                    <Button variant="link" size="sm" onClick={handleSendOtp}>
                      Didn't receive OTP? Resend
                    </Button>
                  </div>
                </div>
              )}

              <div className="text-center space-y-4">
                <div className="text-sm text-muted-foreground">
                  Don't have an account?{" "}
                  <Link to="/signup" className="text-primary hover:underline font-medium">
                    Sign up here
                  </Link>
                </div>
                
                <div className="flex items-center justify-center space-x-2 text-xs text-muted-foreground">
                  <Shield className="w-4 h-4" />
                  <span>Your data is secure and protected</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Login;