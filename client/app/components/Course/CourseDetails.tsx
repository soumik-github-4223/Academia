import CoursePlayer from "@/app/admin/utils/CoursePlayer";
import Ratings from "@/app/admin/utils/Ratings";
import { styles } from "@/app/styles/style";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoCheckmarkDoneOutline, IoCloseOutline } from "react-icons/io5";
import CourseContentList from "../Course/CourseContentList";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../Payment/CheckoutForm";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import Image from "next/image";
import defaultAvatar from "../../../public/assets/avatar.png";

type Props = {
  data: any;
  clientSecret: string;
  stripePromise: any;
  setRoute:any;
  setOpen:any;
};

const CourseDetails = ({ data, stripePromise, clientSecret, setRoute, setOpen:openAuthModal }: Props) => {
  // console.log(data);
  const { data: userData } = useLoadUserQuery(undefined, {});

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (userData) {
      // console.log("User data is:", userData);
      setUser(userData.user || null);
    }
  }, [userData]);

  
  const [open, setOpen] = useState(false);

  const discountPercentage =
    ((data?.estimatedPrice - data.price) / data?.estimatedPrice) * 100; // calculate discount percentage

  const discountPercentagePrice = discountPercentage.toFixed(0); // round to 0 decimal places

  const isPurchased=user?.courses?.find((item: any) => item._id === data._id);
  

  const handleOrder = (e: any) => {
    if(user){
      setOpen(true);
    }
    else{
      setRoute("Login");
      openAuthModal(true);
    }
  };

  return (
    <div>
      <div className="flex flex-col lg:flex-row w-[90%] md:w-[90%] m-auto py-5">
        <div className="w-full lg:w-[65%] lg:pr-5">
          <h1 className="text-[25px] font-Poppins font-[600] text-white">
            {data.name}
          </h1>
          <div className="flex items-center justify-between pt-3">
            <div className="flex items-center">
              <Ratings rating={data.ratings} />
              <h5 className="text-white">{data.reviews?.length} Reviews</h5>
            </div>
            <h5 className="text-white">{data.purchased} Students</h5>
          </div>

          <br />
          <h1 className="text-[25px] font-Poppins font-[600] text-white">
            What you will learn from this course?
          </h1>

          <div>
            {data.benifits?.map((item: any, index: number) => (
              <div className="w-full flex md:items-center py-2" key={index}>
                <div className="w-[15px] mr-1">
                  <IoCheckmarkDoneOutline size={20} className="text-white" />
                </div>
                <p className="pl-2 text-white">{item.title}</p>
              </div>
            ))}
            <br />
            <br />
          </div>

          <div>
            <h1 className="text-[25px] font-Poppins font-[600] text-white">
              What are the prerequisites for starting this course?
            </h1>
            {data.prerequisites?.map((item: any, index: number) => (
              <div className="w-full flex md:items-center py-2" key={index}>
                <div className="w-[15px] mr-1">
                  <IoCheckmarkDoneOutline size={20} className="text-white" />
                </div>
                <p className="pl-2 text-white">{item.title}</p>
              </div>
            ))}
            <br />
            <br />
            <h1 className="text-[25px] font-Poppins font-[600] text-white">
              Course Overview
            </h1>
            <CourseContentList data={data?.courseData} />
          </div>
          <br />
          <br />

          <div className="w-full">
            <h1 className="text-[25px] font-Poppins font-[600] text-white">
              Course Details
            </h1>
            <p className="text-[18px] mt-[20px] whitespace-pre-line w-full overflow-hidden text-white">
              {data.description}
            </p>
            <div className="w-full">
              <div className="md:flex items-center">
                <Ratings rating={data?.ratings} />
                <h5 className="text-[25px] font-Poppins text-white">
                  {Number.isInteger(data?.ratings)
                    ? data?.ratings.toFixed(1)
                    : data?.ratings.toFixed(2)}{" "}
                  Course Rating ({data?.reviews?.length} Reviews)
                </h5>
              </div>
            </div>
            <br />
            {data?.reviews &&
              [...data.reviews].reverse().map((item: any, index: number) => (
                <div className="w-full pb-4" key={index}>
                  <Image
                    src={user?.avatar ? user.avatar.url : defaultAvatar}
                    width={50}
                    height={50}
                    alt=""
                    className="w-[50px] h-[50px] rounded-full object-cover"
                  />
                    <div className="ml-2">
                      <div className="flex items-center space-x-2">
                      <h1 className="text-[18px] font-semibold text-white">
                        {item?.user.name}
                      </h1>
                      <Ratings rating={item.rating} />
                      </div>
                      <p className="mt-2 text-white">
                      {item.comment ||
                        item.review ||
                        "No review text available"}
                      </p>
                      <span className="text-sm text-[#ffffff83]">
                      {item.createdAt
                        ? new Date(item.createdAt).toLocaleString()
                        : ""}
                      </span>
                    </div>
                </div>
              ))}
          </div>
        </div>
        <div className="w-full lg:w-[35%] relative mt-5 lg:mt-0">
          <CoursePlayer videoUrl={data?.demoUrl} title={data?.title} />
          <div className="flex items-center justify-between pt-5">
            <div className="flex items-center">
              <h1 className="text-[25px] text-white">
                {data.price === 0 ? "Free" : `$${data.price}`}
              </h1>
              <h5 className="pl-3 text-[20px] line-through opacity-80 text-white">
                ${data.estimatedPrice}
              </h5>
            </div>
            <h4 className="text-[22px] text-white">
              {discountPercentagePrice}% Off
            </h4>
          </div>
          <div className="flex items-center justify-center mt-5">
            {isPurchased ? (
              <Link
                className={`${styles.button} w-[180px] font-Poppins cursor-pointer bg-[crimson]`}
                href={`/course-access/${data._id}`}

              >
                Enter to Course
              </Link>
            ) : (
              <div
                className={`${styles.button} w-[180px] font-Poppins cursor-pointer bg-[crimson]`}
                onClick={handleOrder}
              >
                Buy Now ${data.price}
              </div>
            )}
          </div>
          <br />
          <p className="pb-1 text-black dark:text-white">
            - Source code included
          </p>
          <p className="pb-1 text-black dark:text-white">
            - Full lifetime access
          </p>
          <p className="pb-1 text-black dark:text-white">
            - Certificate of completion
          </p>
          <p className="pb-3 800px:pb-1 text-black dark:text-white">
            - Premium Support
          </p>
        </div>
      </div>

      {open && (
        <div className="w-full h-screen bg-[#00000036] fixed top-0 left-0 z-50 flex items-center justify-center">
          <div className="w-[500px] max-h-[90vh] bg-white rounded-xl shadow p-3 overflow-y-auto">
            <div className="w-full flex justify-end">
              <IoCloseOutline
                size={40}
                className="text-black cursor-pointer"
                onClick={() => setOpen(false)}
              />
            </div>
            <div className="w-full">
              {stripePromise && clientSecret && (
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                  <CheckoutForm setOpen={setOpen} data={data} user={user} />
                </Elements>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDetails;
