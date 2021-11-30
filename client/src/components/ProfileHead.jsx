import { Avatar } from "@mui/material";
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
      <div
        style={{
          backgroundColor: "#9FDDDD",
          height: "300px",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "100%",
            position: "absolute",
            // backgroundColor: "green",
            bottom: 0,
          }}
        >
          <div
            style={{
              width: "100%",
            }}
          ></div>
          <div
            style={{
              width: "100%",
              textAlign: "left",
              fontSize: 60,
              fontWeight: 500,
              color: "white",
              textShadow: "0px 0px 6px rgba(0, 0, 0, 0.4)",
            }}
          >
            Hao Ren
          </div>
        </div>
      </div>
      <div
        style={{
          backgroundColor: "white",
          height: "100px",
        }}
      ></div>
      <Avatar
        src="avatar-placeholder.png"
        sx={{
          width: 150,
          height: 150,
          position: "absolute",
          bottom: "25px",
          left: "25px",
        }}
      />
    </div>
  );
}
