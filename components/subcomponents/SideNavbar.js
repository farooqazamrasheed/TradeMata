import React, { useEffect, useState } from "react";

import Link from "next/link";
import { useRouter } from "next/router";
const ChevronDownIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M10.293 14.293a1 1 0 001.414 0l4.242-4.243a1 1 0 10-1.415-1.415L11 11.586 6.464 7.05a1 1 0 00-1.415 1.414l4.242 4.243z"
      clipRule="evenodd"
    />
  </svg>
);

const ChevronUpIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M5.757 10.343a1 1 0 001.415 0L10 7.414l2.828 2.829a1 1 0 101.415-1.414l-4-4a1 1 0 00-1.415 0l-4 4a1 1 0 000 1.415z"
      clipRule="evenodd"
    />
  </svg>
);

const SideNavbar = ({ onClose, isAdmin, isLogout, token, isUserLoggedIn }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMenMenuOpen, setIsMenMenuOpen] = useState(false);
  const [isWomenMenuOpen, setIsWomenMenuOpen] = useState(false);
  const [isChildrenMenuOpen, setIsChildrenMenuOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const router = useRouter();
 
  useEffect(() => {
    setLoggedIn(isUserLoggedIn);
  }, [onClose]);
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const toggleMenMenu = () => {
    setIsMenMenuOpen((prev) => !prev);
  };

  const toggleWomenMenu = () => {
    setIsWomenMenuOpen((prev) => !prev);
  };

  const toggleChildrenMenu = () => {
    setIsChildrenMenuOpen((prev) => !prev);
  };

  return (
    <div
      onMouseLeave={onClose}
      className="fixed top-0 left-0 bottom-0 z-50 bg-white text-black w-80 px-4 py-8 overflow-y-auto transition-transform duration-300 ease-in-out transform translate-x-0 md:translate-x-0 md:-translate-x-full md:w-56 md:w-72"
    >
      <div className="flex items-right justify-between mb-8">
        <div className="flex-grow"></div> {/* Add a flexible empty div */}
        <div className="pr-4">
          <button onClick={onClose} className=" text-xl md:hidden">
            Close
          </button>
        </div>
      </div>
      <nav>
        <ul className="space-y-2">
          <Link href="/collection/new_in" onClick={onClose}>
            <li className="font-extrabold">New In</li>
          </Link>
          <hr className="my-2 border-t border-gray-600" />
        
          <li>
            <div className="flex items-center justify-between">
            <Link href="/collection/man/all-men" onClick={onClose}>
              <div className="font-extrabold">MEN</div></Link>
              <button
                onClick={toggleMenMenu}
                className="flex items-center justify-between"
              >
                <div className=" text-gray-600 pr-12">|</div>

                {isMenMenuOpen ? (
                  <ChevronUpIcon className="w-5 h-5  " />
                ) : (
                  <ChevronDownIcon className="w-5 h-5  " />
                )}
              </button>
            </div>
            {isMenMenuOpen && (
              <ul className="ml-4 space-y-2">
                <Link href="/collection/man/tops" onClick={onClose}>
                  <li className="mt-2">
                    <b>Tops</b>
                  </li>
                </Link>

                <Link href="/collection/man/t-shirts" onClick={onClose}>
                  <li>T_Shirt </li>{" "}
                </Link>
                <Link href="/collection/man/polos" onClick={onClose}>
                  <li>Polos</li>
                </Link>

                <Link href="/collection/man/shirts" onClick={onClose}>
                  <li>Shirts</li>
                </Link>
                <Link href="/collection/man/jackets_coats" onClick={onClose}>
                  <li>Jackets & Coats</li>
                </Link>

                <Link href="/collection/man/sweat_hoodies" onClick={onClose}>
                  <li>Sweat Shirts & Hoodies</li>
                </Link>

                <Link href="/collection/man/bottoms" onClick={onClose}>
                  <li>
                    <b>Bottoms</b>
                  </li>
                </Link>

                <Link href="/collection/man/jeans" onClick={onClose}>
                  <li>Jeans</li>
                </Link>

                <Link href="/collection/man/trousers" onClick={onClose}>
                  <li>Trousers</li>
                </Link>
                <Link href="/collection/man/cargoes" onClick={onClose}>
                  <li>Cargoes</li>
                </Link>
                <Link href="/collection/man/shorts" onClick={onClose}>
                  <li>Shorts</li>
                </Link>
                <Link href="/collection/man/co-ords" onClick={onClose}>
                  <li>Co-Ods</li>
                </Link>

                <Link href="/collection/man/shoes" onClick={onClose}>
                  <li>Shoes & Joggers</li>
                </Link>
                <Link href="/collection/man/accessories" onClick={onClose}>
                  <li>
                    <b>Accessories</b>
                  </li>
                </Link>
              </ul>
            )}
          </li>
         
          <hr className="my-2 border-t border-gray-600" />
         
          <li>
            <div className="flex items-center justify-between">
            <Link href="/collection/woman/all-women" onClick={onClose}>
              <div className="font-extrabold">WOMEN</div>  </Link>
              <button
                onClick={toggleWomenMenu}
                className="flex items-center justify-between"
              >
                <div className=" text-gray-600 pr-12">|</div>

                {isWomenMenuOpen ? (
                  <ChevronUpIcon className="w-5 h-5  " />
                ) : (
                  <ChevronDownIcon className="w-5 h-5  " />
                )}
              </button>
            </div>

            {isWomenMenuOpen && (
              <ul className="ml-4 space-y-2">
                <Link href="/collection/woman/tops" onClick={onClose}>
                  <li className="mt-2">
                    <b>Tops</b>
                  </li>
                </Link>
                <Link href="/collection/woman/dresses" onClick={onClose}>
                  <li>Dresses</li>
                </Link>

                <Link href="/collection/woman/t-shirts" onClick={onClose}>
                  <li>T_Shirt </li>{" "}
                </Link>
                <Link href="/collection/woman/polos" onClick={onClose}>
                  <li>Polos</li>
                </Link>

                <Link href="/collection/woman/shirts" onClick={onClose}>
                  <li>Shirts</li>
                </Link>
                <Link href="/collection/woman/jackets_coats" onClick={onClose}>
                  <li>Jackets & Coats</li>
                </Link>

                <Link href="/collection/woman/sweat_hoodies" onClick={onClose}>
                  <li>Sweat Shirts & Hoodies</li>
                </Link>

                <Link href="/collection/woman/bottoms" onClick={onClose}>
                  <li>
                    <b>Bottoms</b>
                  </li>
                </Link>

                <Link href="/collection/woman/jeans" onClick={onClose}>
                  <li>Jeans</li>
                </Link>

                <Link href="/collection/woman/trousers" onClick={onClose}>
                  <li>Trousers</li>
                </Link>
                <Link href="/collection/woman/cargoes" onClick={onClose}>
                  <li>Cargoes</li>
                </Link>
                <Link href="/collection/woman/shorts" onClick={onClose}>
                  <li>Shorts</li>
                </Link>
                <Link href="/collection/woman/co-ords" onClick={onClose}>
                  <li>Co-Ods</li>
                </Link>

                <Link href="/collection/woman/shoes" onClick={onClose}>
                  <li>Shoes & Joggers</li>
                </Link>
                <Link href="/collection/woman/accessories" onClick={onClose}>
                  <li>
                    <b>Accessories</b>
                  </li>
                </Link>
              </ul>
            )}
          </li>
          
          <hr className="my-2 border-t border-gray-600" />
          
          <li>
            <div className="flex items-center justify-between">
            <Link href="/collection/kids" onClick={onClose}>
              <div className="font-extrabold">Kids</div></Link>
              <button
                onClick={toggleChildrenMenu}
                className="flex items-center justify-between"
              >
                <div className=" text-gray-600 pr-12">|</div>

                {isChildrenMenuOpen ? (
                  <ChevronUpIcon className="w-5 h-5  " />
                ) : (
                  <ChevronDownIcon className="w-5 h-5  " />
                )}
              </button>
            </div>
            
            {isChildrenMenuOpen && (
              <ul className="ml-4 space-y-2">
                <Link href="/collection/boys/all-cat" onClick={onClose}>
                  {" "}
                  <li> <b>Boys</b></li>
                </Link>

                <Link href="/collection/boys/t-shirts" onClick={onClose}>
                  <li>T-Shirts</li>
                </Link>

                <Link href="/collection/boys/shirts" onClick={onClose}>
                  <li>Shirts</li>
                </Link>
                <Link href="/collection/boys/tops" onClick={onClose}>
                  <li>Tops</li>
                </Link>
                <Link href="/collection/boys/bottoms" onClick={onClose}>
                  <li>Bottoms</li>
                </Link>

                <Link href="/collection/girls/all-cat" onClick={onClose}>
                  {" "}
                  <li> <b>Girls</b></li>
                </Link>

                <Link href="/collection/girls/t-shirts" onClick={onClose}>
                  <li>T-Shirts</li>
                </Link>

                <Link href="/collection/girls/shirts" onClick={onClose}>
                  <li>Shirts</li>
                </Link>
                <Link href="/collection/girls/tops" onClick={onClose}>
                  <li>Tops</li>
                </Link>
                <Link href="/collection/girls/bottoms" onClick={onClose}>
                  <li>Bottoms</li>
                </Link>
              </ul>
            )}
          </li>
          
          <li className="font-extrabold">
          <hr className="my-2 border-t border-gray-600" />
            <Link href="/contact" onClick={onClose}>
              Contact Us
            </Link>{" "}
          </li>

          {/* Show this section if the user is logged in */}
          {isUserLoggedIn  ? (
            <>
              <Link href="/profile" onClick={onClose}>
                <hr className="my-2 border-t border-gray-600" />
                <li className="font-extrabold">My Account</li>
              </Link>
              {isAdmin ? (
                <>
                 
                  <Link href="/admin" onClick={onClose}>
                  <hr className="my-2 border-t border-gray-600" />
                    <li className="font-extrabold">Admin Dashboard</li>
                  </Link>
                </>
              ) : (
                <>
                <Link href="/orders" onClick={onClose}>
                  <hr className="my-2 border-t border-gray-600" />
                  <li className="font-extrabold">Orders</li>
                  </Link>
                </>
              )}
              <hr className="my-2 border-t border-gray-600" />
              <li>
                <Link href={"/"} onClick={onClose}>
                  <button onClick={isLogout} className="font-extrabold">Logout</button>
                </Link>
              </li>
            </>
          ) : (
            // If user is not logged in, show "Sign In" and "Register"
            <>
              <hr className="my-2 border-t border-gray-600" />
              <li  className="font-extrabold">
                <Link href="/signin" onClick={onClose}>
                  Sign In
                </Link>
              </li>
              <hr className="my-2 border-t border-gray-600" />
              <li  className="font-extrabold">
                <Link href="/signup" onClick={onClose}>
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default SideNavbar;
