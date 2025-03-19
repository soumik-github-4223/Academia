import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";

type Props = {};

const Hero: FC<Props> = () => {
  return (
    <div className="relative w-full h-screen bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Content */}
      <div className="container mx-auto px-6 lg:px-12 flex flex-col-reverse lg:flex-row items-center justify-between h-full">
        {/* Text Section */}
        <div className="lg:w-1/2 text-center lg:text-left">
          <h1 className="text-5xl lg:text-7xl font-extrabold text-gray-800 dark:text-white leading-tight">
            Empower Your <span className="text-blue-600">Learning</span> Journey
          </h1>
          <p className="mt-6 text-lg lg:text-xl text-gray-600 dark:text-gray-300">
            Discover technical courses and resources to enhance your skills and achieve your goals.
          </p>
          <div className="mt-8 flex justify-center lg:justify-start space-x-4">
              <a className="px-8 py-4 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition text-lg font-medium">
                Explore Courses
              </a>
          
              <a className="px-8 py-4 bg-gray-200 text-gray-800 rounded-full shadow-lg hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 transition text-lg font-medium">
                Learn More
              </a>
          </div>
        </div>

        {/* Image Section */}
        <div className="lg:w-1/2 flex justify-center lg:justify-end">
          <div className="relative w-[90%] lg:w-[80%] 2xl:w-[70%] h-auto hero_animation">
            <Image
              src="/assets/hero.jpg"
              alt="Hero Image"
              layout="responsive"
              width={500}
              height={500}
              className="rounded-lg shadow-lg object-cover"
            />
          </div>
        </div>
      </div>

      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-blue-500 rounded-full blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-60 h-60 bg-pink-500 rounded-full blur-3xl opacity-30 animate-pulse"></div>
    </div>
  );
};

export default Hero;