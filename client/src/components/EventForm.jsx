import React, { useState } from "react";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";

export default function EventForm() {
  const [name, setName] = useState("");
  const [number, setNumber] = useState(null);
  const [date, setDate] = useState(null);
  const [description, setDescription] = useState("");
  const [startDateTime, setstartDateTime] = React.useState(null);
  const [endDateTime, setendDateTime] = React.useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    const event = { name, number, description };
    console.log(event);
  };

  return (
    <div className="eventForm">
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <TextField
          label="Event Name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <LocalizationProvider
          dateAdapter={AdapterDateFns}
          style={{ display: "flex", flexDirection: "row" }}
        >
          <DateTimePicker
            renderInput={(props) => <TextField {...props} />}
            label="From"
            value={startDateTime}
            onChange={(newValue) => {
              setstartDateTime(newValue);
            }}
          />
          <DateTimePicker
            renderInput={(props) => <TextField {...props} />}
            label="To"
            value={endDateTime}
            onChange={(newValue) => {
              setendDateTime(newValue);
            }}
          />
        </LocalizationProvider>
        <TextField
          label="Expected Number of Attendees"
          type="number"
          required
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
        <TextField
          label="Event Description"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></TextField>
      </form>

      <Button variant="contained">Confirm</Button>
    </div>
  );
}
