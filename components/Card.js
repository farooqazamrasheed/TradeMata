import React from "react";
import Tilt from "react-parallax-tilt";
import styles from "@/styles/Color.module.css";
import Link from "next/link";
const Card = ({ icon, heading, description, buttonText }) => {
  return (
    <Tilt>
      <div
        className={`max-w-sm   rounded overflow-hidden shadow-lg ${styles.gradientBg}`}
      >
        <div className="px-6 py-4">
          <div className=" items-center">
            <div className="my-4 w-12 text-white">{icon}</div>
            <div className="text-xl font-bold">{heading}</div>
          </div>
          <p className=" text-base mt-4">{description}</p>
        </div>
        <div className="px-6 py-4">
          <Link
            href={`/introduction/[slug]`}
            as={`/introduction/${buttonText}`}
          >
            <button className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full">
              --More
            </button>
          </Link>
        </div>
      </div>
    </Tilt>
  );
};

export default Card;
