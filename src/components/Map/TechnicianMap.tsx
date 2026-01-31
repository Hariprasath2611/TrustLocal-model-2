import React, { useState, useEffect } from 'react';
import { GenericMap } from './GenericMap';
import { Marker, InfoWindow } from '@react-google-maps/api';
import { ServiceRequest } from '@/types/shared';

export const TechnicianMap = () => {
    const [myLocation, setMyLocation] = useState<google.maps.LatLngLiteral | null>(null);
    const [requests, setRequests] = useState<ServiceRequest[]>([]);
    const [selectedRequest, setSelectedRequest] = useState<ServiceRequest | null>(null);
    const [loading, setLoading] = useState(false);

    // Tech Setup
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.watchPosition((position) => {
                setMyLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
                // In real app, push this update to backend
            });
        }
    }, []);

    // Fetch nearby requests periodically
    useEffect(() => {
        if (!myLocation) return;

        const fetchRequests = async () => {
            try {
                // Mock token
                const token = "TEST_TOKEN";
                const res = await fetch(`http://localhost:5000/api/requests/nearby?lat=${myLocation.lat}&lng=${myLocation.lng}&radius=20`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (res.ok) {
                    const data = await res.json();
                    setRequests(data);
                }
            } catch (e) {
                console.error("Failed to fetch requests", e);
            }
        };

        fetchRequests();
        const interval = setInterval(fetchRequests, 10000); // Poll every 10s
        return () => clearInterval(interval);
    }, [myLocation]);

    const handleAccept = async (req: ServiceRequest) => {
        setLoading(true);
        try {
            const token = "TEST_TOKEN";
            const res = await fetch(`http://localhost:5000/api/requests/${req.id}/accept`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    technicianId: "test-tech-id" // Replace with real ID
                })
            });

            if (res.ok) {
                alert("Lead Accepted!");
                setSelectedRequest(null);
                // Refresh list will happen on next poll or manually update state
                setRequests(prev => prev.filter(r => r.id !== req.id));
            } else {
                alert("Failed to accept (might be taken).");
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="w-full h-[600px] relative">
            <div className="absolute top-4 left-4 z-10 bg-white p-2 rounded shadow">
                <h3 className="font-bold">Technician View</h3>
                <div className="flex items-center gap-2 text-sm text-green-600">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    Online
                </div>
            </div>

            <GenericMap userLocation={myLocation}>
                {/* Render Requests */}
                {requests.map(req => (
                    <Marker
                        key={req.id}
                        position={{ lat: req.latitude, lng: req.longitude }}
                        icon={{
                            path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
                            scale: 5,
                            fillColor: 'red',
                            fillOpacity: 1,
                            strokeWeight: 1,
                            strokeColor: 'white'
                        }}
                        onClick={() => setSelectedRequest(req)}
                    />
                ))}

                {/* Info Window for Selected Request */}
                {selectedRequest && (
                    <InfoWindow
                        position={{ lat: selectedRequest.latitude, lng: selectedRequest.longitude }}
                        onCloseClick={() => setSelectedRequest(null)}
                    >
                        <div className="p-2 min-w-[200px]">
                            <h4 className="font-bold">{selectedRequest.serviceCategory}</h4>
                            <p className="text-sm text-gray-600 mb-2">Looking for service...</p>
                            <button
                                onClick={() => handleAccept(selectedRequest)}
                                disabled={loading}
                                className="w-full bg-blue-600 text-white py-1 px-3 rounded text-sm hover:bg-blue-700"
                            >
                                {loading ? 'Accepting...' : 'Accept Lead'}
                            </button>
                        </div>
                    </InfoWindow>
                )}
            </GenericMap>
        </div>
    );
};
