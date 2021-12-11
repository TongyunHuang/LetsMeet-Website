import React from "react";
import FriendsNavList from "../components/FriendsNavList";
import ProfileHead from "../components/ProfileHead";
import Editor from "../components/Editor";

export default function AddPost() {
  return (
    <div>
      <ProfileHead />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <FriendsNavList />
        <Editor />
      </div>
    </div>
  );
}
