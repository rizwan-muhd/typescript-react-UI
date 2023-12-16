import { Box, Typography } from "@mui/material";
import Link from "@mui/material/Link";
import React from "react";

function Copyright() {
  return (
    <Typography variant="body2" align="center">
      {"Copyright © "}
      <Link href="https://mui.com/">Your Website</Link>
      {new Date().getFullYear()}
    </Typography>
  );
}
function index() {
  return (
    <Box
    sx={{
      position: "fixed",
      bottom: 0,
      width: "100%",
      bgcolor: "black",
      color: "white",
      p: 3, // Adjust padding as needed
      marginTop: "auto", // This is the key for sticking to the bottom
    }}
    component="footer"
    >
      <Typography variant="h6" align="center" gutterBottom>
        Footer
      </Typography>
      <Typography
        variant="subtitle1"
        align="center"
        // color="text.seconda"
        component="p"
      >
        Something here to give the footer a purpose!
      </Typography>
      <Copyright />
    </Box>
  );
}

export default index;
