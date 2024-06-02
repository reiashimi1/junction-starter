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
                icon={{
                    url: location.status === 'available'
                        ? 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBzdHJva2U9IiMxNmEzNGEiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIj48cGF0aCBmaWxsPSIjMTZhMzRhIiBkPSJNMzIgMUMxOS43NDUgMSAxMCAxMC43NDUgMTAgMjNjMCA4LjgzNyA1LjczIDE2LjI4MyAxMy42NjQgMjAuMDg5TDMyIDYzbDguMzM2LTE5LjkxMUM0OC4yNyAzOS4yODMgNTQgMzEuODM3IDU0IDIzIDU0IDEwLjc0NSA0NC4yNTUgMSAzMiAxeiIvPjxjaXJjbGUgY3g9IjMyIiBjeT0iMjMiIHI9IjEwIiBmaWxsPSIjMTY2NTM0Ii8+PC9nPjwvc3ZnPgo='
                        : 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBzdHJva2U9IiNlZjQ0NDQiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIj48cGF0aCBmaWxsPSIjZWY0NDQ0IiBkPSJNMzIgMUMxOS43NDUgMSAxMCAxMC43NDUgMTAgMjNjMCA4LjgzNyA1LjczIDE2LjI4MyAxMy42NjQgMjAuMDg5TDMyIDYzbDguMzM2LTE5LjkxMUM0OC4yNyAzOS4yODMgNTQgMzEuODM3IDU0IDIzIDU0IDEwLjc0NSA0NC4yNTUgMSAzMiAxeiIvPjxjaXJjbGUgY3g9IjMyIiBjeT0iMjMiIHI9IjEwIiBmaWxsPSIjOTkxYjFiIi8+PC9nPjwvc3ZnPgo=',
                    scaledSize: { width: 40, height: 40 }
                }}
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
