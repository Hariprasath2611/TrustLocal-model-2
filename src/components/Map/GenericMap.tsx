import React, { useCallback, useState } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { useMap } from '@/context/MapContext';

const containerStyle = {
    width: '100%',
    height: '100%'
};

const defaultCenter = {
    lat: 28.6139, // New Delhi Default
    lng: 77.2090
};

interface GenericMapProps {
    center?: google.maps.LatLngLiteral;
    zoom?: number;
    onClick?: (e: google.maps.MapMouseEvent) => void;
    children?: React.ReactNode;
    userLocation?: google.maps.LatLngLiteral | null;
}

export const GenericMap: React.FC<GenericMapProps> = ({
    center,
    zoom = 15,
    onClick,
    children,
    userLocation
}) => {
    const { isLoaded, loadError } = useMap();
    const [map, setMap] = useState<google.maps.Map | null>(null);

    const onLoad = useCallback(function callback(map: google.maps.Map) {
        setMap(map);
    }, []);

    const onUnmount = useCallback(function callback(map: google.maps.Map) {
        setMap(null);
    }, []);

    if (loadError) {
        return <div>Error loading maps</div>;
    }

    if (!isLoaded) {
        return <div>Loading Maps...</div>;
    }

    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center || userLocation || defaultCenter}
            zoom={zoom}
            onLoad={onLoad}
            onUnmount={onUnmount}
            onClick={onClick}
            options={{
                streetViewControl: false,
                mapTypeControl: false,
                fullscreenControl: false,
            }}
        >
            {/* Current User Marker (Blue Dot usually, simulating with standard marker for now) */}
            {userLocation && (
                <Marker
                    position={userLocation}
                    title="You are here"
                    icon={{
                        path: google.maps.SymbolPath.CIRCLE,
                        scale: 7,
                        fillColor: '#4285F4',
                        fillOpacity: 1,
                        strokeColor: '#ffffff',
                        strokeWeight: 2,
                    }}
                />
            )}
            {children}
        </GoogleMap>
    );
}
