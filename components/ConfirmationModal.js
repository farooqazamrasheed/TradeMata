import React from "react";

const ConfirmationModal = ({ onCancel, onConfirm }) => {
  return (
    <div className="fixed z-50 inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-8 rounded-lg m-2">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Are You Sure You Want To Remove This Product?
        </h3>
        <div className="flex justify-end">
          <button
            className="text-gray-600 hover:text-gray-900 mr-4"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="text-red-600 hover:text-red-900"
            onClick={onConfirm}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
