"use client";
import { use } from "react";
import CourseDetailsPage from "../../components/Course/CourseDetailsPage";

/*{
  params: {
    id: "some-string"
  }
} */

const page = ({ params }: { params: { id: string } }) => {
  const { id } = params; // Directly access id from params
  return (
    <div>
      <CourseDetailsPage id={id} />
    </div>
  );
};

export default page;
