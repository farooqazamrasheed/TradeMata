import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import React from "react";
import { MdDelete } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import Select from "react-select";
import dynamic from "next/dynamic";
const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});
import { IoClose } from "react-icons/io5";
import "react-quill/dist/quill.snow.css";
import AdminLayout from "../../../../../components/AdminDashboard/AdminLayout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import youtubeVideoId from "youtube-video-id";

function ChapterUpdateForm() {
  const router = useRouter();
  const { courseId, chapterId } = router.query;

  const [chapterNumber, setChapterNumber] = useState("");
  const [chapterTitle, setChapterTitle] = useState("");
  const [videoTitle, setVideoTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [videoId, setVideoId] = useState("");

  const [sTitle, setSTitle] = useState("");
  const [summaryContent, setSummaryContent] = useState("");
  const [assignmentTitle, setAssignmentTitle] = useState("");
  const [assignmentContent, setAssignmentContent] = useState("");

  const [selectedOptions, setSelectedOptions] = useState({
    showVideo: false,
    showSummary: false,
    showAssignment: false,
  });
  const [loading, setLoading] = useState(false);
  
  const handleUpdateChapter = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(
        `/api/course/update-chapter?courseId=${courseId}&chapterId=${chapterId}`,
        {
          method: "PUT",
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
        }
      );

      if (res.ok) {
        // Notify success
        toast.success("Chapter update successfully", {
          // ...toast options
        });

        setLoading(false); // Optionally, close the chapter card
      } else {
        setLoading(false);
        throw new Error("Failed to update chapter");
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.message, {
        // ...toast options
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `/api/course/get-chapter?courseId=${courseId}&chapterId=${chapterId}`
        );
        const data = await response.json();

        setChapterNumber(data.chapter_number);
        setChapterTitle(data.title);
        if (data.videos && data.videos.length > 0) {
          setVideoTitle(data.videos[0].title);
          setVideoUrl(data.videos[0].video_url);
        }

        if (data.summary && data.summary.length > 0) {
          setSTitle(data.summary[0].title);
          setSummaryContent(data.summary[0].content);
        }
        if (data.assignments && data.assignments.length > 0) {
          setAssignmentTitle(data.assignments[0].title);
          setAssignmentContent(data.assignments[0].content);
        }

        // Check/uncheck options based on existing chapter data
        setSelectedOptions({
          showVideo: data.videos && data.videos.length > 0,
          showSummary: data.summary && data.summary.length > 0,
          showAssignment: data.assignments && data.assignments.length > 0,
        });
      } catch (error) {
        console.error("Error fetching chapter data:", error);
      }
    };

    fetchData();
  }, [courseId, chapterId]);

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
  const [selectedImage, setSelectedImage] = useState(null);

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

          <div className=" bg-gray-200">
            <>
              {chapterNumber ? (
                <form
                  onSubmit={handleUpdateChapter}
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
                          onChange={(e) => setChapterNumber(e.target.value)}
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
                          onChange={(e) => setChapterTitle(e.target.value)}
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
                            onChange={(e) => setVideoTitle(e.target.value)}
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
                            onChange={(content, delta, source, editor) => {
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
                            onChange={(e) => setAssignmentTitle(e.target.value)}
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
                            onChange={(content, delta, source, editor) => {
                              setAssignmentContent(editor.getHTML());
                            }}
                            theme="snow"
                          />
                        </div>
                      )}
                      <div className="flex justify-end py-4">
                        <button
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                          onSubmit={handleUpdateChapter}
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
                            "update Chapter"
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
                            onChange={() => handleOptionChange("showVideo")}
                            className="mr-2"
                          />
                          <label className="mr-4">Video</label>
                        </div>
                        <div className="flex">
                          <input
                            type="checkbox"
                            checked={selectedOptions.showSummary}
                            onChange={() => handleOptionChange("showSummary")}
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
            </>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default ChapterUpdateForm;
