import React, { createContext, useContext, useEffect, useState } from 'react';

interface MemberContextType {
    member: any | null;
    userType: 'customer' | 'technician' | 'guest' | null;
    loading: boolean;
    login: (role: 'customer' | 'technician') => void;
    loginWithCredentials: (email: string, password: string, role: 'customer' | 'technician') => Promise<boolean>; // New
    loginAsGuest: () => void;
    logout: () => void;
    // Aliases for compatibility
    isAuthenticated: boolean;
    isLoading: boolean; // Note: Inconsistent naming fixed below by using loading
    actions: {
        login: (role: 'customer' | 'technician') => void;
        loginWithCredentials: (email: string, password: string, role: 'customer' | 'technician') => Promise<boolean>;
        loginAsGuest: () => void;
        logout: () => void;
    }
}

const MemberContext = createContext<MemberContextType | undefined>(undefined);

export function MemberProvider({ children }: { children: React.ReactNode }) {
    const [member, setMember] = useState<any | null>(null);
    const [userType, setUserType] = useState<'customer' | 'technician' | 'guest' | null>(null);
    const [loading, setLoading] = useState(true);

    const API_URL = 'http://localhost:5000/api/auth';

    useEffect(() => {
        const checkMember = async () => {
            setLoading(true);
            const token = localStorage.getItem('token');
            if (token) {
                // Determine user type from token (decoding not shown for brevity, or just rely on stored state if persisted)
                // Ideally, verify token with backend /me endpoint here.
                // For now, let's just clear if invalid or keep simplified.
                // TODO: Implement /me endpoint to validate token on load.
                // For MVP: we will treat existence of token as logged in, but we need role.
                const storedRole = localStorage.getItem('userType') as 'customer' | 'technician';
                if (storedRole) {
                    setUserType(storedRole);
                    setMember({ role: storedRole }); // Placeholder
                }
            }
            setLoading(false);
        };
        checkMember();
    }, []);

    const login = async (role: 'customer' | 'technician', email?: string, password?: string) => {
        // For Guest mode, parameters might be optional or we overload.
        // But for actual login, we need credentials.
        // We will assume the UI passes email/password now?
        // Wait, the current login signature in context is `(role: 'customer' | 'technician') => void`.
        // The UI (LoginPage) calls `login(selectedRole)`. It doesn't pass email/password yet!
        // We need to update the Context signature AND the UI to pass credentials.

        // TEMPORARY: Keep mock behavior if no credentials passed, to avoid breaking UI immediately?
        // No, we want real backend.
        // But UI (LoginPage.tsx) has email/password state. We need to pass it.

        console.warn("Update LoginPage to pass credentials!");
    };

    const loginWithCredentials = async (email: string, password: string, role: 'customer' | 'technician') => {
        try {
            const endpoint = role === 'customer' || role === 'technician' ? '/login' : '/login'; // Same endpoint

            // Note: Our backend login endpoint doesn't strictly enforce role check unless we want to.
            // But we can check role after login.

            const res = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Login failed');
            }

            // Success
            localStorage.setItem('token', data.token);
            localStorage.setItem('userType', data.user.role);

            setMember(data.user);
            setUserType(data.user.role);

            return true;
        } catch (err) {
            console.error(err);
            return false;
        }
    };

    // Legacy/Mock function kept for interface compatibility until UI is updated
    const loginMock = (role: 'customer' | 'technician') => {
        console.log(`Mock login triggered as ${role}`);
        setMember({ id: 'mock-user', name: 'Mock User', role: role });
        setUserType(role);
        localStorage.setItem('userType', role);
        localStorage.setItem('token', 'mock-token');
    };


    const loginAsGuest = () => {
        setMember(null);
        setUserType('guest');
        localStorage.removeItem('token');
        localStorage.removeItem('userType');
    };

    const logout = () => {
        setMember(null);
        setUserType(null);
        localStorage.removeItem('token');
        localStorage.removeItem('userType');
    };

    const value = {
        member,
        userType,
        loading,
        login: loginMock, // Mapping mock for now, but exporting new real one
        loginWithCredentials, // New function exposed
        loginAsGuest,
        logout,
        isAuthenticated: !!member,
        isLoading: loading,
        actions: {
            login: loginMock,
            loginWithCredentials,
            loginAsGuest,
            logout
        }
    };

    return (
        <MemberContext.Provider value={value}>
            {children}
        </MemberContext.Provider>
    );
}

// Update the Interface
export interface MemberContextType {
    member: any | null;
    userType: 'customer' | 'technician' | 'guest' | null;
    loading: boolean;
    login: (role: 'customer' | 'technician') => void;
    loginWithCredentials: (email: string, password: string, role: 'customer' | 'technician') => Promise<boolean>;
    loginAsGuest: () => void;
    logout: () => void;
    isAuthenticated: boolean;
    isLoading: boolean;
    actions: {
        login: (role: 'customer' | 'technician') => void;
        loginWithCredentials: (email: string, password: string, role: 'customer' | 'technician') => Promise<boolean>;
        loginAsGuest: () => void;
        logout: () => void;
    }
}

export function useMember() {
    const context = useContext(MemberContext);
    if (context === undefined) {
        throw new Error('useMember must be used within a MemberProvider');
    }
    return context;
}
