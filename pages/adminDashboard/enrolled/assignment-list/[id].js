import React, { useState, useEffect } from "react";
import AdminLayout from "../../../../components/AdminDashboard/AdminLayout";
import Link from "next/link";
import { MdDelete } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { FaDownload } from "react-icons/fa";

import withAdminRoute from "../../Auth/withAdminAuth";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConfirmationModal from "../../../../components/DeleteConfirmation";
const CardList = () => {
  const router = useRouter();
  const id = router.query.id;
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  const handleDelete = (Id) => {
    setSelectedChapter(Id);
    setShowConfirmation(true);
  };

  const handleConfirmDelete = async () => {
   
  };

  const handleCancelDelete = () => {
    setSelectedChapter(null);
    setShowConfirmation(false);
  };

  const fetchData = async () => {
    // Fetch course data including chapters
    try {
      const Response = await fetch(`/api/enroll/get-enroll?enroll_id=${id}`);
      const Data = await Response.json();

      setAssignments(Data.assignments);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching  data:", error.message);
    }
  };
  useEffect(() => {
    fetchData();
  }, [router.query, id]);
 
  const handleDownload = async (url) => {
    const link = document.createElement("a");
    link.href = url;
    const fileName = url.substring(url.lastIndexOf("/") + 1);
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
   
  };
  const handleMarksUpload = async (index) => {
    const assignmentId = assignments[index]._id;
    const marks = assignments[index].marks;

    // Send API request to upload marks
    try {
      const response = await fetch(`/api/assignment/upload-marks?assignmentId=${ assignmentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          assignmentId,
          marks,
        }),
      });

      if (response.ok) {
        // Marks uploaded successfully
        toast.success("Marks uploaded successfully");
      } else {
        // Failed to upload marks
        toast.error("Failed to upload marks");
      }
    } catch (error) {
      console.error("Error uploading marks:", error);
      toast.error("Error uploading marks");
    }
  };
  const handleMarksChange = (index, event) => {
    const updatedAssignments = [...assignments];
    updatedAssignments[index].marks = event.target.value;
    setAssignments(updatedAssignments);
  };
  return (
    <AdminLayout>
      <div className="w-full px-2 py-2 md:py-12">
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
        <div className="flex items-center justify-between mb-6 border p-1">
          <h2 className="text-2xl font-bold text-gray-800">
            Assignment List
          </h2>
          <div className="text-black font-bold text-lg ">Enroll ID: {id}</div>
        </div>
        {loading && (
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
        {assignments?.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full  bg-white border  border-gray-400 divide-y shadow-sm rounded-md ">
              <thead className="bg-gray-100 text-md border-b font-bold border-gray-400">
                <tr>
                  <th className="px-6 py-3 text-left   text-black uppercas">
                    #
                  </th>
                  <th className="px-6 py-3 text-left   text-black uppercas">
                    Assignment Title
                  </th>
                  <th className="px-6 py-3 text-left   text-black uppercas">
                    Chapter Title
                  </th>
                  <th className="px-6 py-3 text-left   text-black uppercas">
                    Marks(%)
                  </th>
                  <th className="px-6 py-3 text-left   text-black uppercas">
                    Download
                  </th>
                  <th className="px-6 py-3 text-left   text-black uppercas">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {assignments.map((assignment, index) => (
                  <tr
                    key={assignment._id}
                    className={index % 2 === 0 ? "bg-gray-100" : ""}
                  >
                    <td className="px-6 py-4 ">{index + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {assignment.assignment_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {assignment.chapter_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="number"
                        value={assignment.marks}
                        onChange={(event) => handleMarksChange(index, event)}
                        className="w-20 px-2 py-1 border border-gray-400 rounded-md"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex text-center ">
                       
                          <button  onClick={()=>handleDownload(assignment.file)} className="text-blue-500 text-lg mr-5">
                           <FaDownload />

                          </button>
                        
                       
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex text-center ">
                        <button
                          onClick={() => handleMarksUpload(index)}
                          className="bg-blue-500 px-2 rounded-full text-lg mr-5"
                        >
                          Upload Marks
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>{" "}
          </div>
        ) : (  !loading && <div className="flex justify-center">Data not found</div>
        )}
         {showConfirmation && (
          <ConfirmationModal
            onCancel={handleCancelDelete}
            onConfirm={handleConfirmDelete}
            text="Are you sure you want to delete this Course?"
          />
        )}
      </div>
    </AdminLayout>
  );
};

const AdminProtectedCourseForm = withAdminRoute(CardList);
export default AdminProtectedCourseForm;
