import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import { useEffect, useRef } from 'react';
import digitalSummit from '@/assets/events/digital-summit.jpg';
import aiWorkshop from '@/assets/events/ai-workshop.jpg';
import greenTechLaunch from '@/assets/events/green-tech-launch.jpg';
import policyFair from '@/assets/events/policy-fair.jpg';
import skillsConference from '@/assets/events/skills-conference.jpg';
import startupFair from '@/assets/events/startup-fair.jpg';
import techWorkshop from '@/assets/events/tech-workshop.jpg';

const events = [
  {
    id: 1,
    title: 'Digital India Summit 2025',
    description: 'Learn about digital transformation initiatives and their impact on governance.',
    date: '2025-12-15',
    location: 'New Delhi',
    image: digitalSummit
  },
  {
    id: 2,
    title: 'AI & Machine Learning Workshop',
    description: 'Hands-on workshop on AI applications in government services and policy making.',
    date: '2025-12-20',
    location: 'Mumbai',
    image: aiWorkshop
  },
  {
    id: 3,
    title: 'Green Technology Launch',
    description: 'Join discussions on environmental policies and sustainable development goals.',
    date: '2025-12-25',
    location: 'Bangalore',
    image: greenTechLaunch
  },
  {
    id: 4,
    title: 'Policy Innovation Fair',
    description: 'Understanding financial policies and inclusion strategies for rural development.',
    date: '2026-01-05',
    location: 'Chennai',
    image: policyFair
  },
  {
    id: 5,
    title: 'Skills Development Conference',
    description: 'Explore skill development programs and career advancement opportunities.',
    date: '2026-01-10',
    location: 'Hyderabad',
    image: skillsConference
  },
  {
    id: 6,
    title: 'Startup India Fair',
    description: 'Connect with startups and learn about entrepreneurship in government sector.',
    date: '2026-01-15',
    location: 'Pune',
    image: startupFair
  },
  {
    id: 7,
    title: 'Technology Innovation Workshop',
    description: 'Deep dive into emerging technologies and their applications in governance.',
    date: '2026-01-20',
    location: 'Kolkata',
    image: techWorkshop
  },
  {
    id: 8,
    title: 'Digital Governance Summit',
    description: 'Learn about e-governance initiatives and digital service delivery.',
    date: '2026-01-25',
    location: 'Ahmedabad',
    image: digitalSummit
  }
];

export function EventGallery() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const scrollWidth = scrollContainer.scrollWidth;
    const clientWidth = scrollContainer.clientWidth;

    if (scrollWidth <= clientWidth) return;

    let scrollPosition = 0;
    const scrollSpeed = 1; // pixels per frame
    const pauseDuration = 2000; // pause at end in milliseconds
    let isPaused = false;
    let pauseTimeout: NodeJS.Timeout;

    const scroll = () => {
      if (isPaused) return;

      scrollPosition += scrollSpeed;

      if (scrollPosition >= scrollWidth - clientWidth) {
        isPaused = true;
        pauseTimeout = setTimeout(() => {
          scrollPosition = 0;
          scrollContainer.scrollLeft = 0;
          isPaused = false;
        }, pauseDuration);
      } else {
        scrollContainer.scrollLeft = scrollPosition;
      }
    };

    const intervalId = setInterval(scroll, 16); // ~60fps

    // Pause on hover
    const handleMouseEnter = () => {
      isPaused = true;
      clearTimeout(pauseTimeout);
    };

    const handleMouseLeave = () => {
      isPaused = false;
    };

    scrollContainer.addEventListener('mouseenter', handleMouseEnter);
    scrollContainer.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      clearInterval(intervalId);
      clearTimeout(pauseTimeout);
      scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
      scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section className="py-16 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold">
            Upcoming <span className="text-primary">Events</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join us for workshops, conferences, and networking opportunities
          </p>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-hidden scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {events.map((event) => (
            <Card key={event.id} className="flex-shrink-0 w-80 shadow-disha hover:shadow-disha-md transition-all duration-300 overflow-hidden group">
              <div className="relative h-48 bg-muted overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3">
                  <Badge className="bg-primary text-primary-foreground">
                    {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </Badge>
                </div>
              </div>

              <CardContent className="p-6 space-y-4">
                <div className="space-y-3">
                  <h3 className="font-heading font-semibold text-lg leading-tight">
                    {event.title}
                  </h3>

                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {event.description}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(event.date).toLocaleDateString('en-IN')}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{event.location}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <Button variant="outline" className="w-full group/btn border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}