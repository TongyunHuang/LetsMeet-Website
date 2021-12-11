import React from "react";
import FriendsNavList from "../components/FriendsNavList";
import PostCard from "../components/PostCard";
import ProfileHead from "../components/ProfileHead";

const samplePostDate = {
  name: "Hao Ren",
  likeCount: 13,
  date: "Sep 15",
  content:
    "This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.",
};
const samplePostDate2 = {
  name: "Friend 2",
  likeCount: 20,
  date: "Sep 16",
  content:
    "She looked at the control panel and knew there was nothing that would ever get it back into working order. She was the first and it was not clear this would also be her last.",
};
const samplePostDate3 = {
  name: "Friend 3",
  likeCount: 30,
  date: "Sep 17",
  content:
    "Stranded. Yes, she was now the first person ever to land on Venus, but that was of little consequence. Her name would be read by millions in school as the first to land here, but that celebrity would never actually be seen by her.",
};

export default function Friends() {
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
        <div>
          <PostCard data={samplePostDate} />
          <PostCard data={samplePostDate2} />
          <PostCard data={samplePostDate3} />
        </div>
      </div>
    </div>
  );
}
