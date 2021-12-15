import React, { useState, useRef, useCallback, useEffect } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { Box, Modal, Typography, Button, Fab } from "@mui/material";
import Snackbar from '@mui/material/Snackbar';
import AddIcon from '@mui/icons-material/Add';
import ExploreIcon from '@mui/icons-material/Explore';
import Axios from "axios";

import mapStyles from "./mapStyles";
import EventForm from "./EventForm";

const libraries = ["places"];
const mapContainerStyle = {
  height: "90vh",
  width: "100vw",
};
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};

const center = {
  lat: 40.10821152261508, 
  lng: -88.22720015769352,
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: '26px'
};



export default function Map() {
  const [selected, setSelected] = useState(null)
  const [addMode, setAddMode] = useState(false)
  const [formMode, setFormMode] = useState(false)
  const [newLocation, setNewLocation] = useState({ lat: null, lng: null })
  const [eventList, setEventList] = useState([])
  const [snackBarOpen, setSnackBarOpen] = useState(false)

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyCxYsNhW_2ehCs2uJhINuOE8cVqnk6tLFg',
    libraries, // avoid rerender
  });

  useEffect(() => {
    Axios({
      method: "GET",
      url: "http://localhost:4000/api/event",
    })
    .then((res) => {
      setEventList(res.data.data)
    });
  }, [])

  const handleJoin = () => {
    Axios({
      method: "POST",
      data: {
        userId: localStorage.getItem('userId'),
        eventId: selected._id
      },
      url: "http://localhost:4000/api/attend",
    })
    .then((res) => {
      console.log(res.data)
    });
  }

  const infoWindow = (
    <Modal
      open={selected !== null}
      onClose={() => {
        setSelected(null)
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {selected == null ? '' : selected.name}
        </Typography>
        <Typography sx={{ mt: 2 }}>
          {selected == null ? '' : 'Created by ' + selected.creatorName}
        </Typography>
        <Typography sx={{ mt: 2 }}>
          {selected == null ? '' : selected.description}
        </Typography>
        <Typography sx={{ mt: 2 }}>
          {selected == null ? '' : selected.time}
        </Typography>
        <Button variant='contained' sx={{ marginTop: '20px' }} onClick={handleJoin}>Join</Button>
      </Box>
    </Modal>
  )

  const createInfoModal = (
    <Modal
      open={formMode}
      onClose={() => {
        setFormMode(false)
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{...style}}>
        <EventForm 
          location={newLocation} 
          setForm={setFormMode} 
          setEventList={setEventList} 
          eventList={eventList} 
          setNewLocation={setNewLocation}
          setAddMode={setAddMode}
        />
      </Box>
    </Modal>
  )

  const infoBox = (
    <Box sx={{
      backgroundColor: 'white',
      position: 'absolute',
      width: 'fit-content',
      padding: '10px',
      paddingLeft: '30px',
      paddingRight: '30px',
      borderRadius: '3em',
      boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)',
      margin: '20px'
    }}>
      <Typography variant='h5'>
        {addMode ? 'Select a position by click on the map' : 'Events near me'}
      </Typography>
    </Box>
  )

  

  const createEventFab = (
    <Box sx={{
      position: 'absolute',
      bottom: '20px',
      width: '100%'
    }}>
      <Fab 
        color="primary" 
        variant="extended"  
        onClick={() => {
          setAddMode(true)
        }}
      >
        <AddIcon />
        Create a new event
      </Fab>
    </Box>
  )

  const confirmLocationFab = (
    <Box sx={{
      position: 'absolute',
      bottom: '20px',
      width: '100%'
    }}>
      <Fab 
        color="primary" 
        variant="extended"  
        onClick={() => {
          if (newLocation.lat === null) {
            setSnackBarOpen(true)
          } else {
            setFormMode(true)
          }
        }}
      >
        Confirm
      </Fab>
    </Box>
  )

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(16);
  }, []);
  
  function Locate({ panTo }) {
    return (
      <Fab
        color="secondary"
        className="locate"
        onClick={() => {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              panTo({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              });
            },
            () => null
          );
        }}
        sx={{
          position: 'absolute',
          right: '20px',
          top: '20px'
        }}
      >
        <ExploreIcon />
      </Fab>
    );
  }

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  if (loadError) return "Error Loading Map";
  if (!isLoaded) return "Loading...";

  const handleMapClick = (e) => {
    if (addMode) {
      setNewLocation({ lat: e.latLng.lat(), lng: e.latLng.lng() })
    }
  }

  return (
    <div>
      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={16}
        center={center}
        options={options}
        onLoad={onMapLoad}
        onClick={handleMapClick}
      >
        <Locate panTo={panTo} />
        { addMode ? null :
          eventList.map((event) => (
            <Marker 
              position={{ lat: event.lat, lng: event.lng }}
              onClick={() => {
                setSelected(event)
                console.log(event)
              }}
            />
          ))
        }
        {
          newLocation.lat !== null && addMode ?
          <Marker
            position={{ lat: newLocation.lat, lng: newLocation.lng }}
          />
          :
          null
        }
        {infoBox}
        {addMode ? confirmLocationFab : createEventFab}
      </GoogleMap>
      {infoWindow}
      {createInfoModal}
      <Snackbar
        open={snackBarOpen}
        autoHideDuration={6000}
        onClose={() => {
          setSnackBarOpen(false)
        }}
        message="Choose a location first"
      />
    </div>
  );
}
