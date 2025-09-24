// import { useState } from "react";
// import { Plus, UploadCloud, Send, X } from "lucide-react";

// const ChatGpt = () => {
//   const [expanded, setExpanded] = useState(false);
//   const [query, setQuery] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (query.trim() !== "") {
//       console.log("Submitted:", query);
//       // You can handle your search/submit logic here
//       setQuery(""); // clear input
//     }
//   };

//   return (
//     <div
//       className={`flex flex-col items-center justify-center bg-black text-white transition-all duration-500 ease-in-out ${
//         expanded ? "min-h-screen" : "h-auto"
//       }`}
//     >
//       {/* Heading */}
//       <div
//         className={`relative w-[80%] text-center mx-auto p-4 mb-6 border border-white rounded-3xl transition-all duration-500 ease-in-out ${
//           expanded ? "min-h-[70vh]" : "h-auto"
//         }`}
//       >
//         <h1 className="text-xl mb-6">What's on your mind today?</h1>

//         {/* Close Button (only visible when expanded) */}
//         {expanded && (
//           <button
//             onClick={() => setExpanded(false)}
//             className="absolute top-4 right-4 text-gray-400 hover:text-white transition-all duration-300 ease-in-out"
//           >
//             <X className="w-6 h-6" />
//           </button>
//         )}

//         {/* Search Form */}
//         <form
//           onSubmit={handleSubmit}
//           className={`flex items-center bg-[#1f1f1f] rounded-full px-4 mx-10 py-2 max-w-full transition-all duration-500 ease-in-out ${
//             expanded ? "scale-105 shadow-lg" : "scale-100"
//           }`}
//         >
//           {/* Input */}
//           <input
//             type="text"
//             placeholder="Ask anything"
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//             onFocus={() => setExpanded(true)}
//             className="bg-transparent outline-none flex-1 text-gray-200 placeholder-gray-400"
//           />

//           {/* Send Button */}
//           <button
//             type="submit"
//             className="flex items-center justify-center gap-2 bg-white text-black p-2 px-4 rounded-full transition-all duration-300 ease-in-out"
//           >
//             <Send className="w-5 h-5" />
//             Send
//           </button>
//         </form>

//         {/* Upload section (only visible when expanded) */}
//         {expanded && (
//           <label className="w-[30%] mx-auto flex items-center justify-center gap-2 text-gray-400 text-sm cursor-pointer hover:text-white mt-5 border border-gray-200 p-2 rounded-full transition-all duration-500 ease-in-out">
//             <UploadCloud className="w-5 h-5" />
//             <span>Add photo & file</span>
//             <input type="file" className="hidden" />
//           </label>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ChatGpt;


import { useState } from "react";
import { UploadCloud, Send, X } from "lucide-react";

const ChatGpt = () => {
  const [expanded, setExpanded] = useState(false);
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() !== "") {
      const newMessage = { id: Date.now(), text: query };
      setMessages((prev) => [...prev, newMessage]);
      setQuery(""); 
      setExpanded(true); // expand only after search
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-black text-white min-h-screen transition-all duration-500 ease-in-out">
      {!expanded ? (
        /* Collapsed Layout */
        <div className="w-[80%] text-center mx-auto p-6 border border-white rounded-3xl">
          <h1 className="text-xl mb-6">What's on your mind today?</h1>

          <form
            onSubmit={handleSubmit}
            className="flex items-center bg-[#1f1f1f] rounded-full px-4 py-2 w-[600px] max-w-full mx-auto"
          >
            <input
              type="text"
              placeholder="Ask anything"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setExpanded(true)} // expand on focus
              className="bg-transparent outline-none flex-1 text-gray-200 placeholder-gray-400"
            />
            <button
              type="submit"
              className="flex items-center justify-center gap-2 bg-white text-black p-2 px-4 rounded-full"
            >
              <Send className="w-5 h-5" />
              Send
            </button>
          </form>
        </div>
      ) : (
        /* Expanded Chat Layout */
        <div className="relative w-[80%] mx-auto border border-white rounded-3xl flex flex-col h-[80vh] overflow-hidden">
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b border-gray-700">
            <h1 className="text-lg">What's on your mind today?</h1>
            <button
              onClick={() => setExpanded(false)}
              className="text-gray-400 hover:text-white transition-all duration-300 ease-in-out"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 ? (
              <p className="text-gray-500 text-center">Start a conversation ✨</p>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className="bg-[#1f1f1f] p-3 rounded-xl w-fit max-w-[70%] text-left"
                >
                  {msg.text}
                </div>
              ))
            )}
          </div>

          {/* Upload (optional extra) */}
          <label className="absolute left-4 bottom-20 flex items-center justify-center gap-2 text-gray-400 text-sm cursor-pointer hover:text-white border border-gray-200 px-3 py-1 rounded-full">
            <UploadCloud className="w-5 h-5" />
            <span>Add photo & file</span>
            <input type="file" className="hidden" />
          </label>

          {/* Sticky Input */}
          <form
            onSubmit={handleSubmit}
            className="flex items-center bg-[#1f1f1f] rounded-full px-4 py-2 m-4 sticky bottom-0"
          >
            <input
              type="text"
              placeholder="Ask anything"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="bg-transparent outline-none flex-1 text-gray-200 placeholder-gray-400"
            />
            <button
              type="submit"
              className="flex items-center justify-center gap-2 bg-white text-black p-2 px-4 rounded-full"
            >
              <Send className="w-5 h-5" />
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatGpt;

