import React from "react";
import Map from "../components/Map";
import axios from "axios";
import CustomizedDialogs from "../components/EventModal";
import EventForm from "../components/EventForm";

export default function Home() {
  return (
    <div>
      <CustomizedDialogs>
        <EventForm />
      </CustomizedDialogs>
      <Map />
    </div>
  );
}
