// HPI 1.7-V
import * as React from 'react';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { Image } from '@/components/ui/image';
import { Wrench, UserCheck, Shield, Clock, ArrowRight, CheckCircle2, MapPin, Star } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// --- Utility Components ---

const SectionDivider = () => (
  <div className="w-full flex justify-center items-center py-12 opacity-20">
    <div className="h-px w-full max-w-[120rem] bg-gradient-to-r from-transparent via-foreground to-transparent" />
  </div>
);

const WireframeIllustration = () => (
  <svg viewBox="0 0 200 200" className="w-full h-full opacity-30 stroke-foreground fill-none stroke-[0.5]">
    <path d="M20,180 L20,100 L100,20 L180,100 L180,180 Z" />
    <path d="M40,180 L40,110 L100,50 L160,110 L160,180" />
    <line x1="20" y1="100" x2="180" y2="100" />
    <line x1="100" y1="20" x2="100" y2="180" />
    <rect x="80" y="120" width="40" height="60" />
    <circle cx="100" cy="75" r="15" />
    <path d="M10,190 L190,190" className="stroke-[2]" />
  </svg>
);

// --- Main Component ---

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // --- Data Sources (Canonized) ---
  const features = [
    {
      icon: Shield,
      title: 'Verified Technicians',
      description: 'All professionals are background-checked and verified for your safety',
      stat: '100% Verified'
    },
    {
      icon: Clock,
      title: 'Instant Booking',
      description: 'Request services and get matched with available technicians in minutes',
      stat: 'Avg 5m Response'
    },
    {
      icon: Wrench,
      title: 'Wide Range of Services',
      description: 'From plumbing to electrical work, find experts for any home service',
      stat: '50+ Categories'
    },
    {
      icon: UserCheck,
      title: 'Trusted Reviews',
      description: 'Read genuine reviews from customers to make informed decisions',
      stat: '4.8/5 Avg Rating'
    }
  ];

  const customerSteps = [
    { num: '01', text: 'Submit your service request with details and location' },
    { num: '02', text: 'Get matched with verified technicians in your area' },
    { num: '03', text: 'Track job status and communicate with your technician' },
    { num: '04', text: 'Confirm completion and leave a review' }
  ];

  const technicianSteps = [
    { num: '01', text: 'Create your professional profile with skills and verification' },
    { num: '02', text: 'Go online to receive live service requests in your area' },
    { num: '03', text: 'Accept jobs that match your expertise and availability' },
    { num: '04', text: 'Complete work, update status, and build your reputation' }
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-background text-foreground overflow-clip selection:bg-primary selection:text-primary-foreground">
      <Header />

      {/* --- HERO SECTION --- */}
      <section className="relative w-full min-h-screen flex flex-col lg:flex-row pt-20 lg:pt-0 overflow-hidden">
        {/* Left Column: Content & Wireframe */}
        <div className="w-full lg:w-[40%] flex flex-col justify-between px-6 md:px-12 lg:pl-24 lg:pr-12 py-12 lg:py-24 z-10 bg-background">
          <div className="flex flex-col justify-center h-full">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-2 mb-6">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="font-paragraph text-sm uppercase tracking-widest text-primary font-bold">Live On-Demand Service</span>
              </div>

              <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl uppercase leading-[0.9] tracking-tight mb-8 text-foreground">
                Connect With <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">Local Service</span> <br />
                Experts
              </h1>

              <p className="font-paragraph text-lg md:text-xl text-muted-foreground mb-10 max-w-md leading-relaxed">
                TrustLocal brings verified technicians to your doorstep. Request services instantly and get connected with skilled professionals in your area.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/customer-dashboard"
                  className="group relative overflow-hidden bg-primary text-primary-foreground font-paragraph font-medium text-base px-8 py-4 rounded-lg transition-all hover:shadow-lg hover:shadow-primary/20"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Request Service <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                </Link>
                <Link
                  to="/technician-dashboard"
                  className="group px-8 py-4 rounded-lg border border-border hover:border-primary transition-colors font-paragraph text-base text-foreground hover:text-primary flex items-center justify-center gap-2"
                >
                  Join as Technician
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Bottom Left: Wireframe Motif */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="hidden lg:block w-48 h-48 mt-12 relative"
          >
            <div className="absolute inset-0 border-l border-b border-border/50" />
            <WireframeIllustration />
            <div className="absolute -bottom-6 -left-6 font-heading text-xs text-muted-foreground uppercase tracking-widest">Schematic 01</div>
          </motion.div>
        </div>

        {/* Right Column: Immersive Image */}
        <div className="w-full lg:w-[60%] h-[60vh] lg:h-auto relative p-4 lg:p-8 lg:pl-0">
          <motion.div
            initial={{ clipPath: 'inset(10% 10% 10% 10% round 24px)' }}
            animate={{ clipPath: 'inset(0% 0% 0% 0% round 24px)' }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full relative overflow-hidden rounded-[24px] lg:rounded-l-[48px] lg:rounded-r-none shadow-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10" />
            <Image
              src="https://images.unsplash.com/photo-1581578731117-104f2a412727?q=80&w=1920&auto=format&fit=crop"
              alt="Professional technician at work"
              width={1600}
              className="w-full h-full object-cover scale-105 hover:scale-100 transition-transform duration-[2s] ease-out"
            />

            {/* Floating Badge */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="absolute bottom-8 right-8 z-20 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-lg max-w-xs"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-primary/10 rounded-full text-primary">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <span className="font-heading text-sm font-bold text-black">Verified Pro</span>
              </div>
              <p className="font-paragraph text-xs text-zinc-600">
                "Excellent service and very professional. Fixed my electrical issue in under an hour."
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* --- TICKER SECTION --- */}
      <div className="w-full bg-primary py-4 overflow-hidden flex relative z-20">
        <motion.div
          className="flex whitespace-nowrap gap-16 items-center"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
        >
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex items-center gap-4 text-primary-foreground/80 font-heading text-sm uppercase tracking-widest">
              <Star className="w-4 h-4 fill-current" />
              <span>Trusted by 10,000+ Homeowners</span>
              <span className="w-1 h-1 bg-current rounded-full" />
              <span>500+ Active Technicians</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* --- FEATURES SECTION (Bento Grid) --- */}
      <section className="w-full max-w-[120rem] mx-auto px-6 md:px-12 lg:px-24 py-32 bg-secondary/30">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20">
          <div className="max-w-2xl">
            <h2 className="font-heading text-4xl md:text-5xl uppercase text-foreground mb-6">
              Why Choose <span className="text-primary">TrustLocal</span>
            </h2>
            <p className="font-paragraph text-lg text-muted-foreground">
              We connect you with verified professionals who deliver quality service every time.
              Safety, speed, and quality are our core pillars.
            </p>
          </div>
          <div className="hidden md:block">
            <Link to="/customer-dashboard" className="text-primary font-heading uppercase text-sm tracking-widest hover:underline underline-offset-4">
              View All Benefits
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </section>

      {/* --- HOW IT WORKS (Split Sticky Scroll) --- */}
      <section className="w-full bg-background relative">
        <div className="max-w-[120rem] mx-auto">

          {/* Customer Flow */}
          <div className="flex flex-col lg:flex-row">
            {/* Sticky Visual Side */}
            <div className="w-full lg:w-1/2 h-[60vh] lg:h-screen sticky top-0 flex items-center justify-center bg-secondary overflow-hidden">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(var(--primary)_1px,transparent_1px)] [background-size:16px_16px]" />
              <div className="relative w-3/4 aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1920&auto=format&fit=crop"
                  alt="Customer using app"
                  width={800}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-8">
                  <h3 className="text-white font-heading text-3xl uppercase">For Customers</h3>
                </div>
              </div>
            </div>

            {/* Scrollable Content Side */}
            <div className="w-full lg:w-1/2 px-6 md:px-12 lg:px-24 py-24 lg:py-48 bg-background z-10">
              <div className="mb-16">
                <span className="text-primary font-heading text-sm uppercase tracking-widest mb-2 block">The Process</span>
                <h2 className="font-heading text-4xl md:text-5xl uppercase text-foreground">
                  Effortless Service <br /> Request
                </h2>
              </div>

              <div className="space-y-24 relative">
                {/* Connecting Line */}
                <div className="absolute left-[19px] top-4 bottom-4 w-px bg-border" />

                {customerSteps.map((step, i) => (
                  <StepItem key={i} step={step} />
                ))}
              </div>

              <div className="mt-24">
                <Link
                  to="/customer-dashboard"
                  className="inline-flex items-center gap-3 bg-foreground text-background px-8 py-4 rounded-lg font-heading uppercase text-sm tracking-widest hover:bg-primary transition-colors"
                >
                  Start Request <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Technician Flow (Inverted) */}
          <div className="flex flex-col lg:flex-row-reverse border-t border-border">
            {/* Sticky Visual Side */}
            <div className="w-full lg:w-1/2 h-[60vh] lg:h-screen sticky top-0 flex items-center justify-center bg-primary overflow-hidden">
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />
              <div className="relative w-3/4 aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/20">
                <Image
                  src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=1920&auto=format&fit=crop"
                  alt="Technician dashboard"
                  width={800}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-8">
                  <h3 className="text-white font-heading text-3xl uppercase">For Technicians</h3>
                </div>
              </div>
            </div>

            {/* Scrollable Content Side */}
            <div className="w-full lg:w-1/2 px-6 md:px-12 lg:px-24 py-24 lg:py-48 bg-background z-10">
              <div className="mb-16">
                <span className="text-primary font-heading text-sm uppercase tracking-widest mb-2 block">Join The Network</span>
                <h2 className="font-heading text-4xl md:text-5xl uppercase text-foreground">
                  Grow Your <br /> Business
                </h2>
              </div>

              <div className="space-y-24 relative">
                <div className="absolute left-[19px] top-4 bottom-4 w-px bg-border" />
                {technicianSteps.map((step, i) => (
                  <StepItem key={i} step={step} />
                ))}
              </div>

              <div className="mt-24">
                <Link
                  to="/technician-dashboard"
                  className="inline-flex items-center gap-3 bg-foreground text-background px-8 py-4 rounded-lg font-heading uppercase text-sm tracking-widest hover:bg-primary transition-colors"
                >
                  Apply Now <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* --- VISUAL BREATHER / PARALLAX --- */}
      <section className="relative w-full h-[80vh] overflow-hidden flex items-center justify-center">
        <ParallaxImage src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1920&auto=format&fit=crop" />
        <div className="absolute inset-0 bg-black/40 z-10" />
        <div className="relative z-20 text-center px-6 max-w-4xl">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-5xl md:text-7xl uppercase text-white mb-8 leading-tight"
          >
            Quality Service <br /> <span className="text-primary">Delivered.</span>
          </motion.h2>
          <p className="font-paragraph text-xl text-white/90 max-w-2xl mx-auto">
            Join thousands of satisfied customers who have found their trusted home service experts through TrustLocal.
          </p>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="w-full bg-primary py-32 px-6 md:px-12 relative overflow-hidden">
        {/* Decorative Circles */}
        <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-black/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

        <div className="max-w-[100rem] mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-heading text-5xl md:text-7xl uppercase text-white mb-8">
                Ready to Get <br /> Started?
              </h2>
              <p className="font-paragraph text-xl text-white/90 mb-12 max-w-xl">
                Whether you need a repair or want to grow your service business, TrustLocal is your partner in success.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/customer-dashboard"
                  className="bg-white text-primary font-heading uppercase text-sm tracking-widest px-10 py-5 rounded-lg hover:bg-secondary transition-colors text-center shadow-xl"
                >
                  Find a Technician
                </Link>
                <Link
                  to="/technicians"
                  className="bg-transparent border border-white text-white font-heading uppercase text-sm tracking-widest px-10 py-5 rounded-lg hover:bg-white/10 transition-colors text-center"
                >
                  Browse Directory
                </Link>
              </div>
            </div>

            {/* Abstract Map Graphic */}
            <div className="relative h-[400px] w-full bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 p-8 flex items-center justify-center overflow-hidden group">
              <div className="absolute inset-0 opacity-30">
                {/* Grid Pattern */}
                <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.2) 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
              </div>

              {/* Animated Pins */}
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-white"
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ delay: i * 0.2, duration: 0.5 }}
                  style={{
                    top: `${20 + Math.random() * 60}%`,
                    left: `${20 + Math.random() * 60}%`
                  } as any}
                >
                  <MapPin className="w-8 h-8 fill-primary stroke-white drop-shadow-lg" />
                </motion.div>
              ))}

              <div className="relative z-10 bg-white p-6 rounded-xl shadow-2xl max-w-xs transform group-hover:scale-105 transition-transform duration-500">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-zinc-200 rounded-full overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop"
                      alt="Avatar"
                      width={48}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="h-2 w-24 bg-zinc-200 rounded mb-2" />
                    <div className="h-2 w-16 bg-zinc-100 rounded" />
                  </div>
                </div>
                <div className="h-2 w-full bg-zinc-100 rounded mb-2" />
                <div className="h-2 w-3/4 bg-zinc-100 rounded" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

