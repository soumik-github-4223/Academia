import toast from "react-hot-toast";
import { styles } from "../../../../styles/style";
import React, { FC, useState } from "react";
import { AiOutlineDelete, AiOutlinePlusCircle } from "react-icons/ai";
import { BiLink, BiSolidPencil } from "react-icons/bi";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
type Props = {
    // Defines the types for the component props
    active: number;
    setActive: (active: number) => void;
    courseContentData: any;
    setCourseContentData: (courseContentData: any) => void;
    handleSubmit: any;
};

const CourseContent: FC<Props> = ({
    // Destructures props
    courseContentData,
    setCourseContentData,
    active,
    setActive,
    handleSubmit: handleCourseSubmit,
}) => {
    // Tracks whether sections are collapsed or not
    const [isCollapsed, setIsCollapsed] = useState(
        Array(courseContentData.length).fill(false)
    );

    // Tracks new or existing section count
    const [activeSection, setActiveSection] = useState(1);

    // Handles the overall submission of the form
    const handleSubmit = (e: any) => {
        e.preventDefault();
    };

    // Toggles a particular section's collapse state
    const handleCollapseToggle = (index: number) => {
        const updatedCollapsed = [...isCollapsed];
        updatedCollapsed[index] = !updatedCollapsed[index];
        setIsCollapsed(updatedCollapsed);
    };

    // Removes a link from the links array at a specified index
    const handleRemoveLink = (index: number, linkIndex: number) => {
        const updatedData = [...courseContentData];
        updatedData[index].links.splice(linkIndex, 1);
        setCourseContentData(updatedData);
    };

    // Adds a blank link object to a specific content item
    const handleAddLink = (index: number) => {
        const updatedData = [...courseContentData];
        updatedData[index].links.push({ title: "", url: "" });
        setCourseContentData(updatedData);
    };

    // Creates new video content under the current or last used section if fields are valid
    const newContentHandler = (item: any) => {
        if (
            item.title === "" ||
            item.description === "" ||
            item.videoUrl === "" ||
            item.links[0].title === "" ||
            item.links[0].url === ""
        ) {
            toast.error("Please fill all the fields first!");
        } else {
            let newVideoSection = "";

            if (courseContentData.length > 0) {
                const lastVideoSection =
                    courseContentData[courseContentData.length - 1].videoSection;
                // Uses the last video section if available
                if (lastVideoSection) {
                    newVideoSection = lastVideoSection;
                }
            }

            const newContent = {
                videoUrl: "",
                title: "",
                description: "",
                videoSection: newVideoSection,
                links: [{ title: "", url: "" }],
            };

            setCourseContentData([...courseContentData, newContent]);
        }
    };

    // Adds a new named section if fields are valid
    const addNewSection = () => {
        if (
            courseContentData[courseContentData.length - 1].title === "" ||
            courseContentData[courseContentData.length - 1].description === "" ||
            courseContentData[courseContentData.length - 1].videoUrl === "" ||
            courseContentData[courseContentData.length - 1].links[0].title === "" ||
            courseContentData[courseContentData.length - 1].links[0].url === ""
        ) {
            toast.error("Please fill all the fields first!");
        } else {
            setActiveSection(activeSection + 1);
            const newContent = {
                videoUrl: "",
                title: "",
                description: "",
                videoSection: `Untitled Section ${activeSection}`,
                links: [{ title: "", url: "" }],
            };
            setCourseContentData([...courseContentData, newContent]);
        }
    };

    // Navigates to the previous step
    const prevButton = () => {
        setActive(active - 1);
    };

    // Validates final fields and then moves to the next step
    const handleOptions = () => {
        if (
            courseContentData[courseContentData.length - 1].title !== "" &&
            courseContentData[courseContentData.length - 1].description !== "" &&
            courseContentData[courseContentData.length - 1].videoUrl !== "" &&
            courseContentData[courseContentData.length - 1].links[0].title !== "" &&
            courseContentData[courseContentData.length - 1].links[0].url !== ""
        ) {
            setActive(active + 1);
            handleCourseSubmit();
        } else {
            toast.error("Please fill all the fields first!");
        }
    };

  return (
    <div className="w-[80%] m-auto mt-24 p-3">
      <form onSubmit={handleSubmit}>
        {courseContentData?.map((item: any, index: number) => {
          const showSectionInput =
            index == 0 ||
            item.videoSection !== courseContentData[index - 1].videoSection;

          return (
            <>
              <div
                className={`w-full bg-[#cdc8c817] p-4 ${
                  showSectionInput ? "mt-10" : "mb-0"
                }`}
              >
                {showSectionInput && (
                  <>
                    <div className="flex w-full items-center">
                      <input
                        type="text"
                        className={`text-[20px] ${
                          item.videoSection === "Untitled Section"
                            ? "w-[170px]"
                            : "w-min"
                        } font-Poppins cursor-pointer text-white bg-transparent outline-none`}
                        value={item.videoSection}
                        onChange={(e) => {
                          const updatedData = [...courseContentData];
                          updatedData[index].videoSection = e.target.value;
                          setCourseContentData(updatedData);
                        }}
                      />
                      <BiSolidPencil className="cursor-pointer text-white" />
                    </div>
                    <br />
                  </>
                )}

                <div className="flex w-full items-center justify-between my-0">
                  {isCollapsed[index] ? (
                    <>
                      {item.title && (
                        <p className="font-Poppins text-white">
                          {index + 1}. {item.title}
                        </p>
                      )}
                    </>
                  ) : (
                    <div></div>
                  )}

                  {/* Arrow button for collapsed video content */}
                  <div className="flex items-center">
                    <AiOutlineDelete
                      className={`text-white text-[20px] mr-2 ${
                        index > 0 ? "cursor-pointer" : "cursor-no-drop"
                      }`}
                      onClick={() => {
                        if (index > 0) {
                          const updatedData = [...courseContentData];
                          updatedData.splice(index, 1);
                          setCourseContentData(updatedData);
                        }
                      }}
                    />
                    <MdOutlineKeyboardArrowDown
                      fontSize="large"
                      className="text-white"
                      style={{
                        transform: isCollapsed[index]
                          ? "rotate(180deg)"
                          : "rotate(0deg)",
                      }}
                      onClick={() => handleCollapseToggle(index)}
                    />
                  </div>
                </div>
                {!isCollapsed[index] && (
                  <>
                    <div className="my-3">
                      <label className={styles.label}>Video Title</label>
                      <input
                        type="text"
                        placeholder="Project Plan..."
                        className={`${styles.input}`}
                        value={item.title}
                        onChange={(e) => {
                          const updatedData = [...courseContentData];
                          updatedData[index].title = e.target.value;
                          setCourseContentData(updatedData);
                        }}
                      />
                    </div>

                    <div className="mb-3">
                      <label className={styles.label}>Video Url</label>
                      <input
                        type="text"
                        placeholder="sdder"
                        className={`${styles.input}`}
                        value={item.videoUrl}
                        onChange={(e) => {
                          const updatedData = [...courseContentData];
                          updatedData[index].videoUrl = e.target.value;
                          setCourseContentData(updatedData);
                        }}
                      />
                    </div>

                    <div className="mb-3">
                      <label className={styles.label}>Video Description</label>
                      <textarea
                        rows={8}
                        cols={30}
                        placeholder="sdder"
                        className={`${styles.input} h-min py-2`}
                        value={item.description}
                        onChange={(e) => {
                          const updatedData = [...courseContentData];
                          updatedData[index].description = e.target.value;
                          setCourseContentData(updatedData);
                        }}
                      />

                      <br />
                    </div>
                    {item?.links.map((link: any, linkIndex: number) => (
                      <div className="mb-3 block" key={linkIndex}>
                        <div className="w-full flex items-center justify-between">
                          <label className={styles.label}>
                            Link {linkIndex + 1}
                          </label>
                          <AiOutlineDelete
                            className={`${
                              linkIndex === 0
                                ? "cursor-no-drop"
                                : "cursor-pointer"
                            } text-black dark:text-white text-[20px]`}
                            onClick={() =>
                              linkIndex === 0
                                ? null
                                : handleRemoveLink(index, linkIndex)
                            }
                          />
                        </div>
                        <input
                          type="text"
                          placeholder="Source Code... (Link title)"
                          className={`${styles.input}`}
                          value={link.title}
                          onChange={(e) => {
                            const updatedData = [...courseContentData];
                            updatedData[index].links[linkIndex].title =
                              e.target.value;
                            setCourseContentData(updatedData);
                          }}
                        />

                        <input
                          type="url"
                          placeholder="Source Code Url... (Link URL)"
                          className={`${styles.input} mt-6`}
                          value={link.url}
                          onChange={(e) => {
                            const updatedData = [...courseContentData];
                            updatedData[index].links[linkIndex].url =
                              e.target.value;
                            setCourseContentData(updatedData);
                          }}
                        />
                      </div>
                    ))}
                    <br />
                    {/* add link button */}
                    <div className="inline-block mb-4">
                      <p
                        className="flex items-center text-[18px] dark:text-white text-black cursor-pointer"
                        onClick={() => handleAddLink(index)}
                      >
                        <BiLink className="mr-2" /> Add Link
                      </p>
                    </div>
                  </>
                )}
                <br />
                {/* add new content */}
                {index === courseContentData.length - 1 && (
                  <div>
                    <p
                      className="flex items-center text-[18px] dark:text-white text-black cursor-pointer"
                      onClick={(e: any) => newContentHandler(item)}
                    >
                      <AiOutlinePlusCircle className="mr-2" /> Add New Content
                    </p>
                  </div>
                )}
              </div>
            </>
          );
        })}

        <br />
        <div
          className="flex items-center text-[20px] text-white cursor-pointer"
          onClick={() => addNewSection()}
        >
          <AiOutlinePlusCircle className="mr-2" /> Add New Section
        </div>
      </form>
      <br />
      
      <div className="w-full flex items-center justify-between">
        <div
          className="w-full md:w-[180px] flex items-center justify-center h-[40px] bg-[#373a39] text-center text-[#fff] rounded mt-8 cursor-pointer hover:bg-[#505453]"
          onClick={() => prevButton()}
        >
          Prev
        </div>
        <div
          className="w-full md:w-[180px] flex items-center justify-center h-[40px] bg-[#1d8a65] text-center text-[#fff] rounded mt-8 cursor-pointer hover:bg-[#28a380]"
          onClick={() => handleOptions()}
        >
          Next
        </div>
      </div>
      <br />
      <br />
    </div>
  );
};

export default CourseContent;

//Logics: While creating new section, we add an object with empty value to the array, and admin can update it.
