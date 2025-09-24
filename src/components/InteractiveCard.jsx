import React from "react";

const InteractiveCard = () => {
  return (
    <div className="relative w-64 h-64 cursor-pointer overflow-hidden rounded-xl bg-neutral-800 group p-5">
      {/* Animated Shadows */}
      <div className="absolute -top-12 -left-12 w-24 h-24 bg-transparent rounded-xl shadow-inner shadow-yellow-800 transition-all duration-1000 ease-in-out group-hover:-top-3" />
      <div className="absolute top-44 left-14 w-24 h-24 bg-transparent rounded-xl shadow-inner shadow-red-800 transition-all duration-1000 ease-in-out group-hover:top-60" />
      <div className="absolute top-24 left-56 w-24 h-24 bg-transparent rounded-xl shadow-inner shadow-sky-800 transition-all duration-1000 ease-in-out group-hover:-left-12" />
      <div className="absolute top-12 left-12 w-12 h-12 bg-transparent rounded-xl shadow-inner shadow-red-800 transition-all duration-1000 ease-in-out group-hover:-top-44" />
      <div className="absolute top-12 left-12 w-44 h-44 bg-transparent rounded-xl shadow-inner shadow-green-800 transition-all duration-1000 ease-in-out group-hover:left-44" />
      <div className="absolute -top-24 -left-12 w-64 h-64 bg-transparent rounded-xl shadow-inner shadow-sky-800 transition-all duration-1000 ease-in-out group-hover:-left-2" />
      <div className="absolute top-24 left-12 w-4 h-4 bg-transparent rounded-xl shadow-inner shadow-sky-500 transition-all duration-1000 ease-in-out group-hover:top-44" />

      {/* Content */}
      <div className="flex flex-col justify-center gap-2 w-full h-full p-3 bg-neutral-600 rounded-xl opacity-50 shadow-xl shadow-neutral-900">
        <span className="text-xl font-bold italic text-neutral-50">
          Explore More
        </span>
        <p className="text-neutral-300">
          Dive into curated collections, traverse user-friendly interfaces, and
          let curiosity guide your exploration.
        </p>
      </div>
    </div>
  );
};

export default InteractiveCard;
