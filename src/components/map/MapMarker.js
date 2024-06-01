import {Marker} from "@react-google-maps/api";
import React, {useState} from "react";
import StationPopUp from "@/components/map/StationPopUp";
import Button from "@mui/material/Button";

const sample = [
    {
        id: '1',
        isAvailable: true,
        bookedByUser: false,
        booked: false,
    },
    {
        id: '2',
        isAvailable: false,
        bookedByUser: true,
        booked: false,
    },
    {
        id: '3',
        isAvailable: false,
        bookedByUser: false,
        booked: false,
    },
    {
        id: '4',
        isAvailable: true,
        bookedByUser: false,
        booked: true
    },
];

const MapMarker = ({location, setDestination}) => {
    const [showPopUp, setShowPopUp] = useState(false);

    const seePorts = () => {
        setShowPopUp(true);
        //call to get ports
    }
    const book = (id) => {
        //logic
    }

    const cancelBooking = (id) => {
        //logic
    }

    return (
        <>
            <Marker
                key={location.id}
                position={{lat: location.lat, lng: location.lng}}
                onClick={seePorts}
            />
            <StationPopUp
                open={showPopUp}
                setOpen={setShowPopUp}
                stationId={location.id}
                getDirection={setDestination}
            />
        </>
    )
}

export default MapMarker
