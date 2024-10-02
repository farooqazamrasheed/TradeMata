import React from "react";

const Skeleton = ({ width, height }) => {
  return (
    <img
      src="/images/skeleton.jpeg"
      className="w-full h-70 object-cover animate-pulse"
    />
  );
};

export default Skeleton;
