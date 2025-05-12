import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FC, useState } from "react";

type Props = {};

const Hero: FC<Props> = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (search.trim() === "") return;
    router.push(`/courses?title=${encodeURIComponent(search)}`);
  };

  return (
    <div className="relative w-full h-screen bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Content */}
      <div className="container mx-auto px-6 lg:px-12 flex flex-col items-center lg:flex-row lg:items-center justify-between h-full">
        {/* Text Section */}
        <div className="lg:w-1/2 text-center lg:text-left">
          <h1 className="text-5xl lg:text-7xl font-extrabold text-gray-800 dark:text-white leading-tight">
            Empower Your <span className="text-blue-600">Learning</span> Journey
          </h1>
          <p className="mt-6 text-lg lg:text-xl text-gray-600 dark:text-gray-300">
            Discover technical courses and resources to enhance your skills and
            achieve your goals.
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
        <div className="lg:w-1/2 flex flex-col items-center lg:items-end">
          <div className="relative w-[90%] lg:w-[80%] 2xl:w-[70%] h-auto hero_animation">
            <div className="relative overflow-hidden shadow-lg rounded-lg">
              <Image
                src="/assets/hero.jpg"
                alt="Hero Image"
                layout="responsive"
                width={800}
                height={500}
                className="object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-blue-500 blur-3xl opacity-30"></div>
            </div>
          </div>

          {/* Search Course Field */}
          {/* <div className="mt-8 w-[90%] lg:w-[80%] 2xl:w-[70%]">
            <div className="flex items-center justify-center space-x-2">
              <input
                type="text"
                placeholder="Search for courses..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                className="p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition cursor-pointer z-10"
                onClick={handleSearch}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11 19a8 8 0 100-16 8 8 0 000 16zm4.293-4.293l5.414 5.414"
                  />
                </svg>
              </button>
            </div>
          </div> */}

          {/* Trusted By Section */}
          <div className="mt-6 w-[90%] lg:w-[80%] 2xl:w-[70%] text-center">
            <div className="flex items-center justify-center space-x-2">
              <div className="flex -space-x-2">
                <Image
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  alt="Avatar 1"
                  width={40}
                  height={40}
                  className="rounded-full border-2 border-white"
                />
                <Image
                  src="https://randomuser.me/api/portraits/women/44.jpg"
                  alt="Avatar 2"
                  width={40}
                  height={40}
                  className="rounded-full border-2 border-white"
                />
                <Image
                  src="https://randomuser.me/api/portraits/men/65.jpg"
                  alt="Avatar 3"
                  width={40}
                  height={40}
                  className="rounded-full border-2 border-white"
                />
                <Image
                  src="https://randomuser.me/api/portraits/women/12.jpg"
                  alt="Avatar 4"
                  width={40}
                  height={40}
                  className="rounded-full border-2 border-white"
                />
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-lg font-medium">
                50k people already trusted us..
              </p>
            </div>
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
