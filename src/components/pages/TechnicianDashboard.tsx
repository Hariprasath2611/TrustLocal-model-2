import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Clock, CheckCircle } from 'lucide-react';
import { BaseCrudService } from '@/lib/mock-service';
import { ServiceRequests } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

export default function TechnicianDashboard() {
  const [availableRequests, setAvailableRequests] = useState<ServiceRequests[]>([]);
  const [acceptedRequests, setAcceptedRequests] = useState<ServiceRequests[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    setIsLoading(true);
    const result = await BaseCrudService.getAll<ServiceRequests>('servicerequests', {}, { limit: 50 });

    const available = result.items.filter(r => r.status === 'Pending');
    const accepted = result.items.filter(r => r.status === 'In Progress' || r.status === 'Accepted');

    setAvailableRequests(available);
    setAcceptedRequests(accepted);
    setIsLoading(false);
  };

  const handleAcceptRequest = async (requestId: string) => {
    const request = availableRequests.find(r => r._id === requestId);
    if (!request) return;

    const updatedRequest = { ...request, status: 'Accepted' };
    setAvailableRequests(prev => prev.filter(r => r._id !== requestId));
    setAcceptedRequests(prev => [updatedRequest, ...prev]);

    try {
      await BaseCrudService.update('servicerequests', { _id: requestId, status: 'Accepted' });
    } catch (error) {
      loadRequests();
    }
  };

  const handleUpdateStatus = async (requestId: string, newStatus: string) => {
    const request = acceptedRequests.find(r => r._id === requestId);
    if (!request) return;

    if (newStatus === 'Completed') {
      setAcceptedRequests(prev => prev.filter(r => r._id !== requestId));
    } else {
      const updatedRequest = { ...request, status: newStatus };
      setAcceptedRequests(prev => prev.map(r => r._id === requestId ? updatedRequest : r));
    }

    try {
      await BaseCrudService.update('servicerequests', { _id: requestId, status: newStatus });
    } catch (error) {
      loadRequests();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="w-full max-w-[100rem] mx-auto px-8 md:px-16 py-16">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="font-heading text-4xl md:text-5xl uppercase text-foreground mb-2">
              Technician Dashboard
            </h1>
            <p className="font-paragraph text-lg text-secondary-foreground">
              Manage service requests and update job status
            </p>
          </div>

          <div className="flex items-center gap-4 bg-secondary p-4 rounded-lg">
            <Label htmlFor="online-status" className="font-paragraph text-base text-foreground">
              {isOnline ? 'Online' : 'Offline'}
            </Label>
            <Switch
              id="online-status"
              checked={isOnline}
              onCheckedChange={setIsOnline}
            />
          </div>
        </div>

        {/* Available Requests Section */}
        <section className="mb-16">
          <h2 className="font-heading text-3xl uppercase text-foreground mb-8">
            Available Service Requests
          </h2>

          <div className="min-h-[300px]">
            {isLoading ? null : availableRequests.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {availableRequests.map((request, index) => (
                  <motion.div
                    key={request._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                    className="bg-secondary p-6 rounded-lg"
                  >
                    <h3 className="font-heading text-xl uppercase text-foreground mb-3">
                      {request.serviceTitle}
                    </h3>
                    <p className="font-paragraph text-base text-secondary-foreground mb-4 line-clamp-2">
                      {request.serviceDescription}
                    </p>

                    <div className="space-y-2 mb-6 font-paragraph text-sm text-secondary-foreground">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-primary" />
                        <span>{request.serviceLocation}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-primary" />
                        <span>{request.requestedDate}</span>
                      </div>
                      {request.requestedTime && (
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-primary" />
                          <span>{request.requestedTime}</span>
                        </div>
                      )}
                    </div>

                    <Button
                      onClick={() => handleAcceptRequest(request._id)}
                      disabled={!isOnline}
                      className="w-full bg-primary text-primary-foreground hover:opacity-90 font-paragraph px-6 py-6 rounded-lg disabled:opacity-50"
                    >
                      Accept Request
                    </Button>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-secondary rounded-lg">
                <p className="font-paragraph text-lg text-secondary-foreground">
                  No available service requests at the moment. Check back later.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Accepted Jobs Section */}
        <section>
          <h2 className="font-heading text-3xl uppercase text-foreground mb-8">
            My Active Jobs
          </h2>

          <div className="min-h-[300px]">
            {isLoading ? null : acceptedRequests.length > 0 ? (
              <div className="grid gap-6">
                {acceptedRequests.map((request, index) => (
                  <motion.div
                    key={request._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                    className="bg-secondary p-8 rounded-lg"
                  >
                    <div className="flex flex-col lg:flex-row justify-between gap-6">
                      <div className="flex-1">
                        <div className="flex items-start gap-3 mb-4">
                          <div>
                            <h3 className="font-heading text-xl uppercase text-foreground mb-2">
                              {request.serviceTitle}
                            </h3>
                            <p className="font-paragraph text-base text-secondary-foreground mb-4">
                              {request.serviceDescription}
                            </p>
                            <div className="flex flex-wrap gap-4 font-paragraph text-sm text-secondary-foreground">
                              <span className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-primary" />
                                {request.serviceLocation}
                              </span>
                              <span className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-primary" />
                                {request.requestedDate}
                              </span>
                              {request.requestedTime && (
                                <span className="flex items-center gap-2">
                                  <Clock className="w-4 h-4 text-primary" />
                                  {request.requestedTime}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-3">
                        <span className="font-paragraph text-sm px-4 py-2 rounded bg-background text-foreground text-center">
                          {request.status}
                        </span>
                        <Button
                          onClick={() => handleUpdateStatus(request._id, 'In Progress')}
                          className="bg-primary text-primary-foreground hover:opacity-90 font-paragraph px-6 py-3 rounded-lg whitespace-nowrap"
                        >
                          Start Work
                        </Button>
                        <Button
                          onClick={() => handleUpdateStatus(request._id, 'Completed')}
                          className="bg-primary text-primary-foreground hover:opacity-90 font-paragraph px-6 py-3 rounded-lg whitespace-nowrap"
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Complete
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-secondary rounded-lg">
                <p className="font-paragraph text-lg text-secondary-foreground">
                  You haven't accepted any jobs yet. Browse available requests above.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
