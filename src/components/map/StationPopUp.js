import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import {
    FlashOffOutlined,
    FlashOnOutlined,
    LocalFireDepartmentOutlined,
    LocationSearchingOutlined
} from "@mui/icons-material";
import {useEffect, useState} from "react";
import {Collapse, FormControlLabel, Radio, RadioGroup} from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const StationPopUp = ({
  open,
  setOpen,
  maxWidth = "sm",
  stationId,
  getDirection = () => {}
}) => {
    const [station, setStation] = useState({});
    const [showBookingData, setShowBookingData] = useState(false);
    const [chargerTypeIndex, setChargerTypeIndex] = useState(0);
    const handleClose = () => {
        setShowBookingData(false);
        setChargerTypeIndex(0);
        setOpen(false);
        setStation({});
    };

    const getStationData = () => {
        setStation({
            name: 'Test',
            totalViews: '40',
            liveViews: '5',
            status: 'available',
            hasBooking: false,
            isHot: true,
            image: 'data:image/jpeg;base64,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',
            chargers: [
                {type: 'fast', available: '3', price: 150, rate: 200, fullChargeTime: 0.417},
                {type: 'normal', available: '1', price: 145, rate: 195, fullChargeTime: 4},
            ],
            address: 'Rr. Sami Frasheri, 5 40',
            bookingFee: 400,
            lat: 41.3192252,
            lng: 19.9220685
        })
    }

    useEffect(() => {
        if (open) {
            getStationData()
        }
    }, [open]);

    const preBook = () => {
        setShowBookingData(true);
        setChargerTypeIndex(0);
    }

    const book = () => {
        //call.then()
        directToStation();
    }

    const cancelPreBooking = () => {
        setShowBookingData(false);
        setChargerTypeIndex(0);
    }

    const directToStation = () => {
        handleClose();
        const { lat, lng } = station;
        getDirection([{lat, lng}]);
    }

    const fullChargePrice = () => (station?.chargers?.length ? station?.chargers[chargerTypeIndex]?.price
        * station?.chargers[chargerTypeIndex]?.fullChargeTime * station?.chargers[chargerTypeIndex]?.rate : 0)

    return (
        <>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                fullWidth
                maxWidth={maxWidth}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>
                    <div className="text-center">Stacioni {station.name}</div>
                    <div className="flex flex-row justify-between items-center">
                        <div className="text-sm text-green-600 flex flex-row items-center">
                            <div className="h-2 w-2 bg-green-500 rounded-full mr-1"/>
                            {station.liveViews} Live
                        </div>
                        <div
                            className={`text-base flex flex-row items-center ${station.isHot ? 'text-yellow-500' : ''}`}>
                            {station.isHot && <LocalFireDepartmentOutlined fontSize="inherit"/>}
                            <span className="text-sm ml-1">{station.totalViews} Views</span>
                        </div>
                    </div>
                </DialogTitle>
                <DialogContent>
                    <div className="mx-auto h-32 w-32 rounded-full overflow-hidden">
                        <img
                            src={station.image}
                            className="h-32 w-32 object-cover"
                        />
                    </div>
                    <div className="flex flex-row justify-between my-4">
                        <div>
                            <div className={`flex flex-row items-center
                            ${station.status === 'out_of_order' ? 'text-red-500' 
                                : station.hasBooking ? 'text-blue-400'
                                    : station.status === 'fully_booked'
                                        ? 'text-yellow-600'
                                        : 'text-green-500'}
                            `}>
                                {station.status === 'out_of_order' ? <FlashOffOutlined fontSize="inherit"/>
                                    : <FlashOnOutlined fontSize="inherit"/>}
                                <div className="ml-1">{station.status !== 'available' || station.hasBooking ? 'Not ' : ''}Available</div>
                            </div>
                            {station.status !== 'out_of_order' && station.hasBooking
                                ? (<div className="text-sm italic">Already reserved</div>)
                                : (station.chargers?.map(({type, available}) => (
                                <div className="text-sm" key={type}>{available} {type}</div>
                            )))}
                            <div></div>
                        </div>
                        <div>
                            Prices:
                            {station.chargers?.map(({price, type}) => (
                                <div className="text-sm" key={type}>
                                    {price} ALL/kW <span className="text-sm">({type})</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-row items-center my-2">
                        Address: <Button onClick={directToStation} className="flex flex-row items-baseline ml-1">
                        {station.address} <LocationSearchingOutlined className="ml-2" fontSize="inherit" />
                    </Button>
                    </div>
                    <Collapse in={showBookingData}>
                        <hr />
                        <div className="mt-2">Pick charger type:</div>
                        <RadioGroup
                            row
                            className="flex justify-around"
                            value={chargerTypeIndex}
                            onChange={(e) => setChargerTypeIndex(e.target.value)}
                        >
                            {station.chargers?.map(({type}, index) => (
                                <FormControlLabel key={type} value={index} control={<Radio />} label={type} />
                            ))}
                        </RadioGroup>
                        <div className="text-sm my-1">
                            <div>Full Price Charge: <span className="text-base font-semibold">{fullChargePrice()} ALL</span></div>
                            <div>Booking Fee: <span className="text-base font-semibold">{station.bookingFee} ALL</span></div>
                        </div>
                    </Collapse>
                    <div className="flex flex-row justify-end my-2">
                        {showBookingData ? (
                            <>
                                <Button onClick={cancelPreBooking} color="error">
                                    Cancel
                                </Button>
                                <Button onClick={book} variant="contained" color="success">
                                    Confirm
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button onClick={handleClose} color="error">
                                    Close
                                </Button>
                                <Button onClick={preBook} variant="contained">
                                    Book
                                </Button>
                            </>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default StationPopUp;
