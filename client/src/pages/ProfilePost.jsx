import React from "react";
import NavList from "../components/NavList";
import PostCard from "../components/PostCard";
import ProfileHead from "../components/ProfileHead";
import ProfileInfo from "../components/ProfileInfo";
import { useState, useEffect } from 'react';
import Axios from "axios";
import { Navigate, useParams } from "react-router-dom";
import '../style/profile.css'


export default function ProfilePost() {
  const apiHeader = 'http://localhost:4000/api/'

  // Declare and initialize all state value here
  const [userId, setUserId] = useState();
  const [user, setUser] = useState([]);
  const [username, setUserName] = useState();
  const [post, setPost] = useState();
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
    getPost(loggedInUser,loggedInUserName)
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
    })
    .catch(function (error) {
      console.log(error)
    })
  }

  // api call get post object
  const getPost = (id,name) =>{
    Axios({
      method: "GET",
      withCredentials:true,
      url: `${apiHeader}post?where={"userId":"${id}"}`
    })
    .then((res) => {
      let dataLoad = []
      for (let i = 0; i < res.data.data.length; i++){
        let curDict = {
          index:i,
          name: name,
          id:res.data.data[i]['_id'],
          likeCount:res.data.data[i]['likeCount'], 
          date: res.data.data[i]['date'], 
          content: res.data.data[i]['content']}
        dataLoad.push(curDict)
      }
      setPost(dataLoad)
    })
    .catch(function (error) {
      console.log(error)
    })
  }

  // Increment like count each time called
  const addLike = (data) => {
    console.log(`addLike callled for postId ${data.id}`)
    console.log(data)
    Axios({
      method: "PUT",
      withCredentials:true,
      data: {
        userId: userId,
        content: data.content,
        likeCount: data.likeCount +1
      },
      url: `${apiHeader}post/${data.id}`
    })
    .then((res) => {
      // deep copy of the original post to trigger update on state
      let updatePost = [...post]
      for (let i = 0; i < updatePost.length; i++){
        if (i === data.index){
          updatePost[i].likeCount = res.data.data.likeCount
          break
        }
      }
      // change state to trigger rerender
      setPost(updatePost)
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
        <div class='col1'>
          <NavList/>
        </div>
      
        <div class='col2'> 
          {post?post.map((dataItem) =>(
            <PostCard data={dataItem} addLike={addLike}/>
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
