import * as React from "react";

import cx from 'clsx';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import Divider from '@mui/material/Divider';
import '../style/profileInfo.css'

export default function ProfileInfo(props) {

  return (
    <Card
      sx={{
        textAlign: "left",
        borderRadius: "0px",
        width: "50vw",
        margin: "50px",
        marginBottom: "25px",
        marginLeft: "10px",
        marginTop:"50px"

      }}
    >
       
      <Box display={'flex'}>
        <Box p={2} flex={'auto'} >
          <p class="statLabel">Events</p>
          <p class="statValue">{props.numEvent}</p>
        </Box>
        <Box p={2} flex={'auto'} >
          <p class="statLabel">Posts</p>
          <p class="statValue">{props.numPost}</p>
        </Box>
        <Box p={2} flex={'auto'} >
          <p class="statLabel">Friends</p>
          <p class="statValue">{props.numFriend}</p>
        </Box>
      </Box>
      <Divider light />
      <CardContent>
        <p class="heading">{props.name}</p>
        <p class="subheader">{props.content}</p>
      </CardContent>
    </Card>
  );
}
