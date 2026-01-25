import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Star, CheckCircle, MapPin, Briefcase } from 'lucide-react';
import { BaseCrudService } from '@/lib/mock-service';
import { Technicians, Reviews } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Image } from '@/components/ui/image';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function TechnicianProfile() {
  const { id } = useParams<{ id: string }>();
  const [technician, setTechnician] = useState<Technicians | null>(null);
  const [reviews, setReviews] = useState<Reviews[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadTechnicianData();
  }, [id]);

  const loadTechnicianData = async () => {
    setIsLoading(true);
    if (id) {
      const techData = await BaseCrudService.getById<Technicians>('technicians', id);
      setTechnician(techData);

      const reviewsResult = await BaseCrudService.getAll<Reviews>('reviews', {}, { limit: 50 });
      const techReviews = reviewsResult.items.filter(r => r.technicianId === id);
      setReviews(techReviews);
    }
    setIsLoading(false);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-primary fill-primary' : 'text-neutralborder'
          }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="w-full max-w-[100rem] mx-auto px-8 md:px-16 py-16">
        <div className="min-h-[600px]">
          {isLoading ? (
            <div className="flex justify-center items-center py-24">
              <LoadingSpinner />
            </div>
          ) : !technician ? (
            <div className="text-center py-24">
              <h2 className="font-heading text-3xl uppercase text-foreground mb-4">
                Technician Not Found
              </h2>
              <p className="font-paragraph text-lg text-secondary-foreground mb-8">
                The technician profile you're looking for doesn't exist.
              </p>
              <Link to="/technicians">
                <Button className="bg-primary text-primary-foreground hover:opacity-90 font-paragraph px-8 py-6 rounded-lg">
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Back to Directory
                </Button>
              </Link>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Back Button */}
              <Link
                to="/technicians"
                className="inline-flex items-center gap-2 font-paragraph text-base text-secondary-foreground hover:text-primary transition-colors mb-8"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Directory
              </Link>

              {/* Profile Header */}
              <div className="grid lg:grid-cols-[400px_1fr] gap-8 mb-12">
                {/* Profile Image */}
                <div className="bg-secondary rounded-lg overflow-hidden">
                  <Image
                    src={technician.profileImage || 'https://static.wixstatic.com/media/5283f4_6cd24b5eb93e4fdba3625cd7737496ac~mv2.png?originWidth=384&originHeight=384'}
                    alt={technician.name || 'Technician'}
                    width={400}
                    className="w-full aspect-square object-cover"
                  />
                </div>

                {/* Profile Info */}
                <div className="bg-secondary p-8 md:p-12 rounded-lg">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h1 className="font-heading text-3xl md:text-4xl uppercase text-foreground mb-2">
                        {technician.name}
                      </h1>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="flex items-center gap-2">
                          <Star className="w-5 h-5 text-primary fill-primary" />
                          <span className="font-paragraph text-lg text-foreground">
                            {technician.averageRating?.toFixed(1) || 'N/A'}
                          </span>
                          <span className="font-paragraph text-sm text-secondary-foreground">
                            ({reviews.length} reviews)
                          </span>
                        </div>
                      </div>
                    </div>
                    {technician.isVerified && (
                      <div className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded">
                        <CheckCircle className="w-5 h-5" />
                        <span className="font-paragraph text-sm">Verified</span>
                      </div>
                    )}
                  </div>

                  <p className="font-paragraph text-base text-secondary-foreground mb-6 leading-relaxed">
                    {technician.bio}
                  </p>

                  {/* Skills */}
                  {technician.skills && (
                    <div className="mb-6">
                      <h3 className="font-heading text-lg uppercase text-foreground mb-3 flex items-center gap-2">
                        <Briefcase className="w-5 h-5 text-primary" />
                        Skills & Expertise
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {technician.skills.split(',').map((skill, idx) => (
                          <Badge
                            key={idx}
                            className="bg-background text-foreground font-paragraph text-sm px-4 py-2"
                          >
                            {skill.trim()}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Availability Status */}
                  <div className="flex items-center gap-3 pt-6 border-t border-neutralborder">
                    <span className="font-paragraph text-base text-foreground">Status:</span>
                    <span className={`font-paragraph text-sm px-4 py-2 rounded ${technician.isAvailable
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-background text-secondary-foreground'
                      }`}>
                      {technician.isAvailable ? 'Available for Work' : 'Currently Busy'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Reviews Section */}
              <div className="bg-secondary p-8 md:p-12 rounded-lg">
                <h2 className="font-heading text-2xl uppercase text-foreground mb-8">
                  Customer Reviews
                </h2>

                {reviews.length > 0 ? (
                  <div className="space-y-6">
                    {reviews.map((review, index) => (
                      <motion.div
                        key={review._id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05, duration: 0.3 }}
                        className="bg-background p-6 rounded-lg"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <p className="font-paragraph text-base text-foreground font-semibold mb-1">
                              {review.customerName || 'Anonymous Customer'}
                            </p>
                            <div className="flex items-center gap-2">
                              {renderStars(review.starRating || 0)}
                            </div>
                          </div>
                          <span className="font-paragraph text-sm text-secondary-foreground">
                            {review.reviewDate ? new Date(review.reviewDate).toLocaleDateString() : ''}
                          </span>
                        </div>
                        <p className="font-paragraph text-base text-secondary-foreground leading-relaxed">
                          {review.reviewText}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="font-paragraph text-base text-secondary-foreground">
                      No reviews yet. Be the first to work with this technician and leave a review!
                    </p>
                  </div>
                )}
              </div>

              {/* Contact CTA */}
              <div className="mt-8 bg-primary p-8 md:p-12 rounded-lg text-center">
                <h3 className="font-heading text-2xl uppercase text-primary-foreground mb-4">
                  Ready to Work with {technician.name?.split(' ')[0]}?
                </h3>
                <p className="font-paragraph text-base text-primary-foreground mb-6">
                  Submit a service request and get connected with this verified professional
                </p>
                <Link to="/customer-dashboard">
                  <Button className="bg-background text-foreground hover:opacity-90 font-paragraph px-8 py-6 rounded-lg">
                    Request Service
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
