import { Button } from "@mui/material";
import React from "react";

const ButtonPage = ({ name, onClick }) => {
  return (
    <div>
      <Button
        fullWidth
        size="large"
        variant="contained"
        sx={{ mt: 3, mb: 2, backgroundColor: "#163181" }}
        onClick={onClick}
      >
        Login
      </Button>
    </div>
  );
};

export default ButtonPage;
