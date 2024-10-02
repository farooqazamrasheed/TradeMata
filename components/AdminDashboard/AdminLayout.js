import Link from "next/link";
import { useRouter } from "next/router";
import { useState,useEffect } from "react";
import NotificationCard from "./NotificationCard";
import { FaUser, FaTruck, FaEnvelope, FaBloggerB } from "react-icons/fa";
import { CgGirl } from "react-icons/cg";
import { PiDotFill } from "react-icons/pi";
import { IoIosCloseCircle } from "react-icons/io";
import { TiThMenu } from "react-icons/ti";
import { IoMdArrowDropdown, IoMdArrowDropright } from "react-icons/io";
import { FaReadme } from "react-icons/fa";
import { BiCategory } from "react-icons/bi";
import { FaDiscourse } from "react-icons/fa";

const AdminLayout = ({ children }) => {
  const router = useRouter();
 
  const [NotificationDropdownOpen, setNotificationDropdownOpen] =
    useState(false);
  const [AccountDropdown, setAccountDropdown] = useState(false);
  const [isUserLoggedIn, setisUserLoggedIn] = useState(true);
  const [isAdmin, setisAdmin] = useState(true);
  const [blogDropdownOpen, setBlogDropdownOpen] = useState(false);
  const [introDropdownOpen, setintroDropdownOpen] = useState(false);
  const [courseDropdownOpen, setcourseDropdownOpen] = useState(false);
  const [showSideNav, setShowSideNav] = useState(false); // State to control side navbar visibility

  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  useEffect(() => {
    // Close the menu when the route changes
    setShowSideNav(false);
  }, [router.asPath]);
  const toggleSideNav = () => {
    setShowSideNav(!showSideNav);
  };
  const handleBlogDropdown = () => {
    setBlogDropdownOpen(!blogDropdownOpen);
  };
  const handleintroDropdown = () => {
    setintroDropdownOpen(!introDropdownOpen);
  };
  const handlecourseDropdown = () => {
    setcourseDropdownOpen(!courseDropdownOpen);
  };
  const handleCategoryDropdown = () => {
    setCategoryDropdownOpen(!categoryDropdownOpen);
  };
  const handleNotifaction = () => {
    setNotificationDropdownOpen(!NotificationDropdownOpen);
  };
  const handleUserDropdown = () => {
    setUserDropdownOpen(!userDropdownOpen);
  };
  const handleNavigateToordertatus = (status) => {
    router.push(`/adminDashboard/${status}`);
  };
  const handelAccountDropdown = () => {
    setAccountDropdown(!AccountDropdown);
  };
  const [notifactionItems, setNotifactionItems] = useState([1, 2]);
  const [notifications, setNotifications] = useState([
    {
      userImage: "https://placekitten.com/40/40", // Placeholder kitten image
      text: "New message from John Doe.",
    },
    {
      userImage: "https://placekitten.com/41/41", // Another placeholder kitten image
      text: "You have a new follower: Jane Smith.",
    },
  ]); // Array of notifications

  const handleNotification = () => {
    // Handle notification logic and update notifications state
  };
  return (
    <div className="flex">
      <nav
        className={`${
          showSideNav ? "md:flex" : "hidden" // Use the showSideNav state to control visibility
        } custom-scrollbar w-full md:w-64 bg-gray-800 md:flex text-white overflow-y-scroll`}
        style={{ height: "100vh" }}
      >
        <style>
          {`
        /* Custom scrollbar styles */
        .custom-scrollbar::-webkit-scrollbar {
          width: 10px;
          border-radius: 50px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: #1f2937; /* Track background color */
        }
       
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #1f2937; /* Scrollbar thumb color */
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          border-radius: 50px;
          background: #555; /* Scrollbar thumb color on hover */
        }
      `}
        </style>
        <ul className="flex flex-col flex-1">
          <li className={`px-4 py-6 `}>
            <div className="flex p-2 justify-between">
              <div className="flex">
                <CgGirl className="mr-2  text-3xl" />{" "}
                <h1 className="font-bold mt-1">Trading</h1>
              </div>
              <div
              className="md:hidden"
                onClick={(e) => {
                  toggleSideNav(); // Function to show/hide the dropdown
                }}
              >
                <IoIosCloseCircle  className="font-bold text-2xl mt-1"/>
              </div>
            </div>
          </li>
          <div className="mt-4">
            <li className={`px-4 py-1`}>
              <div
                onClick={(e) => {
                  e.preventDefault();
                  handlecourseDropdown(); // Function to show/hide the dropdown
                }}
                className={`flex items-center justify-between p-2 rounded-md hover:bg-amber-400 ${
                  router.pathname === "" ? "bg-amber-500" : ""
                }`}
              >
                <div className="flex">
                  <FaReadme  className="mr-2 mt-1" />{" "}
                  <h1 className="font-bold">Courses</h1>
                </div>
                <div>
                  {!courseDropdownOpen && (
                    <IoMdArrowDropright className="mr-2 mt-1" />
                  )}
                  {courseDropdownOpen && (
                    <IoMdArrowDropdown className="mr-2 mt-1" />
                  )}
                </div>
              </div>
            </li>

            {courseDropdownOpen && (
              <>
                <Link href="/adminDashboard/course/create">
                  <li className={`px-4`}>
                    <div
                      className={`flex p-2 rounded-md hover:bg-amber-400 ${
                        router.pathname === "" ? "bg-amber-500" : ""
                      }`}
                    >
                      <PiDotFill className="mr-2 mt-1" />{" "}
                      <h1 className="font-bold">Create New</h1>
                    </div>
                  </li>
                </Link>
                <Link href="/adminDashboard/course/list">
                  <li className={`px-4`}>
                    <div
                      className={`flex p-2 rounded-md hover:bg-amber-400 ${
                        router.pathname === "" ? "bg-amber-500" : ""
                      }`}
                    >
                      <PiDotFill className="mr-2 mt-1" />{" "}
                      <h1 className="font-bold">List</h1>
                    </div>
                  </li>
                </Link>

              
              </>
            )}
          </div>
          <div >
            <li className={`px-4 py-1`}>
              <div
                onClick={(e) => {
                  e.preventDefault();
                  handleintroDropdown(); // Function to show/hide the dropdown
                }}
                className={`flex items-center justify-between p-2 rounded-md hover:bg-amber-400 ${
                  router.pathname === "" ? "bg-amber-500" : ""
                }`}
              >
                <div className="flex">
                  <FaReadme  className="mr-2 mt-1" />{" "}
                  <h1 className="font-bold">Introduction</h1>
                </div>
                <div>
                  {!introDropdownOpen && (
                    <IoMdArrowDropright className="mr-2 mt-1" />
                  )}
                  {introDropdownOpen && (
                    <IoMdArrowDropdown className="mr-2 mt-1" />
                  )}
                </div>
              </div>
            </li>

            {introDropdownOpen && (
              <>
                <Link href="/adminDashboard/introduction/create">
                  <li className={`px-4`}>
                    <div
                      className={`flex p-2 rounded-md hover:bg-amber-400 ${
                        router.pathname === "" ? "bg-amber-500" : ""
                      }`}
                    >
                      <PiDotFill className="mr-2 mt-1" />{" "}
                      <h1 className="font-bold">Create New</h1>
                    </div>
                  </li>
                </Link>

                <Link href="/adminDashboard/introduction/list">
                  <li className={`px-4`}>
                    <div
                      className={`flex p-2 rounded-md hover:bg-amber-400 ${
                        router.pathname === "" ? "bg-amber-500" : ""
                      }`}
                    >
                      <PiDotFill className="mr-2 mt-1" />{" "}
                      <h1 className="font-bold">List</h1>
                    </div>
                  </li>
                </Link>
              </>
            )}
          </div>
          <div>
            <li className={`px-4 py-1`}>
              <div
                onClick={(e) => {
                  e.preventDefault();
                  handleBlogDropdown(); // Function to show/hide the dropdown
                }}
                className={`flex items-center justify-between p-2 rounded-md hover:bg-amber-400 ${
                  router.pathname === "" ? "bg-amber-500" : ""
                }`}
              >
                <div className="flex">
                  <FaBloggerB className="mr-2 mt-1" />{" "}
                  <h1 className="font-bold">Blog</h1>
                </div>
                <div>
                  {!blogDropdownOpen && (
                    <IoMdArrowDropright className="mr-2 mt-1" />
                  )}
                  {blogDropdownOpen && (
                    <IoMdArrowDropdown className="mr-2 mt-1" />
                  )}
                </div>
              </div>
            </li>

            {blogDropdownOpen && (
              <>
                <Link href="/adminDashboard/blog/create">
                  <li className={`px-4`}>
                    <div
                      className={`flex p-2 rounded-md hover:bg-amber-400 ${
                        router.pathname === "" ? "bg-amber-500" : ""
                      }`}
                    >
                      <PiDotFill className="mr-2 mt-1" />{" "}
                      <h1 className="font-bold">New Post</h1>
                    </div>
                  </li>
                </Link>

                <Link href="/adminDashboard/blog/list">
                  <li className={`px-4`}>
                    <div
                      className={`flex p-2 rounded-md hover:bg-amber-400 ${
                        router.pathname === "" ? "bg-amber-500" : ""
                      }`}
                    >
                      <PiDotFill className="mr-2 mt-1" />{" "}
                      <h1 className="font-bold">Blog List</h1>
                    </div>
                  </li>
                </Link>
              </>
            )}
          </div>

          <div>
            <li className={`px-4 py-1`}>
              <div
                onClick={(e) => {
                  e.preventDefault();
                  handleUserDropdown(); // Function to show/hide the dropdown
                }}
                className={`flex items-center justify-between p-2 rounded-md hover:bg-amber-400 ${
                  router.pathname === "" ? "bg-amber-500" : ""
                }`}
              >
                <div className="flex">
                  <FaUser className="mr-2 mt-1" />{" "}
                  <h1 className="font-bold">User</h1>
                </div>
                <div>
                  {!userDropdownOpen && (
                    <IoMdArrowDropright className="mr-2 mt-1" />
                  )}
                  {userDropdownOpen && (
                    <IoMdArrowDropdown className="mr-2 mt-1" />
                  )}
                </div>
              </div>
            </li>

            {userDropdownOpen && (
              <>
                <Link href="/adminDashboard/user/list">
                  <li className={`px-4`}>
                    <div
                      className={`flex p-2 rounded-md hover:bg-amber-400 ${
                        router.pathname === "" ? "bg-amber-500" : ""
                      }`}
                    >
                      <PiDotFill className="mr-2 mt-1" />{" "}
                      <h1 className="font-bold">User List</h1>
                    </div>
                  </li>
                </Link>
              </>
            )}
          </div>
          <Link href="/adminDashboard/message/list">
            <li className={`px-4 py-1`}>
              <div
                className={`flex items-center justify-between p-2 rounded-md hover:bg-amber-400 ${
                  router.pathname === "" ? "bg-amber-500" : ""
                }`}
              >
                <div className="flex">
                  <FaEnvelope className="mr-2 mt-1" />{" "}
                  <h1 className="font-bold">Message</h1>
                </div>
              </div>
            </li>
          </Link>
          <Link href="/adminDashboard/enrolled/list">
            <li className={`px-4 py-1`}>
              <div
                className={`flex items-center justify-between p-2 rounded-md hover:bg-amber-400 ${
                  router.pathname === "" ? "bg-amber-500" : ""
                }`}
              >
                
                <div className="flex">
                  <FaDiscourse className="mr-2 mt-1" />{" "}
                  <h1 className="font-bold">EnrolledCourse</h1>
                </div>
              </div>
            </li>
          </Link>
          <Link href="/adminDashboard/user/users" className="hidden">
            <li
              className={`p-4 hover:bg-amber-400 ${
                router.pathname === "/adminDashboard/user/users"
                  ? "bg-amber-500"
                  : ""
              }`}
            >
              <div className="flex">
                <FaUser className="mr-2 mt-1" />{" "}
                <h1 className="font-bold">Users</h1>
              </div>
            </li>
          </Link>

          <Link href="/adminDashboard/shipMethod/methods" className="hidden">
            <li
              className={`p-4 hover:bg-amber-400 ${
                router.pathname === "/adminDashboard/shipMethod/methods"
                  ? "bg-amber-500"
                  : ""
              }`}
            >
              <div className="flex">
                <FaTruck className="mr-2 mt-1" />{" "}
                <h1 className="font-bold"> Shipping Method</h1>
              </div>
            </li>
          </Link>
          <Link href="/adminDashboard/message/message" className="hidden">
            <li
              className={`p-4 hover:bg-amber-400 ${
                router.pathname === "/adminDashboard/message//message"
                  ? "bg-amber-500"
                  : ""
              }`}
            >
              <div className="flex">
                <FaEnvelope className="mr-2 mt-1" />{" "}
                <h1 className="font-bold">Message</h1>
              </div>
            </li>
          </Link>
          
        </ul>
      </nav>

      <main className="flex-1 overflow-y-scroll" style={{ height: "100vh" }}>
        {/* Header */}
        <nav
          className={`${
            showSideNav ? "hidden" : "flex" // Use the showSideNav state to control visibility
          } h-16 px-2 bg-gray-800 text-white md:flex items-center justify-between md:justify-end`}
        >
          <span className=" flex md:hidden font-bold text-lg cursor-pointer">
            <TiThMenu className="font-bold" onClick={toggleSideNav} />
          </span>

          <div className=" flex  space-x-5  ">
            
            <span
              className=" md:flex  hover:text-gray-400"
              onMouseEnter={() => {
                handelAccountDropdown(true);
              }}
              onMouseLeave={() => {
                handelAccountDropdown(false);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 hover:text-gray-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {AccountDropdown && (
                <div
                  className={`absolute right-1 mt-4 px-6 py-2 bg-white rounded-lg shadow-lg`}
                  style={{ zIndex: 50 }}
                >
                  <ul className="py-2">
                    {isUserLoggedIn ? (
                      // If user is logged in, show "Profile" and "Orders" (or "Admin Dashboard" if admin)
                      <>
                        <Link href="/profile">
                          <li className=" px-4 py-2 hover:bg-gray-100">
                            My Account
                          </li>
                        </Link>
                        {isAdmin ? (
                          <Link href="/">
                            <li className="px-4 py-2 hover:bg-gray-100">
                             View as user
                            </li>
                          </Link>
                        ) : (
                          <Link href="/orders">
                            <li className="px-4 py-2 hover:bg-gray-100">
                              Orders
                            </li>
                          </Link>
                        )}
                        <Link href="/">
                          <li className="px-4 py-2 hover:bg-gray-100">
                            Logout
                          </li>
                        </Link>
                      </>
                    ) : (
                      // If user is not logged in, show "Sign In" and "Register"
                      <>
                        <li className="px-4 py-2 hover:bg-gray-100">
                          <Link href="/signin">Sign In</Link>
                        </li>
                        <li className="px-4 py-2 hover:bg-gray-100">
                          <Link href="/signup">Register</Link>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              )}
            </span>
          </div>
        </nav>
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
