// Author.js
import React from 'react';

const Author = ({ author }) => {
  const { name, image, role } = author;

  return (
    <div className="flex items-center space-x-4">
      <img src={image} alt={name} className="w-10 h-10 rounded-full" />
      <div>
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-sm text-gray-600">{role}</p>
      </div>
    </div>
  );
};

export default Author;
