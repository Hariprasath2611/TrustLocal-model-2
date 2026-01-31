import React, { useState, useEffect } from 'react';
import { GenericMap } from './GenericMap';
import { Marker, InfoWindow } from '@react-google-maps/api';
import { ServiceRequest, SERVICE_CATEGORIES } from '@/types/shared';

export const CustomerMap = () => {
    const [myLocation, setMyLocation] = useState<google.maps.LatLngLiteral | null>(null);
    const [selectedLocation, setSelectedLocation] = useState<google.maps.LatLngLiteral | null>(null);
    const [category, setCategory] = useState(SERVICE_CATEGORIES[0]);
    const [loading, setLoading] = useState(false);
    const [requestStatus, setRequestStatus] = useState<string | null>(null);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };
                    setMyLocation(pos);
                    // Default selection to current location initially
                    if (!selectedLocation) setSelectedLocation(pos);
                },
                () => {
                    console.error("Geolocation failed");
                    // Fallback to Delhi
                    const delhi = { lat: 28.6139, lng: 77.2090 };
                    setMyLocation(delhi);
                    setSelectedLocation(delhi);
                }
            );
        }
    }, []);

    const handleMapClick = (e: google.maps.MapMouseEvent) => {
        if (e.latLng) {
            setSelectedLocation({
                lat: e.latLng.lat(),
                lng: e.latLng.lng()
            });
        }
    };

    const handleRequestService = async () => {
        if (!selectedLocation) return;
        setLoading(true);
        try {
            // In a real app, get Auth Token. For hackathon, we might bypass or use a test token if backend requires it.
            // Backend middleware expects a token, let's assume we have a way to get one or the backend is lenient for the demo if headers missing.
            // Actually, I put a check in backend. I should try to send something or assume user is logged in.
            // For MVP Demo, I'll log a warning if auth is missing but try anyway. 

            // FIXME: Use real auth token from context
            const token = "TEST_TOKEN";

            const res = await fetch('http://localhost:5000/api/requests', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    customerId: "test-customer-id", // Replace with real ID
                    serviceCategory: category,
                    latitude: selectedLocation.lat,
                    longitude: selectedLocation.lng,
                } as Partial<ServiceRequest>)
            });

            if (res.ok) {
                setRequestStatus("Request Sent! Searching for technicians...");
            } else {
                setRequestStatus("Failed to send request.");
            }
        } catch (e) {
            console.error(e);
            setRequestStatus("Error sending request.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-[600px] w-full relative">
            <div className="absolute top-4 left-4 z-10 bg-white p-4 rounded shadow-lg w-80">
                <h3 className="font-bold text-lg mb-2">Request Service</h3>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Category</label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full border p-2 rounded"
                    >
                        {SERVICE_CATEGORIES.map(c => (
                            <option key={c} value={c}>{c}</option>
                        ))}
                    </select>
                </div>

                {requestStatus ? (
                    <div className="p-3 bg-green-100 text-green-800 rounded mb-2">
                        {requestStatus}
                    </div>
                ) : (
                    <button
                        onClick={handleRequestService}
                        disabled={loading}
                        className="w-full bg-black text-white py-2 rounded font-bold hover:bg-gray-800 disabled:opacity-50"
                    >
                        {loading ? 'Requesting...' : 'Request Now'}
                    </button>
                )}
                <p className="text-xs text-gray-500 mt-2">
                    Click map to adjust location.
                </p>
            </div>

            <GenericMap
                userLocation={myLocation}
                onClick={handleMapClick}
            >
                {selectedLocation && (
                    <Marker
                        position={selectedLocation}
                        animation={google.maps.Animation.DROP}
                    />
                )}
            </GenericMap>
        </div>
    );
};
