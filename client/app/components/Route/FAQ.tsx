import React, { useState } from "react";

type Props = {};

const faqData = [
  {
    question: "What is Academia?",
    answer:
      "Academia is an online learning platform offering high-quality courses and resources to help you upgrade your skills."
  },
  {
    question: "How do I enroll in a course?",
    answer:
      "Simply create an account, navigate to the course you’re interested in, and click the 'Enroll' button to get started."
  },
  {
    question: "Are there any prerequisites?",
    answer:
      "Each course has a specific set of prerequisites listed on its page. Most courses are beginner friendly, unless specified otherwise."
  },
  {
    question: "Do you offer certificates upon course completion?",
    answer:
      "Yes, many of our courses provide a certificate of completion to showcase your newfound knowledge."
  },
  {
    question: "Can I learn at my own pace?",
    answer:
      "Absolutely. Our platform is self-paced, allowing you to study when it’s convenient for you."
  },
  {
    question: "Is there a community forum?",
    answer:
      "Yes! We have a vibrant community forum where you can interact with instructors and fellow learners."
  }
];

const FAQ = (props: Props) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="relative w-full py-16 bg-gradient-to-b from-gray-900 to-gray-800">
      <h2 className="text-4xl font-extrabold text-center text-white mb-12">
        Frequently Asked Questions
      </h2>

      <div className="container mx-auto px-4 max-w-4xl space-y-4">
        {faqData.map((item, index) => (
          <div
            key={index}
            className="border-b border-gray-700 pb-4"
          >
            <button
              className="w-full text-left flex justify-between items-center text-white text-lg font-medium"
              onClick={() => toggleFAQ(index)}
            >
              <span>{item.question}</span>
              <span
                className={`text-2xl transform transition-transform ${
                  activeIndex === index ? "rotate-45" : ""
                }`}
              >
                +
              </span>
            </button>

            {activeIndex === index && (
              <div className="mt-4 text-gray-400 text-sm leading-relaxed">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;