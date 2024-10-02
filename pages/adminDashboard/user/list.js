import { useState, useEffect } from "react";
import AdminLayout from "../../../components/AdminDashboard/AdminLayout";
import { useRouter } from "next/router";
import { BiEdit } from "react-icons/bi";
import { BsArrowRight } from "react-icons/bs";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import withAdminRoute from "../Auth/withAdminAuth";

function UserTable({ isUserLoggedIn, isAdmin }) {
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState("details");

  useEffect(() => {
    fetch("/api/user/get-users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <AdminLayout>
      <div className="flex flex-col bg-gray-100  relative min-h-screen">
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
        <div className="flex items-center justify-between mb-6 pt-12 uppercase p-1">
          <h2 className="text-2xl font-bold text-gray-800">User Management</h2>
        </div>
        <div className="flex  mx-2  text-gray-500 uppercase "></div>
        <hr className=" border-t border-gray-500 mb-4" />
        <div className="-my-2  overflow-x-auto">
          <div className="py-2 align-middle inline-block min-w-full sm:px-2 lg:px-2">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Role
                    </th>

                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Edit
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Profile View
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img
                              className="h-10 w-10 rounded-full"
                              src="https://www.gravatar.com/avatar/11111111111111111111111111111111?d=mp&f=y"
                              alt=""
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {user.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {user.email}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{user.role}</div>
                      </td>

                      <td className="px-6 py-4 cursor-pointer whitespace-nowrap text-lg font-medium text-blue-500">
                        <Link
                          href={`/adminDashboard/user/update/[email]`}
                          as={`/adminDashboard/user/update/${user.email}`}
                        >
                          {" "}
                          <BiEdit />
                        </Link>
                      </td>

                      <td className="px-6 cursor-pointer py-4 whitespace-nowrap text-lg font-medium text-blue-500">
                        <Link
                          href={`/adminDashboard/user/[email]`}
                          as={`/adminDashboard/user/${user.email}`}
                        >
                          <BsArrowRight />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
const AdminProtectedCourseForm = withAdminRoute(UserTable);
export default AdminProtectedCourseForm;
