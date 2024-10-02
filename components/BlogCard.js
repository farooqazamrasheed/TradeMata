import React from "react";
import { BsEyeFill } from "react-icons/bs";import { formatDistanceToNow } from 'date-fns';
import Link from "next/link";
import styles from "@/styles/Color.module.css";

const BlogCard = ({ post }) => {
  // Convert the date string to a JavaScript Date object
  const postDate = new Date(post.createdAt);

  // Format the distance to now in a human-readable way
  const formattedDate = formatDistanceToNow(postDate, { addSuffix: true });

  return (
    <div className="max-w-md mx-auto rounded-xl shadow-xl overflow-hidden md:max-w-2xl border border-white">
      <Link
                              href={`/[slug]` }
                              as={`/${post.title}` }
             > <div className="md:flex">
     
        <div className="md:shrink-0">
          <img
            className="h-48 w-full rounded-xl object-cover md:h-full md:w-48"
            src={post.imageURL}
            alt="Modern building architecture"
          />
        </div>
        <div className="p-8">
          <div
            className={`uppercase tracking-wide text-sm text-indigo-500 font-semibold ${styles.customtext}`}
          >
            {formattedDate}
          </div>
          <a
            href="#"
            className="block mt-1 text-lg leading-tight font-bold hover:underline"
          >
            {post.title}
          </a>
          <p className="mt-2 text-sm">{post.description}</p>
          
          <p
            className={`sm:text-sm md:text-lg leading-tight text-white ${styles.customtext}`}
          >
            --- Read More
          </p>
        </div>
      </div></Link>
    </div>
  );
};

export default BlogCard;
