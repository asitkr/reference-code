import React from "react";

const NewCard = () => {
  return (
    <div className="relative w-[190px] h-[254px] bg-white rounded-[20px] overflow-hidden shadow-[0_2px_2px_#0a3bffa1] border border-[#0a3cff] transition-all duration-300">
      {/* Top Card */}
      <div className="h-[35%] bg-white rounded-t-[20px] transition-all duration-300"></div>

      {/* Bottom Card */}
      <div
        className="relative h-[65%] bg-[#0a3cff] rounded-b-[20px] transition-all duration-300
        before:content-[''] before:absolute before:bg-transparent before:bottom-[164px] before:h-[50px] before:w-[175px] before:rounded-bl-[20px] before:shadow-[0_30px_0_0_#0a3cff] before:transition-all before:duration-300"
      >
        {/* Content */}
        <div className="pt-[13%] flex flex-col justify-center items-center text-white">
          <span className="font-bold text-[18px]">Card Title</span>
          <p className="text-[14px]">A simple card</p>
          <a
            href="#"
            className="mt-[15%] text-[13px] text-black bg-white border border-white rounded-[15px] px-3 py-1 transition-colors duration-400"
          >
            Read More
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewCard;
