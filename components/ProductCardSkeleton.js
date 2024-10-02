import React from "react";
import Skeleton from "./subcomponents/Skeleton";

const ProductCardSkeleton = () => {
  return (
    <div className="max-w-full overflow-hidden mb-2">
      <div className="relative">
        <Skeleton height="70px" className="bg-gray-300" />
      </div>
      <div className="flex justify-between items-center mt-2">
        <div className="w-1/2 rounded-lg mr-2 h-4 bg-gray-300 animate-pulse" />
        <div className="w-1/2 rounded-lg h-4 bg-gray-300 animate-pulse" />
      </div>
      <div className="w-1/2 mt-2 rounded-lg h-4 bg-gray-300 animate-pulse" />
    </div>
  );
};

export default ProductCardSkeleton;
