// NotificationCard.js
import React from 'react';

const NotificationCard = ({ notification, onClose, cardWidth }) => {
  const { userImage, text, timestamp } = notification;
  const formattedTimestamp = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(timestamp);

  return (
    <>
      <div className={`bg-white p-3 border mb-1 w-${cardWidth}`}>
        <div className="flex items-center justify-between">
          {/* Part 1: Image and Text */}
          <div className="flex items-center">
            <img src={userImage} alt="User" className="h-8 w-8 rounded-full mr-3" />
            <div>
              <p className="text-sm text-black truncate">{text}</p>
              <p className="text-xs text-gray-500">{formattedTimestamp}</p>
            </div>
          </div>

          {/* Part 2: Close Icon */}
          <button onClick={onClose} className="text-red-500 flex justify-end hover:text-red-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default NotificationCard;
