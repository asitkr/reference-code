// import { useState } from "react";
// import { ChevronDown } from "lucide-react";

// const ItemsPerPageDropdown = ({ itemsPerPage, setItemsPerPage, pageSizeOptions, setCurrentPage }) => {
//   return (
//     <div className="text-base leading-relaxed text-black w-fit flex list-none">
//       <div className="relative group">
//         {/* Main Link */}
//         <a
//           href="#"
//           className="relative flex items-center justify-center gap-3 px-9 py-3 border rounded-2xl overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:text-white"
//         >
//           <span>Our Services</span>
//           <ChevronDown
//             size={14}
//             className="transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:rotate-180 group-hover:text-white"
//           />
//           <span className="absolute inset-0 bg-[#0a3cff] scale-x-0 origin-left transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-x-100 group-hover:origin-right -z-10"></span>
//         </a>

//         {/* Submenu */}
//         <div className="absolute top-full left-0 w-full flex flex-col items-center rounded-2xl border border-gray-300 opacity-0 invisible -translate-y-3 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:pointer-events-auto group-hover:border-t-transparent group-hover:border-[#ffffff] z-10 bg-gray-100">
//           {["Development", "Design", "Marketing", "SEO"].map((item) => (
//             <div key={item} className="w-full transition-all duration-500 hover:bg-[#0a3cff] first:rounded-tl-2xl first:rounded-tr-2xl last:rounded-bl-2xl last:rounded-br-2xl last:rounded-bl-2xl last:rounded-br-2xl">
//               <a
//                 href="#"
//                 className="relative block px-6 py-3 w-full text-center transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] hover:text-white"
//               >
//                 <span className="absolute inset-0 !bg-[#0a3cff] scale-x-0 origin-left transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-x-100 hover:origin-right -z-10"></span>
//                 {item}
//               </a>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ItemsPerPageDropdown;


import { useState } from "react";
import { ChevronDown } from "lucide-react";

const ItemsPerPageDropdown = ({ itemsPerPage, setItemsPerPage, pageSizeOptions, setCurrentPage }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (value) => {
    setItemsPerPage(value);
    setCurrentPage(1);
    setIsOpen(false);
  };

  return (
    <div className="text-base leading-relaxed text-black w-fit flex list-none">
      <div className="relative">
        {/* Main Button */}
        <button
          type="button"
          onMouseEnter={() => setIsOpen(true)}
          className="relative flex items-center justify-center gap-3 px-9 py-3 border rounded-2xl overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] 
            hover:text-white focus:outline-none"
        >
          <span>{itemsPerPage} per page</span>
          <ChevronDown
            size={14}
            className={`transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
              isOpen ? "rotate-180 text-white" : ""
            }`}
          />
          <span
            className={`absolute inset-0 bg-[#0a3cff] transform transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] -z-10 ${
              isOpen ? "scale-x-100 origin-right" : "scale-x-0 origin-left"
            }`}
          ></span>
        </button>

        {/* Submenu */}
        <div
          className={`absolute top-full left-0 w-full flex flex-col items-center rounded-2xl border border-gray-300 bg-white transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] z-10 
            ${isOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-3 pointer-events-none"}`}
        >
          {pageSizeOptions.map((option) => (
            <div
              key={option}
              className="w-full transition-all duration-500 hover:bg-[#0a3cff] first:rounded-t-2xl last:rounded-b-2xl"
            >
              <button
                onClick={() => handleSelect(option)}
                className="relative block px-6 py-3 w-full text-center transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] hover:text-white"
              >
                <span className="absolute inset-0 bg-[#0a3cff] scale-x-0 origin-left transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-x-100 hover:origin-right -z-10"></span>
                {option} per page
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ItemsPerPageDropdown;

