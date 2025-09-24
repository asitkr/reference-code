// import React from "react";

// const LogoCard = () => {
//   return (
//     <div className="relative w-[300px] h-[200px] bg-[#243137] grid place-content-center rounded-[10px] overflow-hidden transition-all duration-500 ease-in-out group">
//       {/* Border */}
//       <div className="absolute inset-0 border-2 border-[#bd9f67] opacity-0 rotate-[10deg] transition-all duration-500 ease-in-out group-hover:inset-[15px] group-hover:opacity-100 group-hover:rotate-0" />

//       {/* Content */}
//       <div className="transition-all duration-500 ease-in-out">
//         <div className="relative h-[35px] w-[33px] overflow-hidden transition-all duration-1000 ease-in-out group-hover:w-[134px] animate-opacity">
//           {/* Logo 1 */}
//           <div className="absolute left-0 h-[33px]">
//             <svg
//               viewBox="0 0 29.667 31.69"
//               xmlns="http://www.w3.org/2000/svg"
//               id="logo-main"
//               className="h-full fill-[#bd9f67]"
//             >
//               <path d="M12.827,1.628A1.561,1.561,0,0,1,14.31,0h2.964a1.561,1.561,0,0,1,1.483,1.628v11.9a9.252,9.252,0,0,1-2.432,6.852q-2.432,2.409-6.963,2.409T2.4,20.452Q0,18.094,0,13.669V1.628A1.561,1.561,0,0,1,1.483,0h2.98A1.561,1.561,0,0,1,5.947,1.628V13.191a5.635,5.635,0,0,0,.85,3.451,3.153,3.153,0,0,0,2.632,1.094,3.032,3.032,0,0,0,2.582-1.076,5.836,5.836,0,0,0,.816-3.486Z" />
//               <path d="M75.207,20.857a1.561,1.561,0,0,1-1.483,1.628h-2.98a1.561,1.561,0,0,1-1.483-1.628V1.628A1.561,1.561,0,0,1,70.743,0h2.98a1.561,1.561,0,0,1,1.483,1.628Z" transform="translate(-45.91 0)" />
//               <path d="M0,80.018A1.561,1.561,0,0,1,1.483,78.39h26.7a1.561,1.561,0,0,1,1.483,1.628v2.006a1.561,1.561,0,0,1-1.483,1.628H1.483A1.561,1.561,0,0,1,0,82.025Z" transform="translate(0 -51.963)" />
//             </svg>
//           </div>

//           {/* Logo 2 */}
//           <div className="absolute left-[33px] h-[33px]">
//             <svg
//               viewBox="0 0 101.014 23.535"
//               xmlns="http://www.w3.org/2000/svg"
//               id="logo-second"
//               className="h-full pb-[10px] fill-none stroke-[#bd9f67] stroke-[1px]"
//             >
//               {/* ... keep all path elements from your original */}
//             </svg>
//           </div>

//           {/* Trail */}
//           <span className="absolute right-0 h-full w-full opacity-0 group-hover:animate-trail" />
//         </div>

//         {/* Logo bottom text */}
//         <span className="absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] mt-[30px] text-[#bd9f67] pl-[8px] text-[11px] opacity-0 transition-all duration-500 ease-in-out delay-500 group-hover:opacity-100 group-hover:tracking-[9.5px]">
//           uiverse.io
//         </span>
//       </div>

//       {/* Bottom text */}
//       <span className="absolute left-1/2 bottom-[13px] -translate-x-1/2 text-[6px] uppercase px-[5px] pl-[8px] text-[#bd9f67] bg-[#243137] opacity-0 tracking-[7px] transition-all duration-500 ease-in-out group-hover:opacity-100 group-hover:tracking-[3px]">
//         universe of ui
//       </span>
//     </div>
//   );
// };

// export default LogoCard;

import React from "react";

const AnimatedCard = () => {
    return (
        <div className="relative w-[300px] h-[200px] bg-[#243137] grid place-content-center rounded-[10px] overflow-hidden transition-all duration-500 ease-in-out scale-110">
            {/* Border */}
            <div className="absolute inset-[15px] border-2 border-[#bd9f67] opacity-100 rotate-0 transition-all duration-500 ease-in-out"></div>

            {/* Content */}
            <div className="transition-all duration-500 ease-in-out">
                
            </div>

            {/* Universe of UI on Top */}
            <span className="absolute left-1/2 top-[13px] -translate-x-1/2 text-[6px] uppercase px-[5px] pl-[8px] text-[#bd9f67] bg-[#243137] opacity-100 tracking-[3px] transition-all duration-500 ease-in-out">
                universe of ui
            </span>
        </div>
    );
};

export default AnimatedCard;


