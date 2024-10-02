import React, { useState } from "react";
import { format } from "date-fns";

const MessageBox = ({ message, currentUser }) => {
  const [isFullScreen, setIsFullScreen] = useState(false); // State for fullscreen mode

  const handleOpenFullScreen = () => {
    if (message?.photo) {
      // Check if message contains a photo
      setIsFullScreen(true);
    } else {
      console.warn("Message doesn't contain a photo"); // Handle case where no photo exists
    }
  };

  const handleCloseFullScreen = () => {
    setIsFullScreen(false);
  };

  const handleDownloadPhoto = () => {
    if (message?.photo) {
      const link = document.createElement("a");
      link.href = message.photo;
      const fileName = message.photo.substring(
        message.photo.lastIndexOf("/") + 1
      );
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      console.warn("Message doesn't contain a photo");
    }
  };

  const isCurrentUserMessage = message?.sender?._id === currentUser.id;

  return (
    <div
      className={`flex gap-3 items-start ${
        isCurrentUserMessage ? "justify-end" : "justify-start"
      }`}
    >
      <div className="flex gap-3 items-start">
        {!isCurrentUserMessage && (
          <img
            src={message?.sender?.photoUrl|| "/assets/person.jpg"}
            alt="profile photo"
            className="w-8 h-8 rounded-full"
          />
        )}
        <div className="flex flex-col gap-2">
          {!isCurrentUserMessage && (
            <p className="text-small-bold">
              {message?.sender?.name} &#160; &#183; &#160;{" "}
              {format(new Date(message?.createdAt), "hh:mm a")}
            </p>
          )}
          {message?.text && (
            <p
              className={`w-fit ${
                isCurrentUserMessage ? "bg-purple-2 text-white" : "bg-white"
              } p-3 rounded-lg text-base-medium`}
            >
              
              {message?.text}
            </p>
          )}
          {message?.photo && (
            <div className="relative">
              <img
                src={message?.photo}
                alt="message"
                className="w-40 h-auto rounded-lg cursor-pointer"
                onClick={handleOpenFullScreen}
              />
              {isFullScreen && (
                <div
                  className="fixed inset-0 flex justify-center items-center z-50 bg-black/70"
                  onClick={handleCloseFullScreen} // Close on background click
                >
                  <div className="bg-white p-4 rounded-lg shadow-md">
                    <img
                      src={message?.photo}
                      alt="message"
                      className="w-full h-[calc(100vh-40px)]  object-contain"
                    />
                    <div className="flex justify-between mt-4">
                      <button
                        className="btn btn-sm"
                        onClick={handleDownloadPhoto}
                      >
                        Download
                      </button>
                      <button
                        className="btn btn-sm"
                        onClick={handleCloseFullScreen}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          {isCurrentUserMessage && (
            <p className="text-small-bold">
              {format(new Date(message?.createdAt), "hh:mm a")}
            </p>
          )}
        </div>
        {isCurrentUserMessage && (
          <img
            src={message?.sender?.photoUrl|| "/assets/person.jpg"}
            alt="profile photo"
            className="w-8 h-8 rounded-full"
          />
        )}
      </div>
    </div>
  );
};

export default MessageBox;
