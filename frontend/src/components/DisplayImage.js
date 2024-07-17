import React from "react";
import { IoMdClose } from "react-icons/io";

const DisplayImage = ({ imgUrl, onClose }) => {
  return (
    <div className="fixed bottom-0 top-0 right-0 left-0 flex justify-center pb-20 items-center overflow-y-scroll">
      <div className="bg-white shadow-lg rounded max-w-5xl mx-auto pb-10 p-4">
        <div
          className="w-fit ml-auto text-2xl hover:text-white hover:bg-red-600 cursor-pointer"
          onClick={onClose}
        >
          <IoMdClose />
        </div>

        <div className="flec justify-center p-4 max-w-[80vh] max-h-[8vh]">
          <img src={imgUrl} className="w-full h-full" />
        </div>
      </div>
    </div>
  );
};

export default DisplayImage;
