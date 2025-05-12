import { useGetCourseContentQuery } from "@/redux/features/courses/courseApi";
import React, { useState } from "react";
import Loader from "../Loader/Loader";
import Heading from "@/app/utils/Heading";
import CourseContentMedia from "./CourseContentMedia";
import Header from "../Header";
import CourseContentList from "./CourseContentList";

type Props = {
  id: string;
  user:any;
};

const CourseContent2 = ({ id,user }: Props) => {
  const { data: contentData, isLoading, refetch } = useGetCourseContentQuery(id, {
    refetchOnMountOrArgChange: true});

  const data = contentData?.content;
  // console.log("CourseContentMedia", data);
  const [activeVideo, setActiveVideo] = useState(0);

  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState("Login");

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Header
            activeItem={1}
            open={open}
            setOpen={setOpen}
            route={route}
            setroute={setRoute}
          />
          <div className="w-full grid md:grid-cols-10">
            <Heading
              title="Course Content"
              description="Academia is a learning platform for technical courses"
              keywords="E-commerce, online shopping, digital marketing"
            />
            <div className="col-span-7 min-h-screen">
              <CourseContentMedia
                data={data}
                id={id}
                activeVideo={activeVideo}
                setActiveVideo={setActiveVideo}
                user={user}
                refetch={refetch}
              />
            </div>
            <div className="hidden md:block md:col-span-3">
              <CourseContentList
                setActiveVideo={setActiveVideo}
                data={data}
                activeVideo={activeVideo}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CourseContent2;
