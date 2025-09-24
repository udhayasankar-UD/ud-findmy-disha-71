import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroImage from '@/assets/hero-image.jpg';
import { PartnersCarousel } from '@/components/home/PartnersCarousel';
import { EligibilityDashboard } from '@/components/home/EligibilityDashboard';
import { BenefitsSection } from '@/components/home/BenefitsSection';
import { SocialMediaGallery } from '@/components/home/SocialMediaGallery';
import { EventGallery } from '@/components/home/EventGallery';
import { OpportunitiesCarousel } from '@/components/home/OpportunitiesCarousel';
import { IndiaMapVisualization } from '@/components/home/IndiaMapVisualization';

export default function Home() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-secondary text-white">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="relative container mx-auto px-4 py-20 md:py-32">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-6xl font-heading font-bold leading-tight">
                  Welcome to{" "}
                  <span className="text-primary">DISHA</span>
                </h1>
                <h2 className="text-xl md:text-2xl font-semibold text-white/90">
                  AI Automation Engine for PM Recommendation Scheme
                </h2>
                <p className="text-lg text-white/80 max-w-xl">
                  Discover government internship opportunities tailored to your skills and aspirations. 
                  Let AI help you find the perfect match for your career growth.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild className="bg-primary hover:bg-primary-dark text-lg px-8">
                  <Link to="/login">
                    Login with Aadhaar
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  asChild
                  className="border-white text-white hover:bg-white hover:text-secondary text-lg px-8"
                >
                  <Link to="/signup">
                    <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                    Create New Account
                  </Link>
                </Button>
              </div>
            </div>
            <div className="flex justify-center">
              <img 
                src={heroImage} 
                alt="Government internship platform illustration" 
                className="max-w-full rounded-xl shadow-disha"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Partners Carousel */}
      <PartnersCarousel />

      {/* Eligibility Dashboard */}
      <EligibilityDashboard />

      {/* Core Benefits */}
      <BenefitsSection />

      {/* Social Media Gallery */}
      <SocialMediaGallery />

      {/* Event Gallery */}
      <EventGallery />

      {/* Opportunities Carousel */}
      <OpportunitiesCarousel />

      {/* India Map Visualization */}
      <IndiaMapVisualization />
    </div>
  );
}