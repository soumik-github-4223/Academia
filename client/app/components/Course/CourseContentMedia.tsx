import CoursePlayer from "@/app/admin/utils/CoursePlayer";
import { styles } from "@/app/styles/style";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  AiFillStar,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineStar,
} from "react-icons/ai";
import defaultAvatar from "../.../../../../public/assets/avatar.png";
import toast from "react-hot-toast";
import {
  useAddAnswerToQuestionMutation,
  useAddNewQuestionMutation,
} from "@/redux/features/courses/courseApi";
import { BiMessage } from "react-icons/bi";

type Props = {
  data: any;
  id: string;
  activeVideo: number;
  setActiveVideo: (activeVideo: number) => void;
  user: any;
  refetch: any;
};

const CourseContentMedia = ({
  data,
  id,
  activeVideo,
  setActiveVideo,
  user,
  refetch,
}: Props) => {
  const [activeBar, setactiveBar] = useState(0);

  const [question, setQuestion] = useState("");
  const [
    addNewQuestion,
    { isSuccess, error, isLoading: questionCreationLoading },
  ] = useAddNewQuestionMutation();

  const [review, setReview] = useState("");
  const isReviewExists = data?.reviews?.find(
    (item: any) => item.user_id === user._id
  );
  const [rating, setRating] = useState(0);

  const [answer, setAnswer] = useState("");
  const [questionId, setquestionId] = useState("");

  const handleQuestion = () => {
    if (question.length === 0) {
      toast.error("Please write a question");
    } else {
      addNewQuestion({
        question,
        courseId: id,
        contentId: data[activeVideo]._id,
      });
    }
  };

  const [addAnswerToQuestion, { isSuccess: isAnswerSuccess, error: answerError }] = useAddAnswerToQuestionMutation();
  const handleAnswerSubmit = (e: any) => {
    addAnswerToQuestion({answer, courseId: id, contentId: data[activeVideo]._id, questionId});
    
  };

  useEffect(() => {
    if (isSuccess) {
      setQuestion("");
      refetch();
      toast.success("Question added");
    }

    if(isAnswerSuccess){
      setAnswer("");
      refetch();
      toast.success("Answer added");
    }
    if(answerError){
      if ("data" in answerError) {
        const errorMessage = answerError as any;
        toast.error(errorMessage.data.message);
      }
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [isSuccess, error, refetch, isAnswerSuccess, answerError]);

  return (
    <div className="w-[95%] md:w-[86%] py-4 m-auto">
      <CoursePlayer
        title={data[activeVideo]?.title}
        videoUrl={data[activeVideo]?.videoUrl}
      />
      <div className="w-full flex items-center justify-between my-3">
        <div
          className={`${styles.button} !w-[unset] [min-h-[40px] py-[unset]] ${
            activeVideo === 0 && "cursor-no-drop opacity-[.8]"
          }`}
          onClick={() =>
            setActiveVideo(activeVideo === 0 ? 0 : activeVideo - 1)
          }
        >
          <AiOutlineArrowLeft className="mr-2" />
          Prev Lesson
        </div>

        <div
          className={`${styles.button} !w-[unset] min-h-[40px] py-[unset] ${
            data.length - 1 === activeVideo && "!cursor-no-drop opacity-[.8]"
          }`}
          onClick={() =>
            setActiveVideo(
              data && data.length - 1 === activeVideo
                ? activeVideo
                : activeVideo + 1
            )
          }
        >
          Next Lesson
          <AiOutlineArrowRight className="ml-2" />
        </div>
      </div>

      <div className="w-full p-4 flex items-center justify-between bg-slate-900 bg-opacity-20 backdrop-blur rounded shadow-inner">
        {["Overview", "Resources", "Q&A", "Reviews"].map((text, index) => (
          <h5
            key={index}
            className={`@200px:text-[20px] cursor-pointer ${
              activeBar === index && "text-red-500"
            }`}
            onClick={() => setactiveBar(index)}
          >
            {text}
          </h5>
        ))}
      </div>
      <br />
      {activeBar === 0 && (
        <p className="text-[18px] whitespace-pre-line mb-3">
          {data[activeVideo]?.description}
        </p>
      )}
      {activeBar === 1 && (
        <div>
          {data[activeVideo]?.links.map((item: any, index: number) => (
            <div className="mb-5" key={index}>
              <h2 className="md:text-[20px] md:inline-block text-white">
                {item.title && item.title + " "}
              </h2>
              <a
                className="inline-block text-[#4395c4] md:text-[20px] md:pl-2"
                href={item.url}
              >
                {item.url}
              </a>
            </div>
          ))}
        </div>
      )}
      {activeBar === 2 && (
        <>
          <div className="flex w-full">
            <Image
              src={user.avatar ? user.avatar.url : defaultAvatar}
              width={50}
              height={50}
              alt=""
              className="w-[50px] h-[50px] rounded-full object-cover"
            />
            <textarea
              name=""
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              id=""
              cols={40}
              rows={5}
              placeholder="Write your question..."
              className="outline-none bg-transparent ml-3 border border-[#ffffff57] md:w-full p-2 rounded w-[90%] md:text-[18px] font-[Poppins]"
            ></textarea>
          </div>
          <div className="w-full flex justify-end">
            <div
              className={`${
                styles.button
              } !w-[120px] !h-[40px] text-[18px] mt-5 ${
                questionCreationLoading && "cursor-not-allowed"
              }`}
              onClick={questionCreationLoading ? () => {} : handleQuestion}
            >
              Submit
            </div>
          </div>
          <br />
          <br />
          <div className="w-full h-[1px] bg-[#ffffff3b]"></div>
          <div>
            <CommentReply
              data={data}
              activeVideo={activeVideo}
              answer={answer}
              setAnswer={setAnswer}
              handleAnswerSubmit={handleAnswerSubmit}
              user={user}
              setquestionId={setquestionId}
            />
          </div>
        </>
      )}

      {activeBar === 3 && (
        <div className="w-full">
          {!isReviewExists && (
            <>
              <div className="flex w-full">
                <Image
                  src={user.avatar ? user.avatar.url : defaultAvatar}
                  width={50}
                  height={50}
                  alt=""
                  className="w-[50px] h-[50px] rounded-full object-cover"
                />
                <div className="w-full">
                  <h5 className="pl-3 text-[20px] font-[500] dark:text-white text-black">
                    Give a Rating <span className="text-red-500">*</span>
                  </h5>
                  <div className="flex w-full ml-2 pb-3">
                    {[1, 2, 3, 4, 5].map((i) =>
                      rating >= i ? (
                        <AiFillStar
                          key={i}
                          className="mr-1 cursor-pointer"
                          color="rgb(246,186,0)"
                          size={25}
                          onClick={() => setRating(i)}
                        />
                      ) : (
                        <AiOutlineStar
                          key={i}
                          className="mr-1 cursor-pointer"
                          color="rgb(246,186,0)"
                          size={25}
                          onClick={() => setRating(i)}
                        />
                      )
                    )}
                  </div>
                  <textarea
                    name=""
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    id=""
                    cols={40}
                    rows={5}
                    placeholder="Write your comment..."
                    className="outline-none bg-transparent md:ml-3 border border-[#ffffff57] w-[95%] md:w-full p-2 rounded text-[18px] font-[Poppins]"
                  ></textarea>
                </div>
              </div>
              <div className="w-full flex justify-end">
                <div
                  className={`${styles.button} !w-[120px] !h-[40px] text-[18px] mt-5 md:mr-0 mr-2`}
                >
                  Submit
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

const CommentReply = ({
  data,
  activeVideo,
  answer,
  setAnswer,
  handleAnswerSubmit,
  user,
  setquestionId,
}: any) => {
  return (
    <div className="w-full my-3">
      {data[activeVideo].questions.map((item: any, index: any) => (
        <CommentItem
          key={index}
          data={data}
          activeVideo={activeVideo}
          item={item}
          index={index}
          answer={answer}
          setAnswer={setAnswer}
          setquestionId={setquestionId}
          handleAnswerSubmit={handleAnswerSubmit}
        />
      ))}
    </div>
  );
};

const CommentItem = ({
  data,
  setquestionId,
  item,
  answer,
  setAnswer,
  handleAnswerSubmit,
}: any) => {
  const [replyActive, setreplyActive] = useState(false);

  return (
    <div className="my-4">
      <div className="flex mb-2">
        <Image
          src={item.user.avatar ? item.user.avatar.url : defaultAvatar}
          width={50}
          height={50}
          alt=""
          className="w-[50px] h-[50px] rounded-full object-cover"
        />
        <div className="pl-3">
          <h5 className="text-[20px]">{item?.user.name}</h5>
          <p>{item?.question}</p>
          <small className="text-[#ffffff83]">
            {item.createdAt ? new Date(item.createdAt).toLocaleString() : ""}
          </small>
        </div>
      </div>

      <div className="w-full flex">
        <span
          className="md:pl-16 text-[#ffffff83] cursor-pointer mr-2"
          onClick={() => {
            setreplyActive(!replyActive);
            setquestionId(item._id);
          }}
        >
          {replyActive
            ? "Hide Replies"
            : item.questionReplies.length !== 0
            ? "All Replies"
            : "Add Reply"}
        </span>
        <BiMessage
          size={20}
          className="dark:text-[#ffffff83] cursor-pointer text-[#0000008B]"
        />
        <span className="pl-1 mt-[-4px] cursor-pointer text-[#ffffff83]">
          {item.questionReplies.length}
        </span>
      </div>

      {replyActive && (
        <div className="mt-4">
          {item.questionReplies.map((reply: any) => (
            <div
              className="w-full flex ml-10 800px:ml-20 my-5 text-black dark:text-white"
              key={reply.id}
            >
              <Image
              src={reply.user.avatar ? reply.user.avatar.url : defaultAvatar}
              width={50}
              height={50}
              alt=""
              className="w-[50px] h-[50px] rounded-full object-cover"
              />
              <div className="pl-2">
              <h5 className="text-[20px]">{reply.user.name}</h5>
              <p>{reply.answer}</p>
              <small className="text-[#ffffff83]">
                {reply.createdAt
                ? new Date(reply.createdAt).toLocaleString()
                : ""}
              </small>
              </div>
            </div>
          ))}

          <div className="flex items-start mt-4">
            <Image
              src={item.user.avatar ? item.user.avatar.url : defaultAvatar}
              width={50}
              height={50}
              alt=""
              className="w-[50px] h-[50px] rounded-full object-cover"
            />
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Write your reply..."
              className="border-b border-[#ffffff57] bg-transparent ml-3 md:w-full p-2 w-[90%] md:text-[18px] font-[Poppins] focus:outline-none"
            />
          </div>
          <div className="w-full flex justify-end mt-2">
            <span
              className="text-[#4395c4] cursor-pointer text-[18px]"
              onClick={handleAnswerSubmit}
            >
              Submit
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseContentMedia;
