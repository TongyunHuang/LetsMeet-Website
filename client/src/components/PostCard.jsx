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
import Axios from "axios";
import { useState } from "react"

export default function PostCard(props) {
  const { userId, likeCount, name, date, content, _id, color } = props.data;
  const [likes, setlikes] = useState(likeCount);
  const [disabled, setDisabled] = useState(false);

  const handleLike = () => {
    if (!disabled) {
      // console.log(likes);
      setlikes(likes + 1);
      setDisabled(true);
      // console.log(likes);
      Axios({
        method: "PUT",
        data: {
          name: name,
          likeCount: likeCount + 1,
          userId: userId,
          content: content,
        },
        withCredentials: true,
        url: "http://localhost:4000/api/post/" + _id,
      }).then((res) => {
        console.log(`Post ${res.data.data.name} modified!`);
        console.log(res.data);
      });
    } else {
      setlikes(likes - 1);
      setDisabled(false);
      // console.log(likes);
      Axios({
        method: "PUT",
        data: {
          name: name,
          likeCount: likeCount,
          userId: userId,
          content: content,
        },
        withCredentials: true,
        url: "http://localhost:4000/api/post/" + _id,
      }).then((res) => {
        console.log(`Post ${res.data.data.name} modified!`);
        console.log(res.data);
      });
    }
  };


  return (
    <Card
      sx={{
        textAlign: "left",
        borderRadius: "0px",
        width: "50vw",
        margin: "50px",
        marginBottom: "25px",
        marginLeft: "100px",
      }}
    >
      <CardHeader
        avatar={
          <Avatar
            sx={{
              bgcolor: color,
            }}
            aria-label="recipe"
          >
            {name == null ? userId[0] : name[0]}
          </Avatar>
        }
        action={
          <IconButton aria-label="add to favorites" sx={{ color: "#E14E68" }} onClick={handleLike}>
            <FavoriteIcon />
            <span style={{ fontSize: "14px" }}>{likes}</span>
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
