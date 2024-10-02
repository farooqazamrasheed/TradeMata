import { useState } from "react";
import "node_modules/react-quill/dist/quill.snow.css";
import React from "react";
import dynamic from "next/dynamic";
const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});
import "react-quill/dist/quill.snow.css";
import AdminLayout from "../../../components/AdminDashboard/AdminLayout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-tagsinput/react-tagsinput.css"; // Import the styles
// Import the withAdminRoute HOC
import withAdminRoute from '../Auth/withAdminAuth';

function CourseForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);


    try {
        const res = await fetch("/api/introduction/create", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: name,
              description: description,
            }),
          });
      console.log(res);
      if (res.ok) {
        const data = await res.json();
        setName("");
        setDescription("");
        toast.success("Add successfully", {
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
        // Handle non-successful response (e.g., show an error message)
        toast.error("Failed to add. Please try again.", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
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
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ font: [] }],
      [{ size: ["small", false, "large", "huge"] }],
      ["bold", "italic", "underline", "strike", "blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image", "video"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ direction: "rtl" }],
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
          <h1 className="text-3xl font-bold mb-4">Create New Introduction</h1>{" "}
          {/* Add this line */}
          <form onSubmit={handleSubmit} >
            <div className="bg-white p-4 my-2 rounded-lg shadow-sm flex flex-col md:flex-row">
              {/* Left Side (Heading) */}
              <div className="mb-4 md:w-1/3 md:mb-0">
                <h2 className="text-xl font-semibold">SubMenu Name</h2>
              </div>
              {/* Right Side (Inputs) */}
              <div className="md:w-2/3 md:ml-4">
                <div className="mb-4">
                  <label
                    htmlFor="title"
                    className="block text-gray-700 font-medium mb-1"
                  >
                    Menu Link Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border rounded px-3 py-2 w-full"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white p-4 my-4 rounded-lg shadow-sm flex flex-col md:flex-row">
              {/* Left Side (Heading) */}
              <div className="mb-4 md:w-1/3 md:mb-0">
                <h2 className="text-xl font-semibold">Content</h2>
              </div>
              {/* Right Side (Inputs) */}
              <div className="md:w-2/3 md:ml-4">
                <QuillNoSSRWrapper
                  modules={modules}
                  required
                  value={description}
                  onChange={(content, delta, source, editor) => {
                    setDescription(editor.getHTML());
                  }}
                  theme="snow"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647zm7-2.647l3 2.647C19.865 17.824 21 15.042 21 12h-4a7.96 7.96 0 01-2 5.291zM14 4.515V0h-4v4.515A8.003 8.003 0 0112 4c1.657 0 3 1.343 3 3h-2c0-.552-.448-1-1-1s-1 .448-1 1h-2c0-1.657 1.343-3 3-3a3.96 3.96 0 012.586 1H14z"
                    ></path>
                  </svg>
                ) : (
                  "Post"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}

const AdminProtectedCourseForm = withAdminRoute(CourseForm);
export default AdminProtectedCourseForm;
