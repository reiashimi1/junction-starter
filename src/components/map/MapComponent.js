import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  DirectionsRenderer,
  Marker,
  DirectionsService,
} from "@react-google-maps/api";
import MapMarker from "@/components/map/MapMarker";
import MapFilter from "@/views/user/MapFilter";
import SearchInput from "@/core/inputs/SearchInput";
import Button from "@mui/material/Button";

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
  const [qs, setQs] = useState("");

  const fetchDirections = (request, index) => {
    if (mapLoaded) {
      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(request, (result, status) => {
        if (status === "OK") {
          setDirectionsResults((prevResults) => {
            const newResults = [...prevResults];
            newResults[index] = result;
            return newResults;
          });
        } else {
          console.error(
            `Error fetching directions for request ${index}: ${status}`,
          );
        }
      });
    }
  };

  const fetchCoords = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation is not supported by your browser"));
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
          },
        );
      }
    });
  };

  useEffect(() => {
    fetchCoords().then((res) => setOrigin(res));

    const interval = setInterval(async () => {
      const coordinates = await fetchCoords();
      setOrigin(coordinates);
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (destinations.length && origin.lat && origin.lng) {
      const requests = destinations.map((destination) => ({
        origin,
        destination,
        travelMode: "DRIVING",
      }));
      setDirectionsResults(Array(destinations.length).fill(null));
      requests.forEach((request, index) => {
        fetchDirections(request, index);
      });
    }
  }, [origin, destinations]);

  const closestCharger = () => {
    let closestLocation = null;
    let minDistance = Number.POSITIVE_INFINITY;

    for (let i = 0; i < locations.length; i++) {
      const location = locations[i];
      const distance = Math.sqrt(
        (location.lat - origin.lat) ** 2 + (location.lng - origin.lng) ** 2,
      );

      if (distance < minDistance) {
        minDistance = distance;
        closestLocation = location;
      }
    }

    setDestinations([closestLocation]);
  };

  return (
    <>
      <div>
        <div className="flex md:flex-row flex-col items-center justify-around p-4 mb-4 rounded-xl bg-slate-200 inset-0 z-10">
          <MapFilter />
          <div className="flex relative md:w-1/3 md:mt-0 mt-2">
            <SearchInput qs={qs} onSearch={setQs} />
          </div>
        </div>
        <div className="relative z-0">
          <div className="relative">
            <div className="absolute top-2 left-2 z-50 mt-2">
              <Button variant="contained" onClick={closestCharger}>
                Closest
              </Button>
            </div>
            <div className="absolute top-0 right-0 z-50 mt-2">
              {directionsResults.map((result) =>
                result?.routes[0] ? (
                  <div
                    key={result?.routes[0]?.legs[0]?.distance?.text}
                    className="bg-white my-1 mx-2 text-black max-w-52 py-2 px-4"
                  >
                    <div>{result?.routes[0]?.legs[0]?.end_address}</div>
                    <div>
                      {result?.routes[0]?.legs[0]?.distance?.text}
                      <span className="text-xs italic ml-2">
                        ({result?.routes[0]?.legs[0]?.duration?.text})
                      </span>
                    </div>
                    <Button
                      color="error"
                      onClick={() =>
                        setDirectionsResults(
                          Array(destinations.length).fill(null),
                        )
                      }
                    >
                      Clear
                    </Button>
                  </div>
                ) : (
                  <></>
                ),
              )}
            </div>
            <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_MAPS_KEY}>
              <GoogleMap
                mapContainerStyle={{ height: "600px", width: "100%" }}
                zoom={10}
                options={{ fullscreenControl: false, mapTypeControl: false }}
                center={sampleOrigin}
                onLoad={(map) => {
                  setMapLoaded(true);
                }}
              >
                {directionsResults.map(
                  (result, index) =>
                    result && (
                      <DirectionsRenderer
                        key={index}
                        directions={result}
                        options={{
                          suppressMarkers: true,
                          preserveViewport: true,
                        }}
                      />
                    ),
                )}
                {origin && (
                  <Marker
                    icon={{
                      url: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBzdHJva2U9IiM0MTY5RTEiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIj48cGF0aCBmaWxsPSIjNDE2OUUxIiBkPSJNMzIgMUMxOS43NDUgMSAxMCAxMC43NDUgMTAgMjNjMCA4LjgzNyA1LjczIDE2LjI4MyAxMy42NjQgMjAuMDg5TDMyIDYzbDguMzM2LTE5LjkxMUM0OC4yNyAzOS4yODMgNTQgMzEuODM3IDU0IDIzIDU0IDEwLjc0NSA0NC4yNTUgMSAzMiAxeiIvPjxjaXJjbGUgY3g9IjMyIiBjeT0iMjMiIHI9IjEwIiBmaWxsPSIjMTgzOTlBIi8+PC9nPjwvc3ZnPgo=",
                      scaledSize: { width: 40, height: 40 },
                    }}
                    position={origin}
                  />
                )}
                {locations.map((location) => (
                  <MapMarker
                    key={location.id}
                    location={location}
                    setDestination={setDestinations}
                  />
                ))}
              </GoogleMap>
            </LoadScript>
          </div>
        </div>
      </div>
    </>
  );
};

export default MapComponent;
