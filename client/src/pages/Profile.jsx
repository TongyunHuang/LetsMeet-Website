import React from "react";
import NavList from "../components/NavList";
import PostCard from "../components/PostCard";
import ProfileHead from "../components/ProfileHead";
import ProfileInfo from "../components/ProfileInfo";
import { useState, useEffect } from 'react';
import Axios from "axios";
import { Navigate, useParams } from "react-router-dom";
import '../style/profile.css'


export default function Profile() {
  const apiHeader = 'http://localhost:4000/api/'

  // Declare and initialize all state value here
  const [userId, setUserId] = useState();
  const [user, setUser] = useState([]);
  const [username, setUserName] = useState();
  const [numPost, setNumPost] = useState();
  const [numEvent, setNumEvent] = useState();
  const [numFriend, setNumFriend] = useState();
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
      setUserName(loggedInUserName)
    }
    getUser(loggedInUser)
    getPost(loggedInUser)
    getEvent(loggedInUser)

  }, []);

   // api call get user object
   const getUser = (id) =>{
    Axios({
      method: "GET",
      withCredentials:true,
      url: `${apiHeader}user/${id}`
    })
    .then((res) => {
      setUser(res.data.data)
      setNumFriend(res.data.data.friends.length)
    })
    .catch(function (error) {
      console.log(error)
    })
  }

  // api call get post object
  const getPost = (id) =>{
    Axios({
      method: "GET",
      withCredentials:true,
      url: `${apiHeader}post?where={"userId":"${id}"}`
    })
    .then((res) => {
      const len = res.data.data.length
      setNumPost(len)
    })
    .catch(function (error) {
      console.log(error)
    })
  }

   // api call get event object
   const getEvent = (id) =>{
    Axios({
      method: "GET",
      withCredentials:true,
      url: `${apiHeader}event/?where={"creator":"${id}"}`
    })
    .then((res) => {
      const len = res.data.data.length
      setNumEvent(len)
    })
    .catch(function (error) {
      console.log(error)
    })
  }

  

  // profile info page main body
  const profile = (
    <div>
      <ProfileHead name={user?user['name']:'Undefined'}/>
      <div class='container-grid'>
        <div class='col1'><NavList/></div>
      
      <div class='col2'> <ProfileInfo class='col' numEvent={numEvent?numEvent:'0'} 
          numPost={numPost?numPost:'0'}  numFriend={numFriend?numFriend:'0'}  
          name={user?user['name']:'Undefined'}  content={user?user['bio']:'Undefined'} /></div> 
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
