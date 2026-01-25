import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Calendar, Clock, User } from 'lucide-react';
import { BaseCrudService } from '@/lib/mock-service';
import { ServiceRequests } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Button } from '@/components/ui/button';

export default function ServiceRequestDetails() {
  const { id } = useParams<{ id: string }>();
  const [request, setRequest] = useState<ServiceRequests | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadRequest();
  }, [id]);

  const loadRequest = async () => {
    setIsLoading(true);
    if (id) {
      const data = await BaseCrudService.getById<ServiceRequests>('servicerequests', id);
      setRequest(data);
    }
    setIsLoading(false);
  };

  const handleStatusUpdate = async (newStatus: string) => {
    if (!request) return;

    const updatedRequest = { ...request, status: newStatus };
    setRequest(updatedRequest);

    try {
      await BaseCrudService.update('servicerequests', request._id, { status: newStatus });
    } catch (error) {
      loadRequest();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="w-full max-w-[100rem] mx-auto px-8 md:px-16 py-16">
        <div className="min-h-[500px]">
          {isLoading ? (
            <div className="flex justify-center items-center py-24">
              <LoadingSpinner />
            </div>
          ) : !request ? (
            <div className="text-center py-24">
              <h2 className="font-heading text-3xl uppercase text-foreground mb-4">
                Request Not Found
              </h2>
              <p className="font-paragraph text-lg text-secondary-foreground mb-8">
                The service request you're looking for doesn't exist.
              </p>
              <Link to="/customer-dashboard">
                <Button className="bg-primary text-primary-foreground hover:opacity-90 font-paragraph px-8 py-6 rounded-lg">
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Back to Dashboard
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
                to="/customer-dashboard"
                className="inline-flex items-center gap-2 font-paragraph text-base text-secondary-foreground hover:text-primary transition-colors mb-8"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Dashboard
              </Link>

              {/* Request Header */}
              <div className="bg-secondary p-8 md:p-12 rounded-lg mb-8">
                <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-6">
                  <div>
                    <h1 className="font-heading text-3xl md:text-4xl uppercase text-foreground mb-4">
                      {request.serviceTitle}
                    </h1>
                    <span className={`inline-block font-paragraph text-sm px-4 py-2 rounded ${request.status === 'Completed'
                      ? 'bg-primary text-primary-foreground'
                      : request.status === 'Cancelled'
                        ? 'bg-destructive text-destructiveforeground'
                        : 'bg-background text-foreground'
                      }`}>
                      {request.status || 'Pending'}
                    </span>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mt-8">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-paragraph text-sm text-secondary-foreground mb-1">Location</p>
                      <p className="font-paragraph text-base text-foreground">{request.serviceLocation}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-paragraph text-sm text-secondary-foreground mb-1">Requested Date</p>
                      <p className="font-paragraph text-base text-foreground">{typeof request.requestedDate === 'string' ? request.requestedDate : new Date(request.requestedDate).toLocaleDateString()}</p>
                    </div>
                  </div>

                  {request.requestedTime && (
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-paragraph text-sm text-secondary-foreground mb-1">Requested Time</p>
                        <p className="font-paragraph text-base text-foreground">{request.requestedTime}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-start gap-3">
                    <User className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-paragraph text-sm text-secondary-foreground mb-1">Customer ID</p>
                      <p className="font-paragraph text-base text-foreground">{request.customerId}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description Section */}
              <div className="bg-secondary p-8 md:p-12 rounded-lg mb-8">
                <h2 className="font-heading text-2xl uppercase text-foreground mb-4">
                  Service Description
                </h2>
                <p className="font-paragraph text-base text-secondary-foreground leading-relaxed">
                  {request.serviceDescription}
                </p>
              </div>

              {/* Status Actions */}
              {request.status !== 'Completed' && request.status !== 'Cancelled' && (
                <div className="bg-secondary p-8 md:p-12 rounded-lg">
                  <h2 className="font-heading text-2xl uppercase text-foreground mb-6">
                    Update Status
                  </h2>
                  <div className="flex flex-wrap gap-4">
                    <Button
                      onClick={() => handleStatusUpdate('In Progress')}
                      className="bg-primary text-primary-foreground hover:opacity-90 font-paragraph px-6 py-6 rounded-lg"
                    >
                      Mark In Progress
                    </Button>
                    <Button
                      onClick={() => handleStatusUpdate('Completed')}
                      className="bg-primary text-primary-foreground hover:opacity-90 font-paragraph px-6 py-6 rounded-lg"
                    >
                      Mark Completed
                    </Button>
                    <Button
                      onClick={() => handleStatusUpdate('Cancelled')}
                      className="bg-destructive text-destructiveforeground hover:opacity-90 font-paragraph px-6 py-6 rounded-lg"
                    >
                      Cancel Request
                    </Button>
                  </div>
                </div>
              )}

              {/* Submission Info */}
              <div className="mt-8 p-6 bg-background border border-neutralborder rounded-lg">
                <p className="font-paragraph text-sm text-secondary-foreground">
                  Submitted on: {request.submissionDate ? new Date(request.submissionDate).toLocaleString() : 'N/A'}
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
