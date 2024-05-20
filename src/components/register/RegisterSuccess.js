import SubmitButton from "@/core/buttons/SubmitButton";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import * as React from "react";
import { useRouter } from "next/navigation";

const RegisterSuccess = () => {
  const router = useRouter();

  const onSuccess = () => {
    router.push("/login");
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col items-center justify-center bg-white p-10 rounded-lg shadow-md rounded-lg">
        <SubmitButton
          text="Log in to explore Cloud Ten VIP products"
          handleClick={onSuccess}
        />
      </div>
      <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
        <Box sx={{ flex: "1 1 auto" }} />
        <div className="text-white transition scale-125 hover:scale-100 hover:bg-slate-300 hover:rounded-xl hover:shadow-lg">
          <Button color="inherit" onClick={onSuccess}>
            Login
          </Button>
        </div>
      </Box>
    </div>
  );
};

export default RegisterSuccess;
