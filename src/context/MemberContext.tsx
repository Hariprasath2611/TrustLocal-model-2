import React, { createContext, useContext, useEffect, useState } from 'react';

interface MemberContextType {
    member: any | null;
    loading: boolean;
    login: () => void;
    logout: () => void;
    // Aliases for compatibility
    isAuthenticated: boolean;
    isLoading: boolean;
    actions: {
        login: () => void;
        logout: () => void;
    }
}

const MemberContext = createContext<MemberContextType | undefined>(undefined);

export function MemberProvider({ children }: { children: React.ReactNode }) {
    const [member, setMember] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate checking for a logged-in user
        const checkMember = async () => {
            setLoading(true);
            // TODO: Replace with actual auth logic or local storage check
            setTimeout(() => {
                setLoading(false);
            }, 500);
        };
        checkMember();
    }, []);

    const login = () => {
        console.log("Mock login triggered");
        setMember({ id: 'mock-user', name: 'Mock User' });
    };

    const logout = () => {
        setMember(null);
    };

    const value = {
        member,
        loading,
        login,
        logout,
        isAuthenticated: !!member,
        isLoading: loading,
        actions: {
            login,
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
