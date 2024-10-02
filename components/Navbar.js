import React from "react";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/Color.module.css";
import { TiThMenu } from "react-icons/ti";
import BlogCard from "./BlogCard";
import {
  IoMdArrowDropdown,
  IoMdClose,
  IoMdArrowDropright,
} from "react-icons/io";
import { setUserLoggedOut } from "../redux/userSlice";
import store from "../redux/store";
const NavbarFour = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const isAdmin = useSelector((state) => state.user.isAdmin);
  const staticMenuItems = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Start Learning",
      href: "#",
      sublinks: [{ name: "Courses", href: "/courses" }],
    },
    {
      name: "Market",
      href: "#",
      sublinks: [
        {
          name: "Risk Calculator",
          href: "/calculator",
        },
        { name: "Market Overview Widget", href: "/market/market-overview" },
        { name: "Economic Calendar Widget", href: "/market/economic-calendar" },
        { name: "Ticker Widget", href: "/market/ticker" },
        { name: "Symbol Overview Widget", href: "/market/symbol-overview" },
        { name: "Forex Cross Rates Widget", href: "/market/forex-cross-rates" },
      ],
    },
    {
      name: "Community",
      href: "/chat",
    },
    {
      name: "Blog",
      href: "/blog",
    },
    {
      name: "News",
      href: "/news",
    },

    {
      name: "Contact",
      href: "/contact",
    },
  ];
  const [menuItems, setMenuItems] = useState(staticMenuItems);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState({});
  const [AccountDropdown, setAccountDropdown] = useState(false);
  const router = useRouter();
  const [showDropdownForSearch, setShowDropdownForSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchIconClicked, setSearchIconClicked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const handleSearchIconClick = () => {
    setShowDropdownForSearch(!showDropdownForSearch);
    setSearchIconClicked(!searchIconClicked);
  };
  useEffect(() => {
    let timeoutId; // Store the timeout ID
    setLoading(true);
    const fetchSearchResults = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/blog/search?search=${searchQuery}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const { blogs } = data;
        console.log("Search results:", blogs);
        setSearchResults(blogs);
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setLoading(false);
      }
    };

    if (searchIconClicked && searchQuery.trim() !== "") {
      // Clear any existing timeout before starting a new one
      clearTimeout(timeoutId);

      // Set a new timeout to delay the search
      timeoutId = setTimeout(() => {
        
        fetchSearchResults();
      }, 500); // Adjust delay time (in milliseconds) as needed
    } else {
      setSearchResults([]);
    }

    return () => {
      // Clean up the timeout if the component unmounts before it's finished
      clearTimeout(timeoutId);
    };
    
  }, [searchQuery, searchIconClicked]);

  const handleSearchInput = (e) => {
    setSearchQuery(e.target.value);
  };

  console.log(menuItems);
  const handleLogout = async () => {
    await signOut({ redirect: false, callbackUrl: "/" });
    store.dispatch(setUserLoggedOut());
    // Add any additional logic you need for handling the logout, such as redirecting to the login page.
  };
  const handelAccountDropdown = () => {
    setAccountDropdown(!AccountDropdown);
  };
  const [introductionSublinksFetched, setIntroductionSublinksFetched] =
    useState(false);

  useEffect(() => {
    const fetchIntroductionSublinks = async () => {
      try {
        const response = await fetch("/api/introduction/get-name");
        const data = await response.json();

        // Check if data is valid and non-empty
        if (data && data.length > 0) {
          setMenuItems((prevMenuItems) => {
            const updatedMenuItems = [...prevMenuItems];
            const introductionIndex = updatedMenuItems.findIndex(
              (item) => item.name === "Start Learning"
            );

            if (introductionIndex !== -1) {
              // Merge sublinks, avoid duplicates
              const existingSublinks =
                updatedMenuItems[introductionIndex].sublinks || [];
              const newData = data.filter(
                (newSublink) =>
                  !existingSublinks.some(
                    (existingSublink) =>
                      existingSublink.name === newSublink.name
                  )
              );
              updatedMenuItems[introductionIndex].sublinks = [
                ...existingSublinks,
                ...newData,
              ];
            }

            return updatedMenuItems;
          });
        } else {
          console.warn("Fetched data is empty or invalid.");
        }
        setIntroductionSublinksFetched(true); // Set fetched flag regardless of data validity
      } catch (error) {
        // More specific error handling
        if (error.name === "TypeError") {
          console.error("Network error fetching Introduction sublinks:", error);
        } else {
          console.error(
            "Unexpected error fetching Introduction sublinks:",
            error
          );
        }
      }
    };

    // Fetch only if not already fetched
    if (!introductionSublinksFetched) {
      fetchIntroductionSublinks();
    }
  }, [introductionSublinksFetched]);

  useEffect(() => {
    // Close the menu when the route changes, unless the path is '#'
    if (router.asPath !== "/#") {
      setIsMenuOpen(false);
    }
    setShowDropdownForSearch(false);
  }, [router.asPath]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const [openSubmenu, setOpenSubmenu] = useState(null);

  const handleMenuItemClick = (index) => {
    setOpenSubmenu(openSubmenu === index ? null : index);
  };
  const handleSubMenuToggle = (itemName, isOpen) => {
    setOpenSubmenus((prevOpenSubmenus) => ({
      ...prevOpenSubmenus,
      [itemName]: isOpen,
    }));
  };
  return (
    <div className={`relative text-white w-full ${styles.customcolor}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-2 py-2 sm:px-6 lg:px-2">
        <div className="inline-flex items-center space-x-2">
          <Link href="/">
            {" "}
            <span className={`font-bold p-2 ${styles.gradi}`}>TradeMate</span>
          </Link>
        </div>
        <div className="hidden lg:block ml-12">
          <ul className="ml-12 inline-flex space-x-8 ">
            {menuItems.map((item) => (
              <li key={item.name}>
                <div className="inline-flex items-center">
                  <div
                    className={` text-lg font-semibold text-white `}
                    onMouseEnter={() => handleSubMenuToggle(item.name, true)}
                    onMouseLeave={() => handleSubMenuToggle(item.name, false)}
                  >
                    <Link
                      href={item.name === "Introduction" ? "#" : item.href}
                      className={`inline-flex items-center ${styles.custom}`}
                    >
                      {item.name}

                      {item.sublinks && item.sublinks.length > 0 && (
                        <span>
                          <IoMdArrowDropdown className="ml-2 h-4 w-4" />
                        </span>
                      )}
                    </Link>
                    {item.sublinks && item.sublinks.length > 0 && (
                      <ul
                        className={`${
                          openSubmenus && openSubmenus[item.name]
                            ? "block"
                            : "hidden"
                        } ${
                          styles.customcolor
                        } absolute  z-10  border border-gray-200 divide-y divide-gray-100 rounded-md`}
                      >
                        {item.sublinks.map((sublink) => (
                          <li key={sublink.name}>
                            <Link
                              href={
                                item.name === "Introduction"
                                  ? `/introduction/[slug]`
                                  : sublink.href
                              }
                              as={
                                item.name === "Introduction"
                                  ? `/introduction/${sublink.name}`
                                  : sublink.href
                              }
                              className={`block px-8 py-4 text-sm  ${styles.custom}`}
                            >
                              {sublink.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}{" "}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex grow justify-end">
          <span className="items-center">
            <span
              className="hover:text-gray-200"
              onClick={handleSearchIconClick}
            >
              <input
                className="flex h-10 w-[250px] text-black rounded-md bg-gray-100 px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearchInput}
              />
            </span>

            {/* Conditional rendering of the search results dropdown */}
            {searchQuery && (
              <div
                className={`absolute px-2 pb-8 right-0 border lg:right-4 mt-2 py-2 w-full lg:w-1/2 rounded-md shadow-lg z-50 ${styles.customcolor}`}
              >
                {/* Search Results Logic */}
                {loading ? (
                  <div className="flex justify-center">
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
                ) : searchResults.length > 0 ? (
                  <div style={{ overflowY: "auto" }}>
                    <div className="grid grid-cols-1">
                      {searchResults.map((post) => (
                        <BlogCard key={post.title} post={post} />
                      ))}
                    </div>
                  </div>
                ) : (
                  // Display "No results found" only after loading is done
                  <p>No results found.</p>
                )}
              </div>
            )}
          </span>
        </div>

        <div className="ml-2  hidden lg:block">
          {isLoggedIn ? (
            <span
              className="pt-1 inline-block "
              onMouseEnter={() => {
                handelAccountDropdown(true);
              }}
              onMouseLeave={() => {
                handelAccountDropdown(false);
              }}
            >
              <img
                className="h-10 w-10 rounded-full"
                src="images/user.png"
                alt="Dan_Abromov"
              />
              {AccountDropdown && (
                <div
                  className={`absolute right-1  px-6 py-2  rounded-lg shadow-white  shadow-lg ${styles.customcolor}`}
                  style={{ zIndex: 50 }}
                >
                  <ul className="py-2">
                    <>
                      <Link href="/profile">
                        <li
                          className={`px-4 py-2 hover:bg-gray-100 ${styles.custom1}`}
                        >
                          Profile
                        </li>
                      </Link>
                      {isAdmin && (
                        <Link href="/adminDashboard">
                          <li
                            className={`px-4 py-2 hover:bg-gray-100 ${styles.custom1}`}
                          >
                            Admin Dashboard
                          </li>
                        </Link>
                      )}
                      <div onClick={handleLogout}>
                        <li
                          className={`px-4 py-2 hover:bg-gray-100 ${styles.custom1}`}
                        >
                          Logout
                        </li>
                      </div>
                    </>
                  </ul>
                </div>
              )}
            </span>
          ) : (
            <span className="flex">
              <Link href="/signin" className="mx-2">
                {" "}
                <button
                  type="button"
                  className={`w-full rounded-md px-3 py-2  text-md font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black ${styles.buttoncol}`}
                >
                  Login
                </button>
              </Link>
             
            </span>
          )}
        </div>

        <div className="ml-2 lg:hidden">
          <TiThMenu
            onClick={toggleMenu}
            className="h-6 w-6 cursor-pointer text-white"
          />
        </div>
        {isMenuOpen && (
          <div
            className="lg:hidden text-white"
            onMouseLeave={() => {
              setIsMenuOpen(false);
            }}
          >
            <div className="absolute inset-x-0 top-0 z-50 origin-top-right  lg:hidden transform p-2 transition-all ease-out">
              <div
                className={`divide-y-2 divide-gray-50 rounded-lg border shadow-lg ring-1 ring-white ring-opacity-5 ${styles.customcolor} `}
              >
                <div className="px-5 pb-6 pt-5">
                  <div className="flex items-center justify-between pb-8">
                    <div className="inline-flex items-center space-x-2">
                      <Link href="/">
                        <span className={`font-bold ${styles.gradi}`}>
                          TradeMate
                        </span>
                      </Link>
                    </div>
                    <div className="-mr-2">
                      <button
                        type="button"
                        onClick={toggleMenu}
                        className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                      >
                        <span className="sr-only">Close menu</span>
                        <IoMdClose
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </div>
                  {menuItems.map((item, index) => (
                    <div key={index}>
                      <Link
                        href={item.href}
                        className={`-m-3 flex items-center rounded-md p-3 text-lg font-semibold  ${styles.custom}`}
                        onClick={() => handleMenuItemClick(index)}
                      >
                        <span className="ml-3  ">{item.name}</span>
                        {item.sublinks && item.sublinks.length > 0 && (
                          <span className="ml-auto">
                            {openSubmenu === index ? (
                              <IoMdArrowDropright className="h-4 w-4" />
                            ) : (
                              <IoMdArrowDropdown className="h-4 w-4" />
                            )}
                          </span>
                        )}
                      </Link>
                      {item.sublinks &&
                        item.sublinks.length > 0 &&
                        openSubmenu === index && (
                          <ul className="pl-4">
                            {item.sublinks.map((sublink, subindex) => (
                              <li key={subindex}>
                                <Link
                                  href={sublink.href}
                                  className={`block px-4 py-2 text-sm  ${styles.custom}`}
                                >
                                  {sublink.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                    </div>
                  ))}
                  {isLoggedIn ? (
                    <ul className="py-2">
                      <>
                        <Link href="/profile">
                          <li
                            className={`flex items-center rounded-md p-3 text-lg font-semibold  ${styles.custom1}`}
                          >
                            Profile
                          </li>
                        </Link>
                        {isAdmin && (
                          <Link href="/adminDashboard">
                            <li
                              className={`flex items-center rounded-md p-3 text-lg font-semibold  ${styles.custom1}`}
                            >
                              Admin Dashboard
                            </li>
                          </Link>
                        )}
                        <div onClick={handleLogout}>
                          <li
                            className={`w-full rounded-md px-3 py-2  text-md font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black ${styles.buttoncol}`}
                          >
                            Logout
                          </li>
                        </div>
                      </>
                    </ul>
                  ) : (
                    <>
                      <hr className="w-full my-2"></hr>
                      <span className="flex justify-between mt-4">
                        <Link href="/signin" className="mx-2">
                          {" "}
                          <button
                            type="button"
                            className={`w-full rounded-md px-3 py-2  text-md font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black ${styles.buttoncol}`}
                          >
                            Login
                          </button>
                        </Link>
                        <Link href="/signup">
                          {" "}
                          <button
                            type="button"
                            className={`w-full rounded-md px-3 py-2 text-md font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black ${styles.buttoncol}`}
                          >
                            Register
                          </button>
                        </Link>
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default NavbarFour;
