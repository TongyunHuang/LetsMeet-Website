import { Avatar, Box, Button, Typography } from "@mui/material";
import React from "react";

export default function ProfileHead() {
  const name = "Hao Ren";
  return (
    <div
      style={{
        width: "100%",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        position: "relative",
      }}
    >
      <Box
        sx={{
          backgroundColor: "#9FDDDD",
          height: {
            xs: "200px",
            sm: "300px",
          },
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "100%",
            position: "absolute",
            bottom: 0,
          }}
        >
          <div
            style={{
              width: "100%",
            }}
          ></div>
          <Box
            sx={{
              width: "100%",
              textAlign: "left",
              fontSize: {
                xs: 38,
                sm: 60,
              },
              fontWeight: 500,
              color: "white",
              textShadow: "0px 0px 6px rgba(0, 0, 0, 0.4)",
            }}
          >
            {name}
          </Box>
        </div>
      </Box>
      <Box
        sx={{
          backgroundColor: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: {
            xs: "70px",
            sm: "100px",
          },
        }}
      >
        <Typography
          sx={{
            marginLeft: {
              xs: "150px",
              sm: "200px",
            },
          }}
        >
          Let's meet!
        </Typography>
        <Button
          variant="contained"
          sx={{
            marginRight: "20px",
          }}
        >
          Add
        </Button>
      </Box>
      <Avatar
        src="avatar-placeholder.png"
        sx={{
          width: 150,
          height: 150,
          position: "absolute",
          bottom: "25px",
          left: "25px",
          display: {
            xs: "none",
            sm: "inline",
          },
        }}
      />
      <Avatar
        src="avatar-placeholder.png"
        sx={{
          width: 100,
          height: 100,
          position: "absolute",
          bottom: "25px",
          left: "25px",
          display: {
            xs: "inline",
            sm: "none",
          },
        }}
      />
    </div>
  );
}
