import { Avatar, Box } from "@mui/material";
import React from "react";

export default function ProfileHead() {
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
            Hao Ren
          </Box>
        </div>
      </Box>
      <Box
        sx={{
          backgroundColor: "white",
          height: {
            xs: "70px",
            sm: "100px",
          },
        }}
      />
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
