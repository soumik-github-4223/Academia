"use client";
import React, {
  FC,
  useState,
} from "react"; /*stands for "Function Component" in React. It is a type provided by TypeScript to define a functional component. Using FC helps with type-checking and provides some built-in properties like children. Using FC is optional, but it can help with readability and type safety in your React components. */
import Heading from "./utils/Heading";
import Header from "./components/Header";
import Hero from "./components/Route/Hero";
import Courses from "./components/Route/Courses"
import Reviews from "./components/Route/Reviews";
import FAQ from "./components/Route/FAQ";
import Footer from "./components/Route/Footer";

interface Props {}

const Page: FC<Props> = () => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setroute] = useState("Login");

  return (
    <div>
      <Heading
        title="Academia"
        description="Academia is a learning plaform for technical courses"
        keywords="Academia, technical courses, learning, Programming"
      />
      <Header open={open} setOpen={setOpen} activeItem={activeItem} setroute={setroute} route={route} />
      <Hero />
      <Courses/>
      <Reviews/>
      <FAQ/>
      <Footer/>

    </div>
  );
};

export default Page;
