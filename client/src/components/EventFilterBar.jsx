import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';


export default function EventFilterBar() {
  return (
    <Box sx={{ 
      textAlign: "left",
        borderRadius: "0px",
        width: "50vw",
        margin: "50px",
        marginBottom: "25px",
        marginLeft: "100px",
      '& > :not(style)': { m: 1 } }}>
      <Fab variant="extended" size="medium" color="#9FDDDD" aria-label="add">
        Joined
      </Fab>
      <Fab variant="extended" size="medium" color="#9FDDDD" aria-label="add">
        Attended
      </Fab>
      <Fab variant="extended" size="medium" color="#9FDDDD" aria-label="add">
        Missed
      </Fab>
    </Box>
  );
}