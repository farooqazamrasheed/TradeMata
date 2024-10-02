import React from "react";
import AdminLayout from "../../../components/AdminDashboard/AdminLayout";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import ConfirmationModal from "../../../components/DeleteConfirmation";
const UserProfilePage = () => {
  const [user, setUser] = useState(null);

  const router = useRouter();
  const { email } = router.query;
  const [selectedUser, setSelectedUser] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleDelete = (Id) => {
    setSelectedUser(Id);
    setShowConfirmation(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await fetch(`/api/user/delete-user?id=${selectedUser}`, {
        method: "DELETE",
      });

      if (response.ok) {
        router.back();
      } else {
        console.error("Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    } finally {
      setSelectedUser(null);
      setShowConfirmation(false);
    }
  };

  const handleCancelDelete = () => {
    setSelectedUser(null);
    setShowConfirmation(false);
  };
  useEffect(() => {
    const fetchCourseDetails = async (email) => {
      try {
        const res = await fetch(`/api/user/get-user?email=${email}`);
        const data = await res.json();

        setUser(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCourseDetails(email);
  }, [router, email]);

  return (
    <AdminLayout>
      <div className="h-full bg-gray-100 relative">
        <div className="container mx-auto px-4 relative bg-gray-100 py-24">
          <div className="flex items-center mb-4">
            <div className="w-16 h-16 rounded-full overflow-hidden">
              {/* User Image */}
              <img
                className="h-30 w-30 rounded-full"
                src="https://www.gravatar.com/avatar/11111111111111111111111111111111?d=mp&f=y"
                alt=""
              />
            </div>

            <div className="ml-4">
              {/* User Email */}
              <div className="text-lg font-semibold">{email}</div>

              {/* User ID */}
              <div className="text-gray-600">User ID: {user?._id}</div>
            </div>

            <button className="bg-blue-500 text-white px-4 py-2 rounded-md ml-auto">
              <Link
                href={`/adminDashboard/user/update/[email]`}
                as={`/adminDashboard/user/update/${email}`}
              >
                {" "}
                Edit
              </Link>
            </button>
          </div>

          {/* Horizontal line above "Details" and "Logs" */}
          <hr className=" border-t border-gray-500" />
          {user && (
            <>
              <div className="flex flex-col md:flex-row gap-4 pt-8">
                {/* Left Box: Basic Details */}
                <div className="bg-white p-4 rounded-lg shadow-md w-full md:w-1/3">
                  <div className="text-xl font-semibold mb-4">
                    Basic Details
                  </div>
                  <div className="mb-2">
                    <div className="font-medium">Email: </div>
                    <div>{user.email}</div>
                  </div>
                  <div className="mb-2">
                    <div className="font-medium">Phone: </div>
                    <div>{user.phone}</div>
                  </div>
                  <div className="mb-2">
                    <div className="font-medium">Address: </div>
                    <div>{user.address}</div>
                  </div>
                  <div className="mb-2">
                    <div className="font-medium">Role: </div>
                    <div>{user.role}</div>
                  </div>
                </div>

                {/* Middle Box: Emails and Data Management */}
                <div className=" w-full md:w-2/3">
                  {/* Data Management Section */}
                  <div className="bg-white p-4 rounded-lg shadow-md mt-4">
                    <div className="text-xl font-semibold mb-2">
                      Data Management
                    </div>
                    <div className="text-gray-600">
                      Remove this customer’s chart if he requested that, if not,
                      please be aware that what has been deleted can never be
                      brought back
                    </div>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-md mt-4"
                    >
                      Delete User
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        {showConfirmation && (
          <ConfirmationModal
            onCancel={handleCancelDelete}
            onConfirm={handleConfirmDelete}
            text="Are you sure you want to delete this User?"
          />
        )}
      </div>
    </AdminLayout>
  );
};

export default UserProfilePage;