// --- Sub-Components ---

interface Feature {
  icon: React.ElementType;
  title: string;
  description: string;
  stat: string;
}

interface Step {
  num: string;
  text: string;
}

const FeatureCard = ({ feature, index }: { feature: Feature, index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group relative bg-background p-8 rounded-2xl border border-border hover:border-primary transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
        <feature.icon className="w-24 h-24 text-primary -rotate-12 translate-x-8 -translate-y-8" />
      </div>

      <div className="relative z-10">
        <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
          <feature.icon className="w-6 h-6" />
        </div>

        <h3 className="font-heading text-xl uppercase text-foreground mb-3 group-hover:text-primary transition-colors">
          {feature.title}
        </h3>

        <p className="font-paragraph text-base text-muted-foreground mb-6">
          {feature.description}
        </p>

        <div className="pt-6 border-t border-border group-hover:border-primary/20">
          <span className="font-heading text-2xl text-foreground">{feature.stat}</span>
        </div>
      </div>
    </motion.div>
  );
};

const StepItem = ({ step }: { step: Step }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-50% 0px -50% 0px" });

  return (
    <div ref={ref} className={`flex gap-8 transition-opacity duration-500 ${isInView ? 'opacity-100' : 'opacity-30'}`}>
      <div className="relative">
        <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center bg-background z-10 relative transition-colors duration-500 ${isInView ? 'border-primary text-primary' : 'border-border text-muted-foreground'}`}>
          <span className="font-heading text-sm font-bold">{step.num}</span>
        </div>
      </div>
      <div className="pt-2">
        <p className="font-paragraph text-xl md:text-2xl text-foreground leading-relaxed">
          {step.text}
        </p>
      </div>
    </div>
  );
};

const ParallaxImage = ({ src }: { src: string }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <div ref={ref} className="absolute inset-0 w-full h-[120%] -top-[10%]">
      <motion.div style={{ y }} className="w-full h-full">
        <Image
          src={src}
          alt="Background"
          width={1920}
          className="w-full h-full object-cover"
        />
      </motion.div>
    </div>
  );
};