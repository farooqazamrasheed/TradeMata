import React from "react";
import { useState, useEffect } from "react";
import AdminLayout from "../../../components/AdminDashboard/AdminLayout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import withAdminRoute from '../Auth/withAdminAuth';
function message({isUserLoggedIn ,isAdmin}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState("all"); // default filter value
  const [filteredContacts, setFilteredContacts] = useState([]);

  

  useEffect(() => {
    const fetchContacts = async () => {
      const response = await fetch("/api/message/get-messege");
      const data = await response.json();
      setContacts(data);
    };
    fetchContacts();
  }, []);

  // filter contacts based on selected option
  useEffect(() => {
    const filterContacts = () => {
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      const lastMonth = new Date(today);
      lastMonth.setMonth(lastMonth.getMonth() - 1);

      if (filter === "today") {
        const filteredContacts = contacts.filter((contact) => {
          const contactDate = new Date(contact.createdAt);
          return (
            contactDate.getFullYear() === today.getFullYear() &&
            contactDate.getMonth() === today.getMonth() &&
            contactDate.getDate() === today.getDate()
          );
        });
        setFilteredContacts(filteredContacts);
      } else if (filter === "yesterday") {
        const filteredContacts = contacts.filter((contact) => {
          const contactDate = new Date(contact.createdAt);
          return (
            contactDate.getFullYear() === yesterday.getFullYear() &&
            contactDate.getMonth() === yesterday.getMonth() &&
            contactDate.getDate() === yesterday.getDate()
          );
        });
        setFilteredContacts(filteredContacts);
      } else if (filter === "lastMonth") {
        const filteredContacts = contacts.filter((contact) => {
          const contactDate = new Date(contact.createdAt);
          return contactDate >= lastMonth && contactDate <= today;
        });
        setFilteredContacts(filteredContacts);
      } else {
        setFilteredContacts(contacts);
      }
    };
    filterContacts();
  }, [contacts, filter]);

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/message/delete-message?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        toast.warn("Message delete successfully!", {
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
        setContacts((prev) => prev.filter((c) => c._id !== id));
      } else {
        toast.error(res.statusText, {
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
  return (
    <AdminLayout>
      <div className="h-full bg-gray-100 relative">
        <div className="container mx-auto py-24 px-2 bg-gray-100 relative h-full">
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
          <div className="flex justify-between items-center mb-6 relative">
            <h2 className="text-xl font-bold"> Messages</h2>
            <div>
              <label htmlFor="filter" className="mr-2">
                Filter by:
              </label>
              <select
                id="filter"
                className="border border-gray-400 rounded p-2 relative"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="today">Today</option>
                <option value="yesterday">Yesterday</option>
                <option value="lastMonth">Last Month</option>
                <option value="all">All</option>
              </select>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="bg-white relative table-auto border-collapse w-full">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Name</th>
                  <th className="border px-4 py-2">Email</th>
                  <th className="border px-4 py-2">Phone</th>
                  <th className="border px-4 py-2">Country</th>
                  <th className="border px-4 py-2">Subject</th>
                  <th className="border px-4 py-2">Message</th>
                  <th className="border px-4 py-2">Date</th>
                  <th className="border px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredContacts.map((contact) => (
                  <tr key={contact._id}>
                    <td className="border px-4 py-2">{contact.name}</td>
                    <td className="border px-4 py-2">{contact.email}</td>
                    <td className="border px-4 py-2">{contact.phone}</td>
                    <td className="border px-4 py-2">{contact.country}</td>
                    <td className="border px-4 py-2">{contact.subject}</td>
                    <td className="border px-4 py-2">{contact.message}</td>
                    <td className="border px-4 py-2">
                      {new Date(contact.createdAt).toLocaleDateString()}
                    </td>
                    <td className="border px-4 py-2">
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => handleDelete(contact._id)}
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
                        "Delete"
                      )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
const AdminProtectedCourseForm = withAdminRoute(message);
export default AdminProtectedCourseForm;

