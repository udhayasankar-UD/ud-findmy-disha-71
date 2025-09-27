import { Card, CardContent } from '@/components/ui/card';

const partners = [
  { id: 1, name: 'Ministry of Electronics & IT', sector: 'Technology', logo: '/placeholder.svg' },
  { id: 2, name: 'Ministry of Health & Family Welfare', sector: 'Healthcare', logo: '/placeholder.svg' },
  { id: 3, name: 'Ministry of Education', sector: 'Education', logo: '/placeholder.svg' },
  { id: 4, name: 'Ministry of Finance', sector: 'Finance', logo: '/placeholder.svg' },
  { id: 5, name: 'Ministry of Railways', sector: 'Transportation', logo: '/placeholder.svg' },
  { id: 6, name: 'Ministry of Defence', sector: 'Defence', logo: '/placeholder.svg' },
  { id: 7, name: 'Ministry of External Affairs', sector: 'International Relations', logo: '/placeholder.svg' },
  { id: 8, name: 'Ministry of Environment', sector: 'Environment', logo: '/placeholder.svg' },
];

export function PartnersCarousel() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold">
            Our Government <span className="text-primary">Partners</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Trusted ministries and departments offering internship opportunities
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
          {partners.map((partner) => (
            <Card key={partner.id} className="text-center hover:shadow-disha transition-all duration-300 group">
              <CardContent className="p-6 space-y-4">
                <div className="w-16 h-16 mx-auto bg-muted rounded-lg flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="w-12 h-12 object-contain"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-foreground leading-tight">{partner.name}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{partner.sector}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}