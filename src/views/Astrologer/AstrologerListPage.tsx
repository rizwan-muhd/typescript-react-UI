import { Box } from "@mui/material";
import React from "react";
import Layout from "../../layouts";
import DataGridDemo from "../../sections/Astrologer/AstrologerList";

function AstrologerListPage() {
  return (
    <Layout>
      <Box
        sx={{
          marginTop: "20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          overflowX: "auto",
          height:500
        }}
      >
        <DataGridDemo />
      </Box>
    </Layout>
  );
}

export default AstrologerListPage;
