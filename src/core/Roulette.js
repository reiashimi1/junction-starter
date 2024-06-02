import React, { useEffect, useState } from "react";
import { Wheel } from "react-custom-roulette";
import { Alert } from "@mui/material";
import AddButton from "@/core/buttons/AddButton";
import { isArrayEmpty } from "@/helpers/functions";
import CustomConfetti from "@/core/CustomConfetti";
import Box from "@mui/material/Box";

const tryAgain = { option: "Try Again" };

const colors = [
  "#16697a",
  "#c72d6d",
  "#82c0cc",
  "#e74638",
  "#ffa62b",
  "#a5668b",
  "#dac648",
  "#729b79",
];

const Roulette = ({ airlineId }) => {
  const [roulette, setRoulette] = useState();
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [loadConfetti, setLoadConfetti] = useState(false);
  const [winningOption, setWinningOption] = useState();
  const [canSpin, setCanSpin] = useState(false);
  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [renderRoulette, setRenderRoulette] = useState(false);
  const [tryAgainMessage, setTryAgainMessage] = useState(false);

  const backgroundColors = ["black", "red", "green"];

  useEffect(() => {
    if (airlineId) {
      // setIsLoading(true);
      // API.get(`/users/roulette/${airlineId}`)
      //   .then((res) => {
      //     const { roulette } = res.data;
      //     setCanSpin(roulette.canBeClicked);
      //     setRoulette(roulette);
      //     if (roulette.offers?.length > 0) {
      setRenderRoulette(true);
      //     } else {
      // setRenderRoulette(false);
      //       return;
      //     }
      //
      const roulette = {
        offers: [
          { option: 1, title: "20 points" },
          { option: 2, title: "Try again :(" },
          { option: 3, title: "10 points" },
          { option: 4, title: "30 points" },
          { option: 5, title: "40 points" },
          { option: 6, title: "20% off" },
          { option: 7, title: "10% off" },
          { option: 8, title: "1 point :O" },
        ],
      };
      roulette?.offers.map((offer) => (offer.option = offer.title));

      const optionsWithFallback = Array.from(
        { length: 8 },
        (_, index) => roulette.offers[index] || { option: "Try Again" },
      );
      optionsWithFallback.map(
        (offer, index) =>
          (offer.style = {
            backgroundColor: colors[index],
            textColor: "white",
          }),
      );
      setOptions(optionsWithFallback);
      // })
      //   .catch((error) => {
      setRenderRoulette(false);
      //     console.error(error);
      //   })
      //   .finally(() => setIsLoading(false));
    }
  }, [airlineId]);

  const handleSpinClick = () => {
    setTryAgainMessage(false);
    // API.get(`/users/roulette/${roulette.id}/spin`)
    //   .then(() => {
    setLoadConfetti(false);
    if (!mustSpin) {
      const newPrizeNumber = Math.floor(Math.random() * options?.length);
      setPrizeNumber(newPrizeNumber);
      const winner = options[newPrizeNumber];
      console.log(winner);
      setMustSpin(true);
      if (winner.option !== "Try Again" && !isLoading) {
        //         API.get(`/users/offers/${winner.id}/redeem`)
        //           .then(() => {
        setWinningOption(winner);
      }
    }
    //           })
    //           .catch((err) => {
    //             console.log(err);
    //             setTryAgainMessage(true);
    //           });
    //       } else {
    //         setTryAgainMessage(true);
    //       }
    //     }
    //   })
    //   .catch((err) => console.log(err));
  };

  return (
    <Box>
      <CustomConfetti
        render={loadConfetti && renderRoulette}
        load={loadConfetti}
      />
      {!isLoading && !isArrayEmpty(options) && (
        <AddButton
          text="Spin"
          handleClick={handleSpinClick}
          variant="contained"
          disabled={!canSpin}
        />
      )}
      {!isLoading && !isArrayEmpty(options) && (
        <Wheel
          outerBorderColor="gray"
          outerBorderWidth="2"
          innerBorderWidth="2"
          innerBorderColor="gray"
          radiusLineWidth="2"
          radiusLineColor="white"
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={options}
          onStopSpinning={() => {
            setMustSpin(false);
            setLoadConfetti(true);
            setTimeout(() => {
              setLoadConfetti(false);
            }, 4000);
          }}
        />
      )}
      {/*{winningOption && (
        <Alert severity="success">You won {winningOption?.eventName}</Alert>
      )}*/}
      {/*{tryAgainMessage && !mustSpin && (
        <Alert severity="info">Try again next time</Alert>
      )}*/}
    </Box>
  );
};

export default Roulette;
