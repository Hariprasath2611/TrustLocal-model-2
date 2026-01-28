import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMember } from '@/context/MemberContext';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Wrench, ArrowRight, Shield, UserCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Image } from '@/components/ui/image';

export default function LoginPage() {
    const { loginWithCredentials, loginAsGuest } = useMember();
    const navigate = useNavigate();
    const [selectedRole, setSelectedRole] = useState<'customer' | 'technician' | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Form State
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedRole) return;

        setLoading(true);
        setError(null);

        const success = await loginWithCredentials(email, password, selectedRole);

        if (success) {
            navigate(selectedRole === 'customer' ? '/customer-dashboard' : '/technician-dashboard');
        } else {
            setError("Invalid email or password. Please try again.");
        }
        setLoading(false);
    };

    const handleGuestAccess = () => {
        loginAsGuest();
        navigate('/');
    };

    return (
        <div className="min-h-screen w-full flex bg-background">
            {/* Left Panel - Visual & Role Selection */}
            <div className={cn(
                "relative w-full transition-all duration-700 ease-in-out p-6 md:p-12 flex flex-col justify-center",
                selectedRole ? "lg:w-1/2" : "w-full items-center"
            )}>
                {/* Background Patterns */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-secondary/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
                </div>

                <div className="relative z-10 w-full max-w-4xl mx-auto">
                    {/* Logo & Headline */}
                    <motion.div
                        layout
                        className={cn("mb-12", !selectedRole && "text-center")}
                    >
                        <div className={cn(
                            "mb-6 flex items-center gap-3",
                            !selectedRole && "justify-center"
                        )}>
                            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-heading font-bold text-xl shadow-lg">
                                TL
                            </div>
                            <span className="font-heading text-2xl font-bold text-foreground">TrustLocal</span>
                        </div>

                        <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-foreground mb-4 leading-tight">
                            {selectedRole ? (
                                <>
                                    Log in as <br />
                                    <span className="text-primary">{selectedRole === 'customer' ? 'Customer' : 'Professional'}</span>
                                </>
                            ) : (
                                <>
                                    Connect with <br />
                                    <span className="text-primary">Trusted Experts</span>
                                </>
                            )}
                        </h1>
                        <p className="font-paragraph text-muted-foreground text-lg max-w-xl mx-auto md:mx-0">
                            {selectedRole
                                ? "Welcome back. Please enter your credentials to access your dashboard."
                                : "Choose how you would like to continue. Manage your home services or grow your business."
                            }
                        </p>
                    </motion.div>

                    {/* Role Selection Cards */}
                    <div className={cn(
                        "grid gap-6 transition-all duration-500",
                        selectedRole ? "grid-cols-1 md:grid-cols-2 lg:hidden" : "grid-cols-1 md:grid-cols-2"
                    )}>
                        <RoleCard
                            active={selectedRole === 'customer'}
                            icon={UserCircle2}
                            title="Customer"
                            desc="Book services & track requests"
                            onClick={() => setSelectedRole('customer')}
                        />
                        <RoleCard
                            active={selectedRole === 'technician'}
                            icon={Wrench}
                            title="Technician"
                            desc="Manage jobs & view leads"
                            onClick={() => setSelectedRole('technician')}
                        />
                    </div>

                    {/* Guest Option (Back button if role selected) */}
                    <motion.div
                        layout
                        className={cn("mt-8 flex items-center gap-4", !selectedRole && "justify-center")}
                    >
                        {selectedRole ? (
                            <Button
                                variant="ghost"
                                onClick={() => setSelectedRole(null)}
                                className="text-muted-foreground hover:text-foreground pl-0"
                            >
                                ← Back to selection
                            </Button>
                        ) : (
                            <div className="flex flex-col items-center gap-2">
                                <Button variant="link" onClick={handleGuestAccess} className="text-muted-foreground hover:text-primary">
                                    Just browsing? Continue as Guest <ArrowRight className="w-4 h-4 ml-1" />
                                </Button>
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>

            {/* Right Panel - Login Form (Only visible when role selected) */}
            <AnimatePresence mode="wait">
                {selectedRole && (
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 50 }}
                        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                        className="hidden lg:flex w-1/2 bg-surface border-l border-border relative items-center justify-center p-12"
                    >
                        <div className="w-full max-w-md">
                            <Card className="border-0 shadow-none bg-transparent">
                                <CardContent className="p-0 space-y-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email Address</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="name@example.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="h-12 border-muted"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center">
                                            <Label htmlFor="password">Password</Label>
                                            <a href="#" className="text-xs text-primary font-medium hover:underline">Forgot password?</a>
                                        </div>
                                        <Input
                                            id="password"
                                            type="password"
                                            placeholder="••••••••"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="h-12 border-muted"
                                        />
                                    </div>

                                    {error && (
                                        <div className="text-sm text-destructive font-medium text-center">
                                            {error}
                                        </div>
                                    )}

                                    <Button
                                        onClick={handleLogin}
                                        disabled={loading}
                                        className="w-full h-12 text-base font-medium"
                                    >
                                        {loading ? (
                                            <span className="flex items-center gap-2">
                                                <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                                Signing in...
                                            </span>
                                        ) : (
                                            "Sign In"
                                        )}
                                    </Button>

                                    <p className="text-center text-sm text-muted-foreground mt-6">
                                        Don't have an account?{' '}
                                        <a href="#" className="text-foreground font-medium hover:underline">Sign up</a>
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Mobile Form Overlay (if needed but desktop split works well) */}
            <AnimatePresence>
                {selectedRole && (
                    <motion.div className="lg:hidden absolute inset-0 z-50 bg-background flex flex-col p-6 overflow-y-auto">
                        <div className="w-full max-w-md mx-auto mt-12">
                            <Button
                                variant="ghost"
                                onClick={() => setSelectedRole(null)}
                                className="mb-8 pl-0 text-muted-foreground"
                            >
                                ← Back
                            </Button>

                            <h2 className="font-heading text-3xl mb-2">Sign In</h2>
                            <p className="text-muted-foreground mb-8">Access your {selectedRole} dashboard</p>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="mobile-email">Email</Label>
                                    <Input
                                        id="mobile-email"
                                        type="email"
                                        placeholder="name@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="h-12"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="mobile-password">Password</Label>
                                    <Input
                                        id="mobile-password"
                                        type="password"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="h-12"
                                    />
                                </div>
                                <Button
                                    onClick={handleLogin}
                                    className="w-full h-12 text-base font-medium"
                                    disabled={loading}
                                >
                                    {loading ? "Signing in..." : "Sign In"}
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// --- Helper Components ---

function RoleCard({ active, icon: Icon, title, desc, onClick }: any) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "relative group flex items-center gap-6 p-6 rounded-2xl border transition-all duration-300 text-left",
                active
                    ? "bg-primary/5 border-primary ring-1 ring-primary" // Not heavily used on large screens as they disappear
                    : "bg-surface border-border hover:border-primary/50 hover:shadow-lg hover:-translate-y-1"
            )}
        >
            <div className={cn(
                "w-16 h-16 rounded-xl flex items-center justify-center transition-colors duration-300 shadow-sm",
                active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground"
            )}>
                <Icon className="w-8 h-8" />
            </div>
            <div>
                <h3 className="font-heading text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors">{title}</h3>
                <p className="font-paragraph text-sm text-muted-foreground">{desc}</p>
            </div>

            {/* Selection Check */}
            {active && (
                <div className="absolute top-4 right-4 text-primary">
                    <Shield className="w-5 h-5 fill-current" />
                </div>
            )}
        </button>
    );
}
