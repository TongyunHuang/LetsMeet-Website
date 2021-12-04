import React from "react";
import NavList from "../components/NavList";
import PostCard from "../components/PostCard";
import ProfileHead from "../components/ProfileHead";

const samplePostDate = {
  name: "Hao Ren",
  likeCount: 13,
  date: "Sep 15",
  content:
    "This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.",
};

export default function Profile() {
  return (
    <div>
      <ProfileHead />
      <NavList />
      <PostCard data={samplePostDate} />
    </div>
  );
}
