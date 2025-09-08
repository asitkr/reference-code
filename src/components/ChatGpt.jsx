// import { MoveVertical, Waves, Plus, UploadCloud } from "lucide-react";

// const ChatGpt = () => {
//     return (
//         <div className="flex flex-col items-center justify-center bg-black text-white">
//             {/* Heading */}
//             <div className="w-[80%] text-center mx-auto p-4 mb-6 border border-white rounded-3xl">
//                 <h1 className="text-xl mb-6">What's on your mind today?</h1>

//                 {/* Search Bar */}
//                 <div className="flex items-center bg-[#1f1f1f] rounded-full px-4 py-2 w-[600px] max-w-full">
//                     {/* Left + Icon */}
//                     <Plus className="text-gray-400 w-5 h-5 mr-3 cursor-pointer" />

//                     {/* Input */}
//                     <input
//                         type="text"
//                         placeholder="Ask anything"
//                         className="bg-transparent outline-none flex-1 text-gray-200 placeholder-gray-400"
//                     />

//                     {/* Microphone Icon */}
//                     <MoveVertical className="text-gray-400 w-6 h-6 mr-3 cursor-pointer rotate-45" />

//                     {/* Waves Icon */}
//                     <Waves className="text-gray-400 w-5 h-5 cursor-pointer" />
//                 </div>

//                 {/* Middle Toolbar (example: file upload) */}
//                 {/* <div className="w-full flex mt-4">
//                     <UploadCloud />
//                     <input
//                         type="file"
//                         className="text-sm text-gray-300 file:mr-2 file:py-1 file:px-3 file:rounded-full file:border-0 file:bg-gray-700 file:text-gray-200 file:cursor-pointer hover:file:bg-gray-600"
//                     />
//                 </div> */}
//                 <label className="w-[30%] flex items-center justify-center gap-2 text-gray-400 text-sm cursor-pointer mr-3 hover:text-white mt-5 border border-gray-200 p-2 rounded-full">
//                     <UploadCloud className="w-5 h-5" />
//                     <span>Add photo & file</span>
//                     <input type="file" className="hidden" />
//                 </label>
//             </div>
//         </div>
//     );
// };

// export default ChatGpt;


import { useState } from "react";
import { Plus, UploadCloud, Send, X } from "lucide-react";

const ChatGpt = () => {
  const [expanded, setExpanded] = useState(false);
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() !== "") {
      console.log("Submitted:", query);
      // You can handle your search/submit logic here
      setQuery(""); // clear input
    }
  };

  return (
    <div
      className={`flex flex-col items-center justify-center bg-black text-white transition-all duration-500 ease-in-out ${
        expanded ? "min-h-screen" : "h-auto"
      }`}
    >
      {/* Heading */}
      <div
        className={`relative w-[80%] text-center mx-auto p-4 mb-6 border border-white rounded-3xl transition-all duration-500 ease-in-out ${
          expanded ? "min-h-[70vh]" : "h-auto"
        }`}
      >
        <h1 className="text-xl mb-6">What's on your mind today?</h1>

        {/* Close Button (only visible when expanded) */}
        {expanded && (
          <button
            onClick={() => setExpanded(false)}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-all duration-300 ease-in-out"
          >
            <X className="w-6 h-6" />
          </button>
        )}

        {/* Search Form */}
        <form
          onSubmit={handleSubmit}
          className={`flex items-center bg-[#1f1f1f] rounded-full px-4 mx-10 py-2 max-w-full transition-all duration-500 ease-in-out ${
            expanded ? "scale-105 shadow-lg" : "scale-100"
          }`}
        >
          {/* Input */}
          <input
            type="text"
            placeholder="Ask anything"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setExpanded(true)}
            className="bg-transparent outline-none flex-1 text-gray-200 placeholder-gray-400"
          />

          {/* Send Button */}
          <button
            type="submit"
            className="flex items-center justify-center gap-2 bg-white text-black p-2 px-4 rounded-full transition-all duration-300 ease-in-out"
          >
            <Send className="w-5 h-5" />
            Send
          </button>
        </form>

        {/* Upload section (only visible when expanded) */}
        {expanded && (
          <label className="w-[30%] mx-auto flex items-center justify-center gap-2 text-gray-400 text-sm cursor-pointer hover:text-white mt-5 border border-gray-200 p-2 rounded-full transition-all duration-500 ease-in-out">
            <UploadCloud className="w-5 h-5" />
            <span>Add photo & file</span>
            <input type="file" className="hidden" />
          </label>
        )}
      </div>
    </div>
  );
};

export default ChatGpt;
