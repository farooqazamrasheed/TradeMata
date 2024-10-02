import { useRouter } from "next/router";

const QuantityErrorModal = ({ onClose, selectedProduct }) => {
    const router = useRouter();
    return (
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-md relative m-2 md:m-4">
          {/* Close Button */}
          <div className="absolute top-2 right-2">
            <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
  
          <div className="flex flex-row ">
            {/* Left Column - Product Photo */}
            <div className="">
              <img
                src={selectedProduct.colorPhoto}
                alt="Product"
                className="w-80 h-60 md:w-40 md:h-50  "
              />
            </div>
  
            {/* Right Column - Product Information */}
            <div className="mt-6  pl-2 pr-2 md:p-4 md:pt-8 flesx justify-center items-center">
              <h2 className="font-semibold">{selectedProduct.name}</h2>
              <p className="text-gray-500">
                was successfully added to your shopping bag
              </p>
              <div className="flex flex-col md:flex-row md:justify-start mt-4">
                <button
                  onClick={onClose}
                  className="px-6 py-2 bg-black text-white text-sm rounded mb-2 md:mb-0 md:mr-4 hover:bg-gray-800"
                >
                  Continue Shopping
                </button>
                <button
                 onClick={()=>router.push('/shopping_bag')}
                 className="px-6 py-2 bg-white text-black text-sm rounded border border-black hover:bg-gray-100"
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default QuantityErrorModal;
  