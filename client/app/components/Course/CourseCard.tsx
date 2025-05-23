import Ratings from "@/app/admin/utils/Ratings";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import { AiOutlineUnorderedList } from "react-icons/ai";

type Props = {
  item: any;
  isProfile?: boolean;
};

const CourseCard: FC<Props> = ({ item, isProfile }) => {
  // console.log(item._id);
  if (!item || !item._id) {
    console.error("Invalid course item:", item);
    return null; // Render nothing if item is invalid
  }

  return (
    <Link
      href={!isProfile ? `/course/${item._id}` : `/course-access/${item._id}`}
    >
      <div
        // onClick={() =>
        //   console.log(
        //     "Navigating to:",
        //     !isProfile ? `/course/${item._id}` : `/course-access/${item._id}`
        //   )
        // }
        className="w-full min-h-[35vh] bg-slate-900 bg-opacity-20 backdrop-blur border border-[#ffffff1d] shadow-[bg-slate-700] rounded-lg p-3"
      >
        <Image
          src={item.thumbnail.url}
          width={500}
          height={300}
          objectFit="contain"
          className="rounded w-full"
          alt=""
        />
        <br />
        <h1 className="font-Poppins text-[16px] text-[#fff]">{item.name}</h1>
        <div className="w-full flex items-center justify-between pt-2">
          <Ratings rating={item.ratings} />
          <h5 className={`text-[#fff] ${isProfile && "hidden 800px:inline"}`}>
            {item.purchased} Students
          </h5>
        </div>
        <div className="w-full flex items-center justify-between pt-3">
          <div className="flex">
            <h3 className="text-[#fff]">
              {item.price === 0 ? "Free" : item.price + "$"}
            </h3>
            <h5 className="pl-3 text-[14px] mt-[-5px] line-through opacity-80 text-[#fff]">
              {item.estimatedPrice}$
            </h5>
          </div>
          <div className="flex items-center pb-3">
            <AiOutlineUnorderedList size={20} fill="#fff" />
            <h5 className="pl-2 text-[#fff]">
              {item.courseData?.length} Lectures
            </h5>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;