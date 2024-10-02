import { useState } from "react";

const ImageModal = ({ imageUrl, onClose }) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = () => {
    setIsDownloading(true);
    // Implement download logic here, for example:
    // const link = document.createElement('a');
    // link.href = imageUrl;
    // link.download = 'image.jpg';
    // link.click();
    // setIsDownloading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="max-w-4xl bg-white p-8 rounded-lg">
        <img src={imageUrl} alt="full-screen" className="w-full h-auto" />
        <div className="flex justify-between mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-white bg-gray-600 rounded-lg"
          >
            Close
          </button>
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="px-4 py-2 text-white bg-blue-500 rounded-lg"
          >
            {isDownloading ? "Downloading..." : "Download"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
