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

/**
 * Largely copy from the PostCard component
 * @param {Dict} props 
 * @returns 
 */
export default function PostCard(props) {
  const { name, date, content,status, eventName } = props.data;

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
              bgcolor: "#" + Math.floor(Math.random() * 16777215).toString(16),
            }}
            aria-label="recipe"
          >
            {name.substring(0, 1)}
          </Avatar>
        }
        
        title={eventName}
        //subheader={eventName}
        action={date.substring(0,10)}
        subheader={status}
      />
      <CardContent>
        <Typography variant="body2">{content}</Typography>
      </CardContent>
    </Card>
  );
}
