import React, { useState } from "react";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import Axios from "axios";

export default function EventForm(props) {
  const [name, setName] = useState("");
  const [startDateTime, setStartDateTime] = useState(new Date());
  const [number, setNumber] = useState(0);
  const [description, setDescription] = useState("");
  
  const username = localStorage.getItem('username')
  const userId = localStorage.getItem('userId')

  const setFormMode = props.setForm
  const setEventList = props.setEventList
  const eventList = props.eventList
  const setNewLocation = props.setNewLocation
  const setAddMode = props.setAddMode

  const handleSubmit = (e) => {
    e.preventDefault();
    const { lat, lng } = props.location
    const event = { name, time: startDateTime.toISOString(), description, creatorName: username, creator: userId, lat, lng};
    Axios({
      method: "POST",
      data: {
        name: event.name,
        time: event.time,
        creator: event.creator, 
        creatorName: event.creatorName,
        lat: event.lat,
        lng: event.lng,
        description: event.description
      },
      url: "http://localhost:4000/api/event",
    })
    .then((res) => {
      console.log(res.data)
      setEventList([...eventList, res.data.data])
      setFormMode(false)
      setNewLocation({ lat: null, lng: null })
      setAddMode(false)
    });
    
    // setEventList([...eventList, event])
  };

  return (
    <div className="eventForm">
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div>
          <TextField
            label="Event Name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ width: "49%", marginRight: "1%", marginBottom: "2%" }}
          />
          <TextField
            label="Expected Number of Attendees"
            type="number"
            required
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            style={{ width: "49%", marginLeft: "1%", marginBottom: "2%" }}
          />
        </div>
        <div>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              renderInput={(props) => (
                <TextField
                  style={{
                    width: "100%",
                    marginRight: "1%",
                    marginBottom: "2%",
                  }}
                  {...props}
                />
              )}
              label="Start Time"
              value={startDateTime}
              onChange={(newValue) => {
                setStartDateTime(newValue);
              }}
            />
          </LocalizationProvider>
        </div>

        <TextField
          style={{ marginBottom: "2%", height: "20vh" }}
          multiline={true}
          rows={7}
          label="Event Description"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></TextField>
        <Button variant="contained" type='submit'>Confirm</Button>
      </form>
    </div>
  );
}
