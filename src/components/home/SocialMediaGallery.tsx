import { Card, CardContent } from '@/components/ui/card';
import { Twitter, Linkedin, Youtube, Heart, Share, MessageCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import digitalIndiaPost from '@/assets/social/digital-india-post.jpg';
import linkedinSuccess from '@/assets/social/linkedin-success.jpg';
import successStories from '@/assets/social/success-stories.jpg';
import governmentAnnouncement from '@/assets/social/government-announcement.jpg';

const socialMediaPosts = [
  {
    id: 1,
    platform: 'twitter',
    content: 'Exciting news! 500+ students have successfully completed their internships through DISHA this month. Join the revolution in government internships! #DISHA #PMInternship',
    author: 'DISHA Official',
    date: '2024-01-15',
    likes: 245,
    shares: 89,
    image: digitalIndiaPost
  },
  {
    id: 2,
    platform: 'linkedin',
    content: 'Meet Priya Sharma, who secured a full-time position at Ministry of Electronics & IT after completing her AI internship through DISHA. Her success story inspires thousands!',
    author: 'Ministry of Electronics & IT',
    date: '2024-01-14',
    likes: 412,
    shares: 156,
    image: linkedinSuccess
  },
  {
    id: 3,
    platform: 'youtube',
    content: 'Watch: How DISHA is transforming the internship landscape in India. This documentary features success stories from across the nation.',
    author: 'DISHA Channel',
    date: '2024-01-13',
    likes: 1200,
    shares: 340,
    image: successStories
  },
  {
    id: 4,
    platform: 'linkedin',
    content: 'New partnership announcement: DISHA now collaborates with 15+ new government departments to offer specialized internships in emerging technologies.',
    author: 'Government of India',
    date: '2024-01-12',
    likes: 890,
    shares: 234,
    image: governmentAnnouncement
  }
];

export function SocialMediaGallery() {
  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'twitter': return Twitter;
      case 'linkedin': return Linkedin; 
      case 'youtube': return Youtube;
      default: return MessageCircle;
    }
  };

  return (
    <section className="py-16 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold">
            Social Media <span className="text-primary">Updates</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Stay connected with our latest updates and success stories
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {socialMediaPosts.map((post) => {
            const PlatformIcon = getPlatformIcon(post.platform);
            
            return (
              <Card key={post.id} className="shadow-disha hover:shadow-disha-md transition-all duration-300">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <PlatformIcon className="h-5 w-5 text-primary" />
                      <Badge className="bg-secondary text-secondary-foreground text-xs">
                        {post.platform.charAt(0).toUpperCase() + post.platform.slice(1)}
                      </Badge>
                    </div>
                    <span className="text-xs text-muted-foreground">{post.date}</span>
                  </div>
                  
                  {post.image && (
                    <div className="w-full h-32 bg-muted rounded-lg overflow-hidden">
                      <img 
                        src={post.image} 
                        alt="Post image" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  
                  <div className="space-y-3">
                    <p className="text-sm text-foreground leading-relaxed">
                      {post.content}
                    </p>
                    
                    <div className="text-xs text-muted-foreground font-medium">
                      by {post.author}
                    </div>
                    
                    <div className="flex items-center gap-4 pt-2 border-t">
                      <div className="flex items-center gap-1">
                        <Heart className="h-4 w-4 text-primary" />
                        <span className="text-xs font-medium">{post.likes}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Share className="h-4 w-4 text-secondary" />
                        <span className="text-xs font-medium">{post.shares}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}