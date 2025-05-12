"use client";
import React, { useState } from "react";
import Heading from "../utils/Heading";
import Header from "../components/Header";
import Footer from "../components/Route/Footer";
import FAQ from "../components/Route/FAQ";

type Props = {};

const Page = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(2);
  const [route, setRoute] = useState("Login");

  return (
    <div>
      <Heading
        title="About us - Academia"
        description="Academia is a learning management system for helping programmers."
        keywords="programming,mern"
      />
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        setActiveItem={setActiveItem}
        setRoute={setRoute}
        route={route}
      />
      <FAQ/>
      <Footer/>
    </div>
  );
};

export default Page;