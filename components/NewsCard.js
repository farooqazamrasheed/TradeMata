// components/NewsCard.js
import React from "react";
import styles from "@/styles/Color.module.css";
import Link from "next/link";
const NewsCard = ({ id,category,date, image, headline }) => {
  return (
    <div className="w-full rounded overflow-hidden shadow-lg border">
       <Link
                              href={`/news/[category]/[id]` }
                              as={`/news/${category}/${id}` }
             >
      <div className="flex h-full">
        <div className="w-1/3 ">
        <img className="h-full object-cover" src={image} alt="News" /></div>
        <div className="px-4 py-2 w-2/3">
          <div
            className={`uppercase tracking-wide text-sm text-indigo-500 font-semibold ${styles.customtext}`}
          >
            {date}
          </div>
          <div className="text-sm mb-2">{headline}</div>
        </div>
      </div></Link>
    </div>
  );
};

export default NewsCard;
