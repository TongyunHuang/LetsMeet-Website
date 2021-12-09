import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";

export default function PostCard(props) {
  const { name, likeCount, date, content } = props.data;

  return (
    <Card sx={{ maxWidth: 345, textAlign: "left", borderRadius: "0px" }}>
      <CardHeader
        avatar={
          <Avatar
            sx={{
              bgcolor: "#" + Math.floor(Math.random() * 16777215).toString(16),
            }}
            aria-label="recipe"
          >
            {name.substring(0, 1)}
          </Avatar>
        }
        action={
          <IconButton aria-label="add to favorites" sx={{ color: "#E14E68" }}>
            <FavoriteIcon />
            <span style={{ fontSize: "14px" }}>{likeCount}</span>
          </IconButton>
        }
        title={name}
        subheader={date}
      />
      <CardContent>
        <Typography variant="body2">{content}</Typography>
      </CardContent>
    </Card>
  );
}
