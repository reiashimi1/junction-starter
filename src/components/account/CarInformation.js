import React from 'react';
import { Card as MuiCard, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';
import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import EvStationIcon from '@mui/icons-material/EvStation';
import BatteryCharging60Icon from '@mui/icons-material/BatteryCharging60';
 import Lottie from '@/core/Lottie';
 import emptyLottie from "@/images/car-lottie.json";
 const CarInfoCard = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  backgroundColor: '#f5f5f5',
  color: '#000',
  borderRadius: 15,
  padding: theme.spacing(2),
  overflow: 'hidden',
}));

const CarAnimationContainer = styled(Box)(({ theme }) => ({
  flex: 3,
  backgroundColor: '#e0e0e0',
  borderRadius: 15,
  marginRight: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin:'10px'
}));

const CarInfoContainer = styled(Box)(({ theme }) => ({
  flex: 2,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
}));

const CarInfoItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(1),
}));

const CarInfoCardComponent = () => {
  return (
    <CarInfoCard>
          <Lottie
          animation={emptyLottie}
          className="flex flex-1 object-contain mr-1"
          text=""
        />
      <CarInfoContainer>
        <CarInfoItem>
          <BatteryChargingFullIcon fontSize="medium" color="success" />
          <Box ml={2}>
           <Typography variant="h8">85%</Typography>
          </Box>
        </CarInfoItem>
        <CarInfoItem>
          {/* HEre we might put the status of the charging as well as if the battery is low we might make it with a red color*/}
          <BatteryCharging60Icon fontSize="medium" color="success" />
          <Box ml={2}>
           <Typography variant="h8">CHARGING</Typography>
          </Box>
        </CarInfoItem>
        <CarInfoItem>
          <DirectionsCarIcon fontSize="medium" color="success" />
          <Box ml={2}>
            <Typography variant="h8">Tesla Model S</Typography>
          </Box>
        </CarInfoItem>
        <CarInfoItem>
          <EvStationIcon fontSize="medium" color="success" />
          <Box ml={2}>
            <Typography variant="h8">Type 2</Typography>
          </Box>
        </CarInfoItem>
        {/* Add more car information here if needed */}
      </CarInfoContainer>
    </CarInfoCard>
  );
};

export default CarInfoCardComponent;
