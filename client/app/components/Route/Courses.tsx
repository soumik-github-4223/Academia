import { useGetUserAllCoursesQuery } from "@/redux/features/courses/courseApi";
import React, { useEffect, useState } from "react";
import CourseCard from "../Course/CourseCard";

type Props = {};

const Courses = (props: Props) => {
  const { data, isLoading } = useGetUserAllCoursesQuery({});
  const [courses, setCourses] = useState();

  useEffect(() => {
    setCourses(data?.courses);
  }, [data]);

return (
  <div className="relative w-full py-16 bg-gray-100 dark:bg-gray-900 transition-colors duration-300 ">
    <div className="container mx-auto px-6 lg:px-12">
      <h1 className="text-center text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 dark:text-white leading-tight">
        Expand Your Career <span className="text-blue-600">Opportunity</span>
        <br />
        Opportunity With Our Courses
      </h1>

      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
