import Image from "next/image";
import React from "react";

type Props = {};

export const reviews = [
  {
    name: "Walter White",
    avatar: "https://i.pravatar.cc/150?u=walter_white",
    profession: "Chemistry Teacher | Albuquerque High",
    comment:
      "I appreciate the depth of each topic. This platform makes learning genuinely exciting!",
  },
  {
    name: "Sophie Turner",
    avatar: "https://i.pravatar.cc/150?u=sophie_turner",
    profession: "Full-Stack Developer | TechBridge",
    comment:
      "Fantastic courses with real-world projects. I've landed a new job thanks to Academia!",
  },
  {
    name: "Ben Carter",
    avatar: "https://i.pravatar.cc/150?u=ben_carter",
    profession: "Computer Science Student | Oxford University",
    comment:
      "The resources are top-notch and the platform is really intuitive. Highly recommended!",
  },
  {
    name: "Mina Davidson",
    avatar: "https://i.pravatar.cc/150?u=mina_davidson",
    profession: "Junior Web Developer | Indonesia",
    comment:
      "Structured lessons and engaging content. My web development skills improved so much!",
  },
  {
    name: "Kelly Yang",
    avatar: "https://i.pravatar.cc/150?u=kelly_yang",
    profession: "UI/UX Designer | Nexus Media",
    comment:
      "Loved the design-centric courses! They helped me improve my portfolio significantly.",
  },
  {
    name: "Daniel Liu",
    avatar: "https://i.pravatar.cc/150?u=daniel_liu",
    profession: "Data Scientist | FinTech Labs",
    comment:
      "Awesome tutorials on machine learning. Clear explanations and excellent examples!",
  },
  {
    name: "Hannah Brown",
    avatar: "https://i.pravatar.cc/150?u=hannah_brown",
    profession: "Marketing Specialist | GrowthWave",
    comment:
      "I never thought online learning could be this interactive. Great experience overall!",
  },
  {
    name: "Claire Peterson",
    avatar: "https://i.pravatar.cc/150?u=claire_peterson",
    profession: "Project Manager | InnovateX",
    comment:
      "The platform’s variety of courses is amazing. I found exactly what I needed.",
  },
  {
    name: "John Doe",
    avatar: "https://i.pravatar.cc/150?u=john_doe",
    profession: "Software Engineer | TechCorp",
    comment:
      "The hands-on projects were incredibly helpful. I feel much more confident in my skills now.",
  },
  {
    name: "Jane Smith",
    avatar: "https://i.pravatar.cc/150?u=jane_smith",
    profession: "Graphic Designer | Creative Studio",
    comment:
      "The design courses were fantastic! They helped me land my dream job.",
  },
];

const Reviews = (props: Props) => {
  return (
    <div className="relative w-full py-16 bg-gradient-to-b from-gray-900 to-gray-800 overflow-hidden">
      <h2 className="text-4xl font-extrabold text-center text-white mb-12">
        What People Are Saying
      </h2>

      <div className="relative flex items-center space-x-8 animate-scroll">
        {reviews.concat(reviews).map((review, index) => (
          <div
            key={index}
            className="bg-gray-800 rounded-lg shadow-lg p-6 text-center text-white min-w-[300px] transition-transform transform hover:scale-105"
          >
            <Image
              src={review.avatar}
              alt={`${review.name} avatar`}
              width={80}
              height={80}
              className="rounded-full mx-auto"
            />
            <h3 className="text-lg font-semibold mt-4">{review.name}</h3>
            <p className="text-sm italic text-gray-400">{review.profession}</p>
            <div className="text-yellow-400 text-base mt-2">★★★★★</div>
            <p className="text-gray-300 mt-3 text-sm">{review.comment}</p>
          </div>
        ))}
      </div>

      {/* Keyframes for smooth horizontal scrolling */}
      <style jsx>{`
        .animate-scroll {
          display: flex;
          animation: scroll 30s linear infinite;
        }

        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
};

export default Reviews;