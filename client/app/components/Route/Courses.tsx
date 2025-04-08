import { useGetAllCoursesQuery } from "@/redux/features/courses/courseApi";
import React, { useEffect, useState } from "react";
import CourseCard from "../Course/CourseCard"

type Props = {};

const Courses = (props: Props) => {
  const { data, isLoading } = useGetAllCoursesQuery({});
  const [courses, setCourses] = useState();

  useEffect(() => {
    setCourses(data?.courses);
  }, [data]);

  return (
    <div>
      <div className={"w-[90%] md:w-[80%] m-auto"}>
        <h1 className="text-center font-Poppins text-[25px] leading-[35px] sm:text-3xl lg:text-4xl text-white md:!leading-[60px] font-[700] tracking-tight">
          Expand Your Career <span className="text-gradient">Opportunity</span>
          <br />
          Opportunity With Our Courses
        </h1>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 1500px:grid-cols-4 1500px:gap-[35px] mb-12 border-0">
          {courses &&
            courses.map((item: any, index: number) => (
              <CourseCard item={item} key={index} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;
