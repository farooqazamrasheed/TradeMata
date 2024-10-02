import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
const FloatingWhatsAppButton = () => {
  const openWhatsAppChat = () => {
    window.open("https://wa.me/923113471713", "_blank");
  };

  return (
    <div
      className="fixed bottom-6 right-6 bg-green-500 rounded-full w-16 h-16 flex items-center justify-center cursor-pointer"
      onClick={openWhatsAppChat}
      style={{ zIndex: "999" }} // set the z-index property
    >
      <FontAwesomeIcon icon={faWhatsapp} style={{  color:"white",fontSize: "2rem" }} />
    </div>
  );
};

export default FloatingWhatsAppButton;
