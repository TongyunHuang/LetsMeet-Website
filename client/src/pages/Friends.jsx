import React from "react";
import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Axios from "axios";


import FriendsNavList from "../components/FriendsNavList";
import PostCard from "../components/PostCard";
import ProfileHead from "../components/ProfileHead";
import ComposeForm from "../components/ComposeForm";

export default function Friends() {
  const [tweets, setTweets] = useState([]);
  const [addMode, setAddMode] = useState(false)

  const username = localStorage.getItem('username')
  if (!username) {
    username = 'default user'
  }

  useEffect(() => {
    Axios.get("http://localhost:4000/api/post").then((res) => {
      setTweets(res.data.data.reverse());
      console.log(tweets);
    });
  }, []);

  const handlePostTweet = (content) => {
    const newTweet = {
      content,
      userId: localStorage.getItem("userId"),
      name: localStorage.getItem("username"),
      date: Date(Date.now()),
      likeCount: 0,
    };

    Axios({
      method: "POST",
      data: newTweet,
      withCredentials: true,
      url: "http://localhost:4000/api/post",
    }).then((res) => {
      console.log(`Post ${res.data.data.content} added!`);
      Axios.get("http://localhost:4000/api/post").then((res) => {
        setTweets(res.data.data.reverse());
      });
    });
  };

  return (
    <div>
      <ProfileHead name={username}/>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <FriendsNavList setAddMode={setAddMode} addMode={addMode} />
        <div>
          <Box sx={{
            display: addMode ? 'inline' : 'none'
          }}>
            <ComposeForm onSubmit={handlePostTweet} />
          </Box>
          <div>
            {tweets.length == 0 ? (
              <p>Loading...</p>
            ) : (
              tweets.map((tweet) => (
                <PostCard key={tweet._id} data={tweet} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
