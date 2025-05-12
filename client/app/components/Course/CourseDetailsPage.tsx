// show courses to everyone but before payment ask for login , if already logged in then show payment page
import { useGetCourseDetailsQuery } from "@/redux/features/courses/courseApi";

import React, { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import Heading from "@/app/utils/Heading";
import Header from "../Header";
import Footer from "../Route/Footer";
import CourseDetails from "./CourseDetails";
import { loadStripe } from "@stripe/stripe-js";
import { useCreatePaymentIntentMutation, useGetStripePublishablekeyQuery } from "@/redux/features/orders/ordersApi";

type Props = {
  id: string;
};

const CourseDetailsPage = ({ id }: Props) => {
  // console.log(id);
  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);
  const { data, isLoading } = useGetCourseDetailsQuery(id);
  const { data: config } = useGetStripePublishablekeyQuery({});
  const [createPaymentIntent, { data: paymentIntentData }] =
    useCreatePaymentIntentMutation();
  const [stripePromise, setStripePromise] = useState<any>(null);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    if (config) {
      const publishableKey = config?.publishableKey;
      setStripePromise(loadStripe(publishableKey));
    }
    if (data) {
      const amount = Math.round(data.course.price * 100);
      createPaymentIntent(amount);
    }
  }, [config, data, createPaymentIntent]);

  useEffect(() => {
    if (paymentIntentData) {
      setClientSecret(paymentIntentData?.client_secret);
    }
  }, [paymentIntentData]);

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
            activeItem={1}
            open={open}
            setOpen={setOpen}
            setroute={setRoute}
            route={route}
          />

          {stripePromise && (
            <CourseDetails
              data={data.course}
              stripePromise={stripePromise}
              clientSecret={clientSecret}
              setOpen={setOpen}
              setRoute={setRoute}
            />
          )}

          <Footer />
        </div>
      )}
    </>
  );
};

export default CourseDetailsPage;
