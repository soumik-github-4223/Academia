import { useGetCourseContentQuery } from "@/redux/features/courses/courseApi";
import React, { useState } from "react";
import Loader from "../Loader/Loader";
import Heading from "@/app/utils/Heading";
import CourseContentMedia from "./CourseContentMedia"

type Props = {
  id: string;
};

const CourseContent2 = ({ id }: Props) => {
  const { data: contentData, isLoading } = useGetCourseContentQuery(id);

  const data = contentData?.content;
// console.log("CourseContentMedia", data);
  const [activeVideo, setActiveVideo] = useState(0);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full grid md:grid-cols-10">
          <Heading
            title="Course Content"
            description="Academia is a learning platform for technical courses"
            keywords="E-commerce, online shopping, digital marketing"
          />
          <div className="col-span-7">
            <CourseContentMedia
              data={data}
              id={id}
              activeVideo={activeVideo}
              setActiveVideo={setActiveVideo}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default CourseContent2;
