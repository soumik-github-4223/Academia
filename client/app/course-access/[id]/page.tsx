"use client";

import Loader from "@/app/components/Loader/Loader";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { redirect } from "next/navigation";
import React, { useEffect, use } from "react";

import CourseContent2 from "../../components/Course/CourseContent2"

type Params = {
  id: string;
};

type Props = {
  params: Promise<Params>;
};
const Page = ({ params }: Props) => {
  const { id } = use(params); // Unwrap the params Promise

  const { isLoading, error, data } = useLoadUserQuery(undefined, {});

  useEffect(() => {
    if (data) {
      const isPurchased = 
      true; // true is given to see demo access of the course

      // comment the above line and uncomment below for actual functionality
      // data.user.courses.find(
      //   (item: any) => item._id === id
      // );

      if (!isPurchased) {
        redirect("/");
      }
    }
    if (error) {
      redirect("/");
    }
  }, [data, error]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <CourseContent2 id={id} />
        </div>
      )}
    </>
  );
};

export default Page;
