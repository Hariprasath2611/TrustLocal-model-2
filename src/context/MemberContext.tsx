import React, { createContext, useContext, useEffect, useState } from 'react';

interface MemberContextType {
    member: any | null;
    userType: 'customer' | 'technician' | 'guest' | null;
    loading: boolean;
    login: (role: 'customer' | 'technician') => void; // Updated signature
    loginAsGuest: () => void; // New method
    logout: () => void;
    // Aliases for compatibility
    isAuthenticated: boolean;
    isLoading: boolean;
    actions: {
        login: (role: 'customer' | 'technician') => void;
        loginAsGuest: () => void;
        logout: () => void;
    }
}

const MemberContext = createContext<MemberContextType | undefined>(undefined);

export function MemberProvider({ children }: { children: React.ReactNode }) {
    const [member, setMember] = useState<any | null>(null);
    const [userType, setUserType] = useState<'customer' | 'technician' | 'guest' | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate checking for a logged-in user
        const checkMember = async () => {
            setLoading(true);
            // TODO: Replace with actual auth logic or local storage check
            setTimeout(() => {
                // For now, start as null (not logged in)
                setLoading(false);
            }, 500);
        };
        checkMember();
    }, []);

    const login = (role: 'customer' | 'technician') => {
        console.log(`Mock login triggered as ${role}`);
        setMember({ id: 'mock-user', name: 'Mock User', role: role });
        setUserType(role);
    };

    const loginAsGuest = () => {
        console.log("Guest mode triggered");
        setMember(null);
        setUserType('guest');
    };

    const logout = () => {
        setMember(null);
        setUserType(null);
    };

    const value = {
        member,
        userType,
        loading,
        login,
        loginAsGuest,
        logout,
        isAuthenticated: !!member, // True only if fully logged in (not guest)
        isLoading: loading,
        actions: {
            login,
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

export function useMember() {
    const context = useContext(MemberContext);
    if (context === undefined) {
        throw new Error('useMember must be used within a MemberProvider');
    }
    return context;
}
