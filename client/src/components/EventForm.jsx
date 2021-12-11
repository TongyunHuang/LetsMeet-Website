import React, { useState } from "react";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";

export default function EventForm() {
  const [name, setName] = useState("");
  const [startDateTime, setstartDateTime] = React.useState(null);
  const [endDateTime, setendDateTime] = React.useState(null);
  const [number, setNumber] = useState(null);
  const [description, setDescription] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const event = { name, startDateTime, endDateTime, number, description };
    console.log(event);
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
                    width: "49%",
                    marginRight: "1%",
                    marginBottom: "2%",
                  }}
                  {...props}
                />
              )}
              label="From"
              value={startDateTime}
              onChange={(newValue) => {
                setstartDateTime(newValue);
              }}
            />
            <DateTimePicker
              renderInput={(props) => (
                <TextField
                  style={{ width: "49%", marginLeft: "1%", marginBottom: "2%" }}
                  {...props}
                />
              )}
              label="To"
              value={endDateTime}
              onChange={(newValue) => {
                setendDateTime(newValue);
              }}
            />
          </LocalizationProvider>
        </div>

        <TextField
          style={{ marginBottom: "2%", height: "20vh" }}
          multiline={true}
          rows={10}
          label="Event Description"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></TextField>
        <Button variant="contained">Confirm</Button>
      </form>
    </div>
  );
}
