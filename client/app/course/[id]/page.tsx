"use client";
import { use } from "react";
import CourseDetailsPage from "../../components/Course/CourseDetailsPage";

/*{
  params: {
    id: "some-string"
  }
} */

const Page = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params); // Unwrap params using React.use()
  return (
    <div>
      <CourseDetailsPage id={id} />
    </div>
  );
};

export default Page;
