import React from "react";
import { styles } from "../styles/style";

const About = () => {
  return (
    <div className="px-4 py-8 bg-gray-900 text-gray-200">
      <h1 className={`${styles.title} text-3xl md:text-4xl font-bold text-center`}>
        What is <span className="text-gradient">Academia?</span>
      </h1>
      <br />
      <p className="w-[95%] md:w-[85%] mx-auto text-justify leading-relaxed">
        <span className="text-lg font-Poppins">
          Academia is a cutting-edge programming community designed to empower aspiring programmers with the tools, knowledge, and support they need to excel in the tech industry. Our mission is to bridge the gap between ambition and achievement by providing affordable, high-quality resources and a supportive community.
        </span>
        <br />
        <br />
        At Academia, we have developed a secure and efficient authentication system featuring refresh and access tokens, OTP-based user registration, and seamless login/logout functionality. Our platform also supports Google and GitHub authentication, along with features to update user information, reset passwords, and delete accounts.
        <br />
        <br />
        Our backend is powered by over 30 REST APIs, enabling functionalities such as creating, editing, and deleting courses, managing orders, generating user and course analytics for the past 12 months, and facilitating user reviews and replies. We’ve integrated Stripe as a payment gateway to ensure secure and smooth transactions.
        <br />
        <br />
        Real-time notifications are powered by Socket.IO, while dynamic emails for OTPs and user queries are sent using EJS templates. To enhance performance, we utilize Redis for caching frequently accessed data, reducing database load by 30%. Automated tasks, such as deleting old notifications, are handled through CRON jobs.
        <br />
        <br />
        Academia also leverages Cloudinary for media storage, enabling seamless profile picture updates and course content management. On the frontend, we utilize Next.js features like lazy loading and server-side rendering for improved SEO, while RTK Query ensures efficient state management and caching of previously visited URLs, enhancing user experience by 40%.
        <br />
        <br />
        Join Academia today and become part of a family that is committed to your success. With our affordable courses, real-time support, and innovative features, we are here to help you unlock your full potential and achieve your dream career in programming.
        <br />
        <br />
        <span className="font-Cursive text-xl block text-center mt-4">
          Soumik Saha
        </span>
        <h5 className="text-lg font-Poppins text-center">
          Developer of Academia
        </h5>
      </p>
      <hr />
    </div>
  );
};

export default About;