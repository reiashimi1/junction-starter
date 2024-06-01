import React, {useState, useEffect} from 'react';
import {GoogleMap, LoadScript, DirectionsRenderer, Marker} from '@react-google-maps/api';
import MapMarker from "@/components/map/MapMarker";

const locations = [
    { id: 1, lat: 41.3192252, lng: 19.9220685 },
    { id: 2, lat: 41.4192252, lng: 20.0220685 },
    { id: 3, lat: 41.5192252, lng: 20.1220685 },
    { id: 4, lat: 41.6192252, lng: 20.2220685 },
];

const sampleOrigin = { lat: 41.3192252, lng: 19.8220685 };

const MapComponent = () => {
    const [directionsResults, setDirectionsResults] = useState([]);
    const [mapLoaded, setMapLoaded] = useState(false);
    const [destinations, setDestinations] = useState([]);
    const [origin, setOrigin] = useState({});

    const apiKey = 'AIzaSyD2yZzE4Nuo0_vYAhCamFdxmv_Pujo-4vU';

    const fetchDirections = (request, index) => {
        if (mapLoaded) {
            const directionsService = new window.google.maps.DirectionsService();
            directionsService.route(request, (result, status) => {
                if (status === 'OK') {
                    setDirectionsResults(prevResults => {
                        const newResults = [...prevResults];
                        newResults[index] = result;
                        return newResults;
                    });
                } else {
                    console.error(`Error fetching directions for request ${index}: ${status}`);
                }
            });
        }
    };

    const fetchCoords = () => {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject(new Error('Geolocation is not supported by your browser'));
            } else {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        resolve({
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                        });
                    },
                    (error) => {
                        reject(error);
                    }
                );
            }
        });
    }

    useEffect(() => {
        fetchCoords().then((res) => setOrigin(res));

        const interval = setInterval(async () => {
            const coordinates = await fetchCoords();
            setOrigin(coordinates);
        }, 5000);

        return () => {
            clearInterval(interval);
        }
    }, []);

    useEffect(() => {
        if (destinations.length && origin.lat && origin.lng) {
            const requests = destinations.map(destination => ({
                origin,
                destination,
                travelMode: 'DRIVING'
            }));
            setDirectionsResults(Array(destinations.length).fill(null));
            requests.forEach((request, index) => {
                fetchDirections(request, index);
            })
        }
    }, [origin, destinations])

    return (
        <>
            <LoadScript googleMapsApiKey={apiKey}>
                <GoogleMap
                    mapContainerStyle={{ height: '600px', width: '100%' }}
                    zoom={10}
                    center={sampleOrigin}
                    onLoad={(map) => {
                        setMapLoaded(true)
                    }}
                >
                    {directionsResults.map((result, index) => (
                        result && (
                            <DirectionsRenderer
                                key={index}
                                directions={result}
                                options={{ suppressMarkers: true, preserveViewport: true }}
                            />
                        )
                    ))}
                    {origin && <Marker position={origin} />}
                    {locations.map(location => (
                        <MapMarker key={location.id} location={location} setDestination={setDestinations} />
                    ))}
                </GoogleMap>
            </LoadScript>
        </>
    );
};

export default MapComponent;
