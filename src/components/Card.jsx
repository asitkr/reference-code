import React from "react";

const Card = () => {
  return (
    <div className="flex justify-center items-center my-24">
      <div className="relative w-[400px] h-[330px] rounded-2xl overflow-hidden shadow-[0_8px_28px_-9px_rgba(0,0,0,0.45)] bg-transparent e-card playing">
        {/* Waves */}
        <div className="absolute w-[680px] h-[700px] opacity-60 -left-1/2 -top-[40%] bg-gradient-to-tr from-[#af40ff] via-[#5b42f3] to-[#00ddeb] rounded-[40%] animate-wave" />
        <div className="absolute w-[680px] h-[700px] opacity-60 -left-1/2 top-[50px] bg-gradient-to-tr from-[#af40ff] via-[#5b42f3] to-[#00ddeb] rounded-[40%] animate-wave2" />
        <div className="absolute w-[680px] h-[700px] opacity-60 -left-1/2 top-[40px] bg-gradient-to-tr from-[#af40ff] via-[#5b42f3] to-[#00ddeb] rounded-[40%] animate-wave3" />

        {/* Info Section */}
        <div className="absolute text-center text-white font-semibold text-[20px] top-[5.6em] left-0 right-0">
          {/* Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="w-12 -mt-4 pb-4 mx-auto"
          >
            <path
              fill="currentColor"
              d="M19.4133 4.89862L14.5863 2.17544C12.9911 1.27485 11.0089 1.27485 9.41368 2.17544L4.58674
              4.89862C2.99153 5.7992 2 7.47596 2 9.2763V14.7235C2 16.5238 2.99153 18.2014 4.58674 19.1012L9.41368
              21.8252C10.2079 22.2734 11.105 22.5 12.0046 22.5C12.6952 22.5 13.3874 22.3657 14.0349 22.0954C14.2204
              22.018 14.4059 21.9273 14.5872 21.8252L19.4141 19.1012C19.9765 18.7831 20.4655 18.3728 20.8651
              17.8825C21.597 16.9894 22 15.8671 22 14.7243V9.27713C22 7.47678 21.0085 5.7992 19.4133 4.89862Z"
            />
          </svg>
          UI / EX Designer
          <div className="text-sm font-light relative top-4 lowercase">
            MikeAndrewDesigner
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
