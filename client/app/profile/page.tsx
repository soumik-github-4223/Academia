'use client';
import React, { FC, useState } from "react";
import Protected from "../hooks/useProtected";
import Heading from "../utils/Heading";
import Header from "../components/Header";
import Profile from "../components/Profile/Profile"
import { useSelector } from "react-redux";

type Props = {};

const Page: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(5);
  const [route, setroute] = useState("Login");
  const {user}=useSelector((state:any)=>state.auth);

  return (
    <div>
      <Protected>
        <Heading
          title={`Academia Profile: ${user.name}`}
          description="Academia is a learning plaform for technical courses"
          keywords="Academia, technical courses, learning, Programming"
        />
        <Header
          open={open}
          setOpen={setOpen}
          activeItem={activeItem}
          setroute={setroute}
          route={route}
        />
        <Profile user={user} />
      </Protected>
    </div>
  );
};
export default Page;
