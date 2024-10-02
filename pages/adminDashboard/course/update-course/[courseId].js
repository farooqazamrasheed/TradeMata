import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import React from "react";
import { MdDelete } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import Select from "react-select";
import Link from "next/link";
import dynamic from "next/dynamic";
const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});
import ConfirmationModal from "../../../../components/DeleteConfirmation";
import { IoClose } from "react-icons/io5";
import "react-quill/dist/quill.snow.css";
import AdminLayout from "../../../../components/AdminDashboard/AdminLayout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import youtubeVideoId from "youtube-video-id";
function ProductForm() {
  const router = useRouter();
  const courseId = router.query.courseId;

  const [chapters, setChapters] = useState([]);
  const addChapterButtonText =
    chapters.length === 0 ? "Add First Chapter" : "Add More Chapter";

  console.log("ch", chapters);
  const [Image, setImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("basicInfo");

  const [chapterNumber, setChapterNumber] = useState("");
  const [chapterTitle, setChapterTitle] = useState("");
  const [videoTitle, setVideoTitle] = useState("");

  const [sTitle, setSTitle] = useState("");
  const [summaryContent, setSummaryContent] = useState("");
  const [assignmentTitle, setAssignmentTitle] = useState("");
  const [assignmentContent, setAssignmentContent] = useState("");

  const [show, setShow] = useState(false);
  const [showCard, setShowCard] = useState(false);
  console.log(courseId);
  const [videoUrl, setVideoUrl] = useState("");
  const [videoId, setVideoId] = useState("");
  const [selectedOptions, setSelectedOptions] = useState({
    showVideo: true,
    showSummary: true,
    showAssignment: true,
  });
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const handleDelete = (Id) => {
    setSelectedChapter(Id);
    setShowConfirmation(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const res = await fetch(
        `/api/course/delete-chapter?courseId=${courseId}&chapterId=${selectedChapter}`,
        {
          method: "DELETE",
        }
      );

      if (res.ok) {
        setChapters((prevChapters) =>
          prevChapters.filter((chapter) => chapter._id !== selectedChapter)
        );

        toast.success("Chapter deleted successfully", {
          // ...toast options
        });
        // Fetch updated course data
      } else {
        throw new Error("Failed to delete chapter");
      }
    } catch (error) {
      toast.error(error.message, {
        // ...toast options
      });
    } finally {
      setSelectedChapter(null);
      setShowConfirmation(false);
    }
  };

  const handleCancelDelete = () => {
    setSelectedChapter(null);
    setShowConfirmation(false);
  };
  const fetchData = async () => {
    // Fetch course data including chapters
    try {
      const courseResponse = await fetch(
        `/api/course/get-by-id?id=${courseId}`
      );
      const courseData = await courseResponse.json();

      // Set the chapters in the state
      setChapters(courseData.course.chapters || []);
    } catch (error) {
      console.error("Error fetching course data:", error.message);
    }
  };
  useEffect(() => {
    fetchData();
  }, [courseId]); // Fetch data whenever courseId changes

  const handleOptionChange = (option) => {
    // Check if the selected option is the only one selected
    const isOnlyOption =
      Object.values(selectedOptions).filter(Boolean).length === 1;

    // If unchecking the last option, prevent the change
    if (selectedOptions[option] && isOnlyOption) {
      return;
    }

    // Toggle the selected state for the clicked option
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [option]: !prevOptions[option],
    }));

    // Reset the corresponding state and update visibility
    switch (option) {
      case "showVideo":
        if (!selectedOptions.showVideo) {
          handleRemoveVid();
        }
        break;
      case "showSummary":
        if (!selectedOptions.showSummary) {
          handleRemoveSum();
        }
        break;
      case "showAssignment":
        if (!selectedOptions.showAssignment) {
          handleRemoveAsm();
        }
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    // Extract video ID from the entered URL
    const extractVideoId = (url) => {
      const id = youtubeVideoId(url);
      return id ? id : null;
    };

    // Set the video ID when a valid URL is entered
    const id = extractVideoId(videoUrl);
    setVideoId(id);
  }, [videoUrl]);

  const handleAddChapter = () => {
    setShow(true);
  };
  const resetChapterFields = () => {
    setChapterNumber("");
    setChapterTitle("");
    setVideoTitle("");
    setVideoUrl("");

    setSTitle("");
    setSummaryContent("");
    setAssignmentTitle("");
    setAssignmentContent("");
  };

  const handleRemoveSum = () => {
    setSTitle("");
    setSummaryContent("");
  };
  const handleRemoveVid = () => {
    setVideoTitle("");
    setVideoUrl("");
  };
  const handleRemoveAsm = () => {
    setAssignmentTitle("");
    setAssignmentContent("");
  };
  const handleRemoveChapter = () => {
    // Reset chapter fields
    resetChapterFields();
    // Hide the chapter card
    setShow(false);
  };
  const handleSubmitChapter = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`/api/course/add-chapter?id=${courseId}`, {
        method: "POST",
        body: JSON.stringify({
          chapterNumber,
          videoTitle,
          chapterTitle,
          videoUrl,
          sTitle,
          summaryContent,
          assignmentTitle,
          assignmentContent,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        // Notify success
        toast.success("Chapter added successfully", {
          // ...toast options
        });
        fetchData();
        // Reset chapter form fields
        setChapterNumber("");
        setChapterTitle("");
        setVideoUrl("");
        setSTitle("");
        setSummaryContent("");
        setAssignmentTitle("");
        setAssignmentContent("");
        setShow(false);
        setLoading(false); // Optionally, close the chapter card
      } else {
        setLoading(false);
        throw new Error("Failed to add chapter");
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.message, {
        // ...toast options
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    console.log(Image);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("file", Image[0]);
    console.log(...formData);
    try {
      const res = await fetch(
        `/api/course/update-course?courseId=${courseId}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (res.ok) {
        // Notify success
        toast.success("Update Course Successfully", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        throw new Error("Failed to update course");
      }

      setLoading(false);
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setLoading(false);
    }
  };

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { header: "3" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesResponse = await fetch("/api/category/get");
        const categoriesData = await categoriesResponse.json();
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching categories data:", error.message);
      }
    };

    fetchData();
  }, []);

  const handleImageSelect = (e) => {
    const file = e.target.files[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage([file]); // Using an array to match the previous structure
      setSelectedImage(imageUrl);
    }
  };

  const fetchDataOfCourse = async () => {
    // Fetch course data including chapters
    try {
      const courseResponse = await fetch(
        `/api/course/get-by-id?id=${courseId}`
      );
      const courseData = await courseResponse.json();

      setSelectedImage(courseData.course.feature_img);
      setTitle(courseData.course.title);
      setDescription(courseData.course.description);
    } catch (error) {
      console.error("Error fetching course data:", error.message);
    }
  };
  useEffect(() => {
    fetchDataOfCourse();
  }, [router.query, courseId]);

  return (
    <AdminLayout>
      <div className="h-full bg-gray-100 relative">
        <div className="container mx-auto px-4 relative bg-gray-100 py-24">
          <ToastContainer
            position="top-right"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <div className="flex  mx-2  text-gray-500 uppercase ">
            <div
              className={`cursor-pointer ${
                activeTab === "basicInfo"
                  ? "text-blue-500 border-b-4 border-blue-500"
                  : ""
              }`}
              onClick={() => setActiveTab("basicInfo")}
            >
              Basic Info
            </div>
            <div
              className={`cursor-pointer mx-6 ${
                activeTab === "Chapters" && courseId
                  ? "text-blue-500 border-b-4 border-blue-500"
                  : "text-gray-400 cursor-not-allowed"
              }`}
            >
              <button
                onClick={() => setActiveTab("Chapters")}
                disabled={!courseId}
              >
                Chapters
              </button>
            </div>
          </div>{" "}
          <hr className=" border-t border-gray-500 mb-4" />
          {activeTab === "basicInfo" ? (
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              {title ? (
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/2 p-4">
                    <div className="border h-80 border-gray-300 rounded-lg mb-4">
                      {selectedImage && (
                        <img
                          src={selectedImage}
                          alt="Selected Image"
                          className="w-full h-full object-contain"
                        />
                      )}
                      {!selectedImage ? (
                        <div className="w-full h-full bg-gray-300"></div>
                      ) : null}
                    </div>
                    <div className="flex">
                      <div className="w-full p-2">
                        <input
                          type="file"
                          required
                          accept="image/*"
                          onChange={handleImageSelect}
                          name="image" // Ensure the name attribute is set to "image"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="md:w-1/2 p-4">
                    <div className="mb-2">
                      <label
                        className="block text-gray-700 font-bold mb-2"
                        htmlFor="description"
                      >
                        Title
                      </label>
                      <input
                        type="text"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Title"
                        className="w-full mb-4 p-2 border border-gray-300 rounded"
                      />
                    </div>
                    <div className="mb-2">
                      <label
                        className="block text-gray-700 font-bold mb-2"
                        htmlFor="description"
                      >
                        Description
                      </label>
                      <input
                        type="text"
                        value={description}
                        required
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Short Description"
                        className="w-full mb-4 p-2 border border-gray-300 rounded"
                      />
                    </div>

                    <div className="flex justify-end">
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        disabled={loading}
                      >
                        {loading ? (
                          <svg
                            aria-hidden="true"
                            class="w-6 h-6 text-gray-400 animate-spin dark:text-gray-600 fill-white"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                              fill="currentColor"
                            />
                            <path
                              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                              fill="currentFill"
                            />
                          </svg>
                        ) : (
                          "Update Course"
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className=" flex justify-center">
                  <svg
                    aria-hidden="true"
                    class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                </div>
              )}
            </form>
          ) : (
            <div>
              {/* Display the list of uploaded chapters in a table */}
              {chapters.length > 0 && (
                <div className="overflow-x-auto ">
                <table className="table-fixed w-full justify-center text-center border-collapse border border-green-800">
                  <thead>
                    <tr>
                      <th className="border border-black p-2">
                        Chapter Number
                      </th>
                      <th className="border border-black p-2">Chapter Title</th>
                      <th className="border border-black p-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {chapters.map((chapter) => (
                      <tr key={chapter._id}>
                        <td className="border border-black p-2">
                          {chapter.chapter_number}
                        </td>
                        <td className="border border-black p-2">
                          {chapter.title}
                        </td>
                        <td className="border border-black p-2">
                          <Link
                            href={`/adminDashboard/course/update/[courseId]/[chapterId]`}
                            as={`/adminDashboard/course/update/${courseId}/${chapter._id}`}
                          >
                            {" "}
                            <button className="text-blue-500 text-lg ">
                              <BiEdit></BiEdit>
                            </button>
                          </Link>
                          <span className="mx-2">|</span>
                          <button
                            className="text-red-500 text-lg"
                            onClick={() => handleDelete(chapter._id)}
                          >
                            <MdDelete />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table></div>
              )}
              <div className="flex justify-center my-2 rounded-sm">
                <button
                  onClick={handleAddChapter}
                  className="bg-blue-500 rounded-lg text-white p-2"
                >
                  {addChapterButtonText}
                </button>
              </div>

              {/* Chapter Card */}
              {show && (
                <div className=" bg-gray-200">
                  <div className="flex justify-between text-center">
                    {" "}
                    <span
                      className=" w-5/6 p-4 text-lg font-bold flex content-center text-center justify-between "
                      onClick={() => setShowCard(!showCard)}
                    >
                      CourseID: {courseId}
                      {showCard ? (
                        <IoChevronUp className="mt-2" />
                      ) : (
                        <IoChevronDown className="mt-2" />
                      )}
                    </span>
                    <span
                      onClick={handleRemoveChapter}
                      className=" w-1/6 bg-red-500 font-bold text-center  text-lg p-4"
                    >
                      <button>Cancel</button>
                    </span>
                  </div>
                  {showCard ? (
                    <>
                      <form
                        onSubmit={handleSubmitChapter}
                        encType="multipart/form-data"
                      >
                        <div className="flex">
                          <div className="border p-4 mt-4 w-5/6">
                            <div className="mb-4">
                              <label className="block text-sm font-bold mb-2">
                                Chapter Number
                              </label>
                              <input
                                type="NUMBER"
                                placeholder="Chapter Number"
                                className="w-full p-2 border"
                                value={chapterNumber}
                                onChange={(e) =>
                                  setChapterNumber(e.target.value)
                                }
                              />
                            </div>

                            <div className="mb-4">
                              <label className="block text-sm font-bold mb-2">
                                Chapter Title
                              </label>
                              <input
                                type="text"
                                placeholder="Chapter Title"
                                className="w-full p-2 border"
                                value={chapterTitle}
                                onChange={(e) =>
                                  setChapterTitle(e.target.value)
                                }
                              />
                            </div>

                            {/* Additional content for each option (Video, Summary, Assignment) */}
                            {selectedOptions.showVideo && (
                              <div className="mb-4 p-2 shadow-lg shadow-black">
                                {/* Display added video information */}
                                {videoId && (
                                  <div className="flex items-center mb-2">
                                    <iframe
                                      width="100%"
                                      height="100%"
                                      src={`https://www.youtube.com/embed/${videoId}`}
                                      allowFullScreen
                                      title="Embedded YouTube Video"
                                    ></iframe>
                                  </div>
                                )}
                                <label
                                  className="block text-gray-700 font-bold mb-2"
                                  htmlFor="description"
                                >
                                  Video Title
                                </label>
                                <input
                                  type="text"
                                  value={videoTitle}
                                  onChange={(e) =>
                                    setVideoTitle(e.target.value)
                                  }
                                  placeholder="Title"
                                  className="w-full mb-4 p-2 border border-gray-300 rounded"
                                />
                                <label className="block text-sm font-bold mb-2">
                                  Video URL
                                </label>
                                <input
                                  type="text"
                                  placeholder="Video URL"
                                  value={videoUrl}
                                  onChange={(e) => setVideoUrl(e.target.value)}
                                  className="w-full p-2 border"
                                />
                              </div>
                            )}

                            {selectedOptions.showSummary && (
                              <div className="mb-4  p-2 shadow-lg shadow-black">
                                <label className="block text-sm font-bold mb-2">
                                  Summary Title
                                </label>
                                <input
                                  type="text"
                                  placeholder="Summary Title"
                                  value={sTitle}
                                  onChange={(e) => setSTitle(e.target.value)}
                                  className="w-full p-2 border"
                                />
                                <label className="block text-sm font-bold mb-2">
                                  Summary Details
                                </label>
                                <QuillNoSSRWrapper
                                  modules={modules}
                                  required
                                  className="bg-white"
                                  value={summaryContent}
                                  onChange={(
                                    content,
                                    delta,
                                    source,
                                    editor
                                  ) => {
                                    setSummaryContent(editor.getHTML());
                                  }}
                                  theme="snow"
                                />
                              </div>
                            )}

                            {selectedOptions.showAssignment && (
                              <div className="mb-4  p-2 shadow-lg shadow-black">
                                <label className="block text-sm font-bold mb-2">
                                  Assignment Title
                                </label>
                                <input
                                  type="text"
                                  placeholder="Summary Title"
                                  value={assignmentTitle}
                                  onChange={(e) =>
                                    setAssignmentTitle(e.target.value)
                                  }
                                  className="w-full p-2 border"
                                />
                                <label className="block text-sm font-bold mb-2">
                                  Assignment Details
                                </label>
                                <QuillNoSSRWrapper
                                  modules={modules}
                                  required
                                  className="bg-white"
                                  value={assignmentContent}
                                  onChange={(
                                    content,
                                    delta,
                                    source,
                                    editor
                                  ) => {
                                    setAssignmentContent(editor.getHTML());
                                  }}
                                  theme="snow"
                                />
                              </div>
                            )}
                            <div className="flex justify-end py-4">
                              <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                disabled={loading}
                              >
                                {loading ? (
                                  <svg
                                    aria-hidden="true"
                                    class="w-6 h-6 text-gray-400 animate-spin dark:text-gray-600 fill-white"
                                    viewBox="0 0 100 101"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                      fill="currentColor"
                                    />
                                    <path
                                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                      fill="currentFill"
                                    />
                                  </svg>
                                ) : (
                                  "Add Chapter"
                                )}
                              </button>
                            </div>
                          </div>

                          <div className="flex flex-col  mb-4 w-1/6  pt-12 ">
                            <div className="border border-black px-2 py-8 mr-2 shadow-black shadow-sm">
                              <div>
                                <span className="text-red-500">NOTE: </span>
                                <span>
                                  It is necessary to choose at least one option.
                                </span>
                              </div>
                              <div className="flex">
                                <input
                                  type="checkbox"
                                  checked={selectedOptions.showVideo}
                                  onChange={() =>
                                    handleOptionChange("showVideo")
                                  }
                                  className="mr-2"
                                />
                                <label className="mr-4">Video</label>
                              </div>
                              <div className="flex">
                                <input
                                  type="checkbox"
                                  checked={selectedOptions.showSummary}
                                  onChange={() =>
                                    handleOptionChange("showSummary")
                                  }
                                  className="mr-2"
                                />
                                <label className="mr-4">Summary/outline</label>
                              </div>
                              <div className="flex">
                                <input
                                  type="checkbox"
                                  checked={selectedOptions.showAssignment}
                                  onChange={() =>
                                    handleOptionChange("showAssignment")
                                  }
                                  className="mr-2"
                                />
                                <label>Assignment</label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </form>
                    </>
                  ) : null}
                </div>
              )}
            </div>
          )}
           {showConfirmation && (
          <ConfirmationModal
            onCancel={handleCancelDelete}
            onConfirm={handleConfirmDelete}
            text="Are you sure you want to delete this Course?"
          />
        )}
        </div>
      </div>
    </AdminLayout>
  );
}

export default ProductForm;
