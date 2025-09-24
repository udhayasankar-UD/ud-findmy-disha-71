import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';

const events = [
  {
    id: 1,
    title: 'Digital India Workshop',
    description: 'Learn about digital transformation initiatives and their impact on governance.',
    date: '2024-02-15',
    location: 'New Delhi',
    image: '/placeholder.svg'
  },
  {
    id: 2,
    title: 'Healthcare Innovation Summit',
    description: 'Explore healthcare innovations and policy developments in modern India.',
    date: '2024-02-20',
    location: 'Mumbai',
    image: '/placeholder.svg'
  },
  {
    id: 3,
    title: 'Sustainable Development Conference',
    description: 'Join discussions on environmental policies and sustainable development goals.',
    date: '2024-02-25',
    location: 'Bangalore',
    image: '/placeholder.svg'
  },
  {
    id: 4,
    title: 'Financial Inclusion Workshop',
    description: 'Understanding financial policies and inclusion strategies for rural development.',
    date: '2024-03-01',
    location: 'Chennai',
    image: '/placeholder.svg'
  }
];

export function EventGallery() {
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {events.map((event) => (
            <Card key={event.id} className="shadow-disha hover:shadow-disha-md transition-all duration-300 overflow-hidden group">
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