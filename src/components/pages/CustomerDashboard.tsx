import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Clock, CheckCircle, XCircle } from 'lucide-react';
import { BaseCrudService } from '@/lib/mock-service';
import { ServiceRequests } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export default function CustomerDashboard() {
  const [requests, setRequests] = useState<ServiceRequests[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    serviceTitle: '',
    serviceDescription: '',
    serviceLocation: '',
    requestedDate: '',
    requestedTime: '',
  });

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    setIsLoading(true);
    const result = await BaseCrudService.getAll<ServiceRequests>('servicerequests', {}, { limit: 50 });
    setRequests(result.items);
    setIsLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newRequest: ServiceRequests = {
      _id: crypto.randomUUID(),
      serviceTitle: formData.serviceTitle,
      serviceDescription: formData.serviceDescription,
      serviceLocation: formData.serviceLocation,
      requestedDate: formData.requestedDate,
      requestedTime: formData.requestedTime,
      status: 'Pending',
      submissionDate: new Date().toISOString(),
      customerId: 'customer-' + Date.now(),
    };

    setRequests(prev => [newRequest, ...prev]);
    setDialogOpen(false);
    setFormData({
      serviceTitle: '',
      serviceDescription: '',
      serviceLocation: '',
      requestedDate: '',
      requestedTime: '',
    });

    try {
      await BaseCrudService.create('servicerequests', newRequest);
    } catch (error) {
      loadRequests();
    }
  };

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle className="w-5 h-5 text-primary" />;
      case 'Cancelled':
        return <XCircle className="w-5 h-5 text-destructive" />;
      default:
        return <Clock className="w-5 h-5 text-secondary-foreground" />;
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
              Customer Dashboard
            </h1>
            <p className="font-paragraph text-lg text-secondary-foreground">
              Manage your service requests and track their status
            </p>
          </div>

          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary text-primary-foreground hover:opacity-90 font-paragraph px-6 py-6 rounded-lg">
                <Plus className="w-5 h-5 mr-2" />
                New Service Request
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl bg-background">
              <DialogHeader>
                <DialogTitle className="font-heading text-2xl uppercase text-foreground">
                  Submit Service Request
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-6 mt-4">
                <div>
                  <Label htmlFor="serviceTitle" className="font-paragraph text-base text-foreground">
                    Service Title
                  </Label>
                  <Input
                    id="serviceTitle"
                    value={formData.serviceTitle}
                    onChange={(e) => setFormData({ ...formData, serviceTitle: e.target.value })}
                    required
                    className="mt-2 font-paragraph"
                    placeholder="e.g., Plumbing repair needed"
                  />
                </div>

                <div>
                  <Label htmlFor="serviceDescription" className="font-paragraph text-base text-foreground">
                    Description
                  </Label>
                  <Textarea
                    id="serviceDescription"
                    value={formData.serviceDescription}
                    onChange={(e) => setFormData({ ...formData, serviceDescription: e.target.value })}
                    required
                    className="mt-2 font-paragraph min-h-[120px]"
                    placeholder="Describe the service you need in detail"
                  />
                </div>

                <div>
                  <Label htmlFor="serviceLocation" className="font-paragraph text-base text-foreground">
                    Location
                  </Label>
                  <Input
                    id="serviceLocation"
                    value={formData.serviceLocation}
                    onChange={(e) => setFormData({ ...formData, serviceLocation: e.target.value })}
                    required
                    className="mt-2 font-paragraph"
                    placeholder="Enter your address"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="requestedDate" className="font-paragraph text-base text-foreground">
                      Preferred Date
                    </Label>
                    <Input
                      id="requestedDate"
                      type="date"
                      value={formData.requestedDate}
                      onChange={(e) => setFormData({ ...formData, requestedDate: e.target.value })}
                      required
                      className="mt-2 font-paragraph"
                    />
                  </div>

                  <div>
                    <Label htmlFor="requestedTime" className="font-paragraph text-base text-foreground">
                      Preferred Time
                    </Label>
                    <Input
                      id="requestedTime"
                      type="time"
                      value={formData.requestedTime}
                      onChange={(e) => setFormData({ ...formData, requestedTime: e.target.value })}
                      required
                      className="mt-2 font-paragraph"
                    />
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button
                    type="submit"
                    className="bg-primary text-primary-foreground hover:opacity-90 font-paragraph px-8 py-6 rounded-lg"
                  >
                    Submit Request
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setDialogOpen(false)}
                    className="bg-secondary text-secondary-foreground hover:opacity-80 font-paragraph px-8 py-6 rounded-lg"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Service Requests List */}
        <div className="min-h-[400px]">
          {isLoading ? null : requests.length > 0 ? (
            <div className="grid gap-6">
              {requests.map((request, index) => (
                <motion.div
                  key={request._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                >
                  <Link
                    to={`/service-request/${request._id}`}
                    className="block bg-secondary p-8 rounded-lg hover:bg-opacity-80 transition-all"
                  >
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-start gap-3 mb-3">
                          {getStatusIcon(request.status)}
                          <div>
                            <h3 className="font-heading text-xl uppercase text-foreground mb-2">
                              {request.serviceTitle}
                            </h3>
                            <p className="font-paragraph text-base text-secondary-foreground line-clamp-2">
                              {request.serviceDescription}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-4 mt-4 font-paragraph text-sm text-secondary-foreground">
                          <span>📍 {request.serviceLocation}</span>
                          <span>📅 {typeof request.requestedDate === 'string' ? request.requestedDate : new Date(request.requestedDate).toLocaleDateString()}</span>
                          {request.requestedTime && <span>🕐 {request.requestedTime}</span>}
                        </div>
                      </div>
                      <div className="flex flex-col items-end justify-between">
                        <span className={`font-paragraph text-sm px-4 py-2 rounded ${request.status === 'Completed'
                          ? 'bg-primary text-primary-foreground'
                          : request.status === 'Cancelled'
                            ? 'bg-destructive text-destructiveforeground'
                            : 'bg-background text-foreground'
                          }`}>
                          {request.status || 'Pending'}
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="font-paragraph text-lg text-secondary-foreground mb-6">
                No service requests yet. Create your first request to get started.
              </p>
              <Button
                onClick={() => setDialogOpen(true)}
                className="bg-primary text-primary-foreground hover:opacity-90 font-paragraph px-8 py-6 rounded-lg"
              >
                <Plus className="w-5 h-5 mr-2" />
                Create First Request
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
