import React, { useState } from "react";
import {
  Card as MuiCard,
  CardContent,
  Typography,
  Box,
  IconButton,
  TextField,
  Grid,
} from "@mui/material";
import { styled } from "@mui/system";
import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import image from "@/images/image.png";
import UserCartView from "@/views/user/UserCartView";

const CreditCard = styled(MuiCard)(({ theme }) => ({
  backgroundColor: "#1c1c1c",
  color: "white",
  borderRadius: 15,
  padding: theme.spacing(2),
  display: "flex",
  flexDirection: "column",
  position: "relative",
  overflow: "hidden",
}));

const Overlay = styled("div")({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  zIndex: 1,
});

const CardNumber = styled(Typography)(({ theme }) => ({
  letterSpacing: 2,
  marginBottom: theme.spacing(2),
  zIndex: 2,
  position: "relative",
}));

const CardHolder = styled(Typography)(({ theme }) => ({
  textTransform: "uppercase",
  fontSize: 12,
  marginBottom: theme.spacing(1),
  zIndex: 2,
  position: "relative",
}));

const ExpiryDate = styled(Typography)(({ theme }) => ({
  fontSize: 12,
  zIndex: 2,
  position: "relative",
}));

const Chip = styled("div")(({ theme }) => ({
  width: 50,
  height: 30,
  backgroundColor: "#d3d3d3",
  borderRadius: 5,
  zIndex: 2,
  position: "relative",
}));

const CardContentContainer = styled(CardContent)({
  position: "relative",
  zIndex: 2,
});

const Image = styled("img")({
  width: "100%",
  height: "auto",
  borderRadius: "10px",
  marginBottom: "10px",
  objectFit: "cover",
  aspectRatio: "3/1",
});

const LargeTypography = styled(Typography)(({ theme }) => ({
  fontSize: "1.25rem", // Larger font size
  fontWeight: "bold",
}));

const LargeIconButton = styled(IconButton)(({ theme }) => ({
  width: "2.5rem", // Larger button size
  height: "2.5rem",
}));

const FormContainer = styled("div")(({ theme }) => ({
  backgroundColor: "white",
  padding: theme.spacing(4),
  borderRadius: 10,
  marginTop: theme.spacing(4),
}));

const Card = ({
  cardNumber = "1234 5678 9012 3456",
  cardHolder = "John Doe",
  expiryDate = "12/23",
}) => {
  const [chargePopUp, setChargePopUp] = useState(false);

  return (
    <>
      <CreditCard>
        <Overlay />
        <CardContentContainer>
          <Image src={image.src} />
          <Box mt={2}>
            <CardNumber variant="h6">{cardNumber}</CardNumber>
            <CardHolder variant="body2">Card Holder</CardHolder>
            <Typography variant="body1">{cardHolder}</Typography>
          </Box>
        </CardContentContainer>
        <CardContentContainer>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <LargeTypography variant="body2">Credits</LargeTypography>
            <Box display="flex" alignItems="center">
              <LargeTypography variant="body2" mr={1}>
                200$
              </LargeTypography>
              <LargeIconButton color="primary" aria-label="recharge">
                <AddCircleOutline
                  fontSize="large"
                  onClick={() => setChargePopUp(true)}
                />
              </LargeIconButton>
            </Box>
          </Box>
        </CardContentContainer>
      </CreditCard>

      <FormContainer>
        <Typography variant="h6" gutterBottom>
          User Points and Referral Code
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Points"
              variant="outlined"
              value="1500"
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Referral Code"
              variant="outlined"
              value="REF12345"
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
        </Grid>
        <UserCartView open={chargePopUp} setOpen={setChargePopUp} />
      </FormContainer>
    </>
  );
};

export default Card;
