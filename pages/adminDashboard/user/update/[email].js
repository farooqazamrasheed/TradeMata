import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AdminLayout from "../../../../components/AdminDashboard/AdminLayout";
import styles from "@/styles/Color.module.css";
function UserProfile({ token }) {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [UserId, setUserId] = useState(null);
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const router = useRouter();
  const { email } = router.query;
  const [loading, setLoading] = useState(false);
 

  useEffect(() => {
   

    const fetchCourseDetails = async (email) => {
      try {
        const res = await fetch(`/api/user/get-user?email=${email}`);
        const data = await res.json();

        setName(data.name);
        setAddress(data.address);
        setPhone(data.phone);
        setUserId(data._id);
        setRole(data.role)
      } catch (error) {
        console.error(error);
      }
    };

    fetchCourseDetails(email);
  }, [router]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const data = {};

    name && (data.name = name);
    address && (data.address = address);
    phone && (data.phone = phone);
    email && (data.email = email);
    role && (data.role = role);

    try {
      const res = await fetch(`/api/user/update-user?id=${UserId}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      toast.success("Your Profile Update successfully", {
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
    } catch (error) {
      toast.error(error, {
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
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };
  return (
    <AdminLayout>
    <div className={`flex justify-center bg-gray-100 items-center min-h-screen `}>
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
      <div className="bg-gray-300  relative max-w-lg w-full p-6 rounded-lg shadow-lg my-24 mx-2 ">
        <div className="flex justify-center items-center py-8">
          <div className="flex-shrink-0 h-30 w-30">
            <img
              className="h-30 w-30 rounded-full"
              src="https://www.gravatar.com/avatar/11111111111111111111111111111111?d=mp&f=y"
              alt=""
            />
          </div>
        </div>
        <form onSubmit={handleSubmit}>
        <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="name"
            >
              Role
            </label>
            <select
              value={role}
              onChange={handleRoleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          
            >
              
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder=""
              value={name}
              onChange={handleNameChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="address"
            >
              Address
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="address"
              type="text"
              placeholder=""
              value={address}
              onChange={handleAddressChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="phone"
            >
              Phone
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="phone"
              type="text"
              placeholder=""
              value={phone}
              onChange={handlePhoneChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder=""
              value={email}
              onChange={handleEmailChange}
              disabled // email cannot be changed
            />
          </div>

          <button
            type="submit"
            className="group relative flex mt-8 w-full justify-center rounded-md bg-blue-600 py-2  text-sm font-semibold text-white hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            disabled={loading} // Disable the button when loading state is true
          >
            <span className="absolute left-0 inset-y-0  flex items-center pl-3">
              {loading && (
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
              )}
            </span>
            {loading ? "Loading..." : "Update Profile"}
          </button>
        </form>
        
      </div>
    </div>   </AdminLayout>
  );
}

export default UserProfile;
