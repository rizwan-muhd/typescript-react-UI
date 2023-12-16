import { Grid, Paper, Box } from "@mui/material";
import React from "react";
import Layout from "../../layouts";
import AstrologerAddForm from "../../sections/Astrologer/AstrologerFrom";

function AstrologerAddPage() {
  return (
    <Layout>
      <Grid
        container
        style={{
          backgroundImage:
            'url("https://img.freepik.com/free-photo/horoscope-astrology-collage_23-2150719043.jpg?w=1060&t=st=1702578193~exp=1702578793~hmac=95ef803c7feef386f9e4f24703dcc6689628e198e7e9cfc5ba2f579bb12d9a13")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "80vh",
        }}
      >
        <Grid
          xs={12}
          sm={12}
          md={4}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            // textAlign:'center',
            padding: "10px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              // textAlign:'center',
              padding: "10px",
            }}
          >
            <Paper
              sx={{
                padding: "10px",
                backgroundColor: "rgba(255, 255, 255, 0.9)",
              }}
            >
              <AstrologerAddForm />
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </Layout>
  );
}

export default AstrologerAddPage;
