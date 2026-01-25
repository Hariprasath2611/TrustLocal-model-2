import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, CheckCircle, Search } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { Technicians } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Image } from '@/components/ui/image';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

export default function TechniciansDirectory() {
  const [technicians, setTechnicians] = useState<Technicians[]>([]);
  const [filteredTechnicians, setFilteredTechnicians] = useState<Technicians[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadTechnicians();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredTechnicians(technicians);
    } else {
      const filtered = technicians.filter(tech => 
        tech.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tech.skills?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tech.bio?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredTechnicians(filtered);
    }
  }, [searchQuery, technicians]);

  const loadTechnicians = async () => {
    setIsLoading(true);
    const result = await BaseCrudService.getAll<Technicians>('technicians', {}, { limit: 50 });
    setTechnicians(result.items);
    setFilteredTechnicians(result.items);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="w-full max-w-[100rem] mx-auto px-8 md:px-16 py-16">
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="font-heading text-4xl md:text-5xl uppercase text-foreground mb-4">
            Find Technicians
          </h1>
          <p className="font-paragraph text-lg text-secondary-foreground mb-8">
            Browse verified professionals and find the right expert for your needs
          </p>

          {/* Search Bar */}
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-secondary-foreground" />
            <Input
              type="text"
              placeholder="Search by name, skills, or expertise..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 py-6 font-paragraph text-base"
            />
          </div>
        </div>

        {/* Technicians Grid */}
        <div className="min-h-[500px]">
          {isLoading ? null : filteredTechnicians.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTechnicians.map((technician, index) => (
                <motion.div
                  key={technician._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                >
                  <Link
                    to={`/technician/${technician._id}`}
                    className="block bg-secondary rounded-lg overflow-hidden hover:bg-opacity-80 transition-all h-full"
                  >
                    {/* Profile Image */}
                    <div className="aspect-square overflow-hidden bg-background">
                      <Image
                        src={technician.profileImage || 'https://static.wixstatic.com/media/5283f4_a219aa5e797a488fa2f5b3f95c705563~mv2.png?originWidth=384&originHeight=384'}
                        alt={technician.name || 'Technician'}
                        width={400}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Technician Info */}
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-heading text-xl uppercase text-foreground">
                          {technician.name}
                        </h3>
                        {technician.isVerified && (
                          <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                        )}
                      </div>

                      <p className="font-paragraph text-base text-secondary-foreground mb-4 line-clamp-2">
                        {technician.bio}
                      </p>

                      {/* Skills */}
                      {technician.skills && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {technician.skills.split(',').slice(0, 3).map((skill, idx) => (
                            <Badge
                              key={idx}
                              className="bg-background text-foreground font-paragraph text-xs px-3 py-1"
                            >
                              {skill.trim()}
                            </Badge>
                          ))}
                        </div>
                      )}

                      {/* Rating and Availability */}
                      <div className="flex items-center justify-between pt-4 border-t border-neutralborder">
                        <div className="flex items-center gap-2">
                          <Star className="w-4 h-4 text-primary fill-primary" />
                          <span className="font-paragraph text-sm text-foreground">
                            {technician.averageRating?.toFixed(1) || 'N/A'}
                          </span>
                        </div>
                        <span className={`font-paragraph text-xs px-3 py-1 rounded ${
                          technician.isAvailable 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-background text-secondary-foreground'
                        }`}>
                          {technician.isAvailable ? 'Available' : 'Busy'}
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-24">
              <p className="font-paragraph text-lg text-secondary-foreground">
                {searchQuery ? 'No technicians found matching your search.' : 'No technicians available at the moment.'}
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
