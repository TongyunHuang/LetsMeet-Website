import React from "react";
import NavList from "../components/NavList";
import ProfileHead from "../components/ProfileHead";
import { useState, useEffect } from 'react';
import Axios from "axios";
import { Navigate, useParams } from "react-router-dom";
import '../style/profile.css';
import EventCard from "../components/EventCard";
import EventDialog from "../components/EventDialog";
import EventFilterBar from "../components/EventFilterBar";

export default function ProfileEvent() {
  const apiHeader = 'http://localhost:4000/api/'

  // Declare and initialize all state value here
  const [userId, setUserId] = useState();
  const [user, setUser] = useState([]);
  const [username, setUserName] = useState();
  const [event, setEvent] = useState([]);
  const [allEvent, setAllEvent] = useState([]);
  const { handle } = useParams()

  // load data when render
  useEffect(() => {
    const loggedInUser = handle?handle:localStorage.getItem("userId");
    const loggedInUserName = localStorage.getItem("username");
    console.log(`profile page get name${loggedInUserName}`)
    if (loggedInUser) {
      setUserId(loggedInUser);
    }
    if (loggedInUserName){
      setUserName(loggedInUserName);
    }
    getUser(loggedInUser)
    getEvent(loggedInUser,loggedInUserName)
  }, []);

  
  /**
   * api call get user object
   * @param {String} id 
   */
  const getUser = (id) =>{
    Axios({
      method: "GET",
      withCredentials:true,
      url: `${apiHeader}user/${id}`
    })
    .then((res) => {
      setUser(res.data.data)
      setUserName(res.data.data['name'])
    })
    .catch(function (error) {   console.log(error)  })
  }

   // api call get event object
  const getEvent = (id,name) =>{
    let dataLoad = []
    // get events created by the userID
    Axios({
      method: "GET",
      withCredentials:true,
      url: `${apiHeader}event/?where={"creator":"${id}"}`
    })
    .then((res) => {
      for (let i = 0; i < res.data.data.length; i++){
        let curDict = {name: name, 
          eventName: res.data.data[i]['name'],
          status:'creator',
          date: res.data.data[i]['time'], 
          content: res.data.data[i]['description']}
          dataLoad.push(curDict)
      }
    
    
    // get list of joined event info
    let joinedId = []
    let joinedDict = {}
    Axios({
      method: "GET",
      withCredentials:true,
      url: `${apiHeader}attend/?where={"userId":"${id}"}`
    })
    .then((res) => {
      
      for (let i = 0; i < res.data.data.length; i++){
        joinedId[i]=res.data.data[i].eventId
        joinedDict[joinedId[i]]=res.data.data[i].status
    }
    // console.log(joinedId)
      if (joinedId.length === 0){
        // console.log(dataLoad)
        setEvent(dataLoad)
        return;
      }
      let arrStr = ''
      for (let i = 0; i < joinedId.length; i++) {
        if (i !== 0){
          arrStr = arrStr + ','
        }
        arrStr = arrStr + `"${joinedId[i]}"`
      }
      // console.log(`${apiHeader}event/?where={"_id": {"$in":[${arrStr}]}}`)
      // console.log(arrStr)
      // get event joined by the list of eventId
      Axios({
        method: "GET",
        withCredentials:true,
        url: `${apiHeader}event/?where={"_id": {"$in":[${arrStr}]}}`
      })
      .then((resE) => {
        for (let i = 0; i < resE.data.data.length; i++){
          let entDict = {name: name, 
            status:joinedDict[resE.data.data[i]['_id']],
            eventName: resE.data.data[i]['name'],
            date: resE.data.data[i]['time'], 
            content: resE.data.data[i]['description']
          }
          dataLoad.push(entDict)
        }
        // console.log(dataLoad)
        setEvent(dataLoad)
      })
    })
  })
    .catch(function (error) {  console.log(error)  })

  }


  
  

  // profile info page main body
  const profile = (
    <div>
      <ProfileHead name={user?user['name']:null}/>
      <div class='container-grid'>
        <div class='col1'>
          <NavList/>
          {/* <EventDialog userId={userId?userId:null}/> */}
        </div>
        <div class='col2'>
          {/* <EventFilterBar/> */}
          {event?event.map((dataItem) =>(
            <EventCard data={dataItem}/>
          )):null}
       </div> 
      </div>
    </div>
  )
  
  // redirect to login if no login & no specified userId
  const needLogin = (
    <div>
      <Navigate to="/login" />
    </div>
  )

  // page rander here
  return (
    <div>
    {localStorage.getItem("username")? profile : needLogin }
    </div>
  );
  
  
}
