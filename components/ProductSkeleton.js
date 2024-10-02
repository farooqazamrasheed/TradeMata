import React from "react";

const Skeleton = ({ width, height }) => {
  return (
    <img
      src="/images/skeleton.jpeg"
      className="w-full h-full object-cover animate-pulse"
    />
  );
};

export default Skeleton;
