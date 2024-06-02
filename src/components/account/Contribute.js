import React from 'react';
import { Box, Button, Typography, Grid } from '@mui/material';
import { styled } from '@mui/system';
import RegisterIcon from '@mui/icons-material/ElectricCar'; // Use appropriate icons or images
import AlertIcon from '@mui/icons-material/Campaign';
import CreateIcon from '@mui/icons-material/EvStation';
import Lottie from '@/core/Lottie';
import image from '@/images/contribute.json'
const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(4),
  backgroundColor: '#f1f5f9',
  minHeight: '100vh',
}));

const Header = styled(Typography)(({ theme }) => ({
  fontSize: '2rem',
  fontWeight: 'bold',
  marginBottom: theme.spacing(2),
}));

const ImageContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  marginBottom: theme.spacing(4),
}));

const ButtonsContainer = styled(Grid)(({ theme }) => ({
  width: '100%',
  maxWidth: '500px',

}));

const StyledButton = styled(Button)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  flex:'1',
  height:'100%',
  border:'0.5px solid gray',
  alignItems: 'center',
  padding: theme.spacing(2),
  borderRadius: theme.  spacing(2),
  backgroundColor: '#fff',
  boxShadow: '2',
  textTransform: 'none',
  '&:hover': {
    // backgroundColor: theme.palette.grey[200],
  },
  width: '100%',
}));

const Contribute = () => {
  return (
    <Container>
      <Header>Contribute</Header>
      <ImageContainer>
          <Lottie
          animation={image}
          className="flex flex-1 object-contain mr-1"
          text=""
        />
      </ImageContainer>
    
      <ButtonsContainer container spacing={2}>
        <Grid item xs={12} sm={6}>
          <StyledButton>
            <RegisterIcon fontSize="large" color="primary" />
            <Typography variant="body1">Register a charging session</Typography>
          </StyledButton>
        </Grid>
        <Grid item xs={12} sm={6}>
          <StyledButton>
            <AlertIcon fontSize="large" color="primary" />
            <Typography variant="body1">Alert the community</Typography>
          </StyledButton>
        </Grid>
        <Grid item xs={12}>
          <StyledButton>
            <CreateIcon fontSize="large" color="primary" />
            <Typography variant="body1">Create a charging station</Typography>
          </StyledButton>
        </Grid>
      </ButtonsContainer>
    </Container>
  );
};

export default Contribute;
