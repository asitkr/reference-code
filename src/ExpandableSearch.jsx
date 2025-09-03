// import { useState } from "react";
// import { Search } from "lucide-react";

// export default function ExpandableSearch() {
//   const [hovered, setHovered] = useState(false);

//   return (
//     <div
//       className="relative w-fit"
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={() => setHovered(false)}
//     >
//       <div
//         className={`flex flex-row-reverse items-center justify-center h-12 rounded-full bg-black transition-all duration-300 ease-in-out overflow-hidden ${
//           hovered ? "w-56" : "w-12"
//         }`}
//       >
//         {/* Search Icon */}
//         <div className="px-2">
//           <Search size={20} className="text-white" />
//         </div>

//         {/* Search Input */}
//         <input
//           type="text"
//           placeholder="Search"
//           className={`bg-transparent text-white outline-none placeholder-white/70 transition-all duration-300 ease-in-out ${
//             hovered ? "w-40 px-2" : "w-0 px-0"
//           }`}
//         />
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import { Search, X } from "lucide-react";

export default function ExpandableSearch() {
  const [hovered, setHovered] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  // Dummy data to search from
  const items = ["Apple", "Banana", "Orange", "Mango", "Pineapple", "Grapes"];

  const handleSearch = (value) => {
    setQuery(value);
    if (value.trim() === "") {
      setResults([]);
    } else {
      const filtered = items.filter((item) =>
        item.toLowerCase().includes(value.toLowerCase())
      );
      setResults(filtered);
    }
  };

  return (
    <div className="relative w-fit">
      {/* Search Bar */}
      <div
        className={`flex flex-row-reverse items-center justify-center h-12 rounded-full bg-black transition-all duration-300 ease-in-out overflow-hidden ${
          hovered ? "w-56" : "w-12"
        }`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Search Icon (or Close when typing) */}
        <div className="px-2 cursor-pointer">
          {query ? (
            <X
              size={20}
              className="text-white"
              onClick={() => {
                setQuery("");
                setResults([]);
              }}
            />
          ) : (
            <Search size={20} className="text-white" />
          )}
        </div>

        {/* Input */}
        <input
          type="text"
          placeholder="Search"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          className={`bg-transparent text-white outline-none placeholder-white/70 transition-all duration-300 ease-in-out ${
            hovered ? "w-40 px-2" : "w-0 px-0"
          }`}
        />
      </div>

      {/* Results Dropdown */}
      {results.length > 0 && (
        <ul className="absolute mt-2 w-56 bg-white text-black rounded-lg shadow-lg p-2">
          {results.map((item, idx) => (
            <li
              key={idx}
              className="px-3 py-1 hover:bg-gray-200 cursor-pointer rounded-md"
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

