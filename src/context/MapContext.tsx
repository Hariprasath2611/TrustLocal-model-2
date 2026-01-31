import React, { createContext, useContext, ReactNode } from 'react';
import { useJsApiLoader } from '@react-google-maps/api';

interface MapContextType {
    isLoaded: boolean;
    loadError: Error | undefined;
}

const MapContext = createContext<MapContextType | undefined>(undefined);

export function MapProvider({ children }: { children: ReactNode }) {
    const { isLoaded, loadError } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "", // Ensure this is set in .env
    });

    return (
        <MapContext.Provider value={{ isLoaded, loadError }}>
            {children}
        </MapContext.Provider>
    );
}

export function useMap() {
    const context = useContext(MapContext);
    if (context === undefined) {
        throw new Error('useMap must be used within a MapProvider');
    }
    return context;
}
