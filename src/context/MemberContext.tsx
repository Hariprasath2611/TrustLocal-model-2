import React, { createContext, useContext, useEffect, useState } from 'react';

interface MemberContextType {
    member: any | null;
    loading: boolean;
    login: () => void;
    logout: () => void;
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
        // Mock login
        console.log("Mock login triggered");
    };

    const logout = () => {
        setMember(null);
    };

    return (
        <MemberContext.Provider value={{ member, loading, login, logout }}>
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
