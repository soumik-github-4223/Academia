// show courses to everyone but before payment ask for login , if already logged in then show payment page
import { useGetCourseDetailsQuery } from "@/redux/features/courses/courseApi";

import React, { useState } from "react";
import Loader from "../Loader/Loader";
import Heading from "@/app/utils/Heading";
import Header from "../Header";
import Footer from "../Route/Footer";
import CourseDetails from "./CourseDetails";

type Props = {
  id: string;
};

const CourseDetailsPage = ({ id }: Props) => {
  console.log(id);
  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);
  const { data, isLoading } = useGetCourseDetailsQuery(id);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Heading
            title={data.course.name + "- Academia"}
            description="Academia is a learning plaform for technical courses"
            keywords={data?.course?.tags}
          />
          <Header
            open={open}
            setOpen={setOpen}
            activeItem={1}
            setroute={setRoute}
            route={route}
          />
          <CourseDetails data={data.course} isDemo={true} />

          <Footer/>
        </div>
      )}
    </>
  );
};

export default CourseDetailsPage;
