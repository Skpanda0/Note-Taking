// import React, { useEffect, useState } from "react";
// import { useParams, useSearchParams } from "react-router-dom";
// import {useDispatch, useSelector} from "react-redux"
// import { addToPastes, updatePastes } from "../redux/pasteSlice";
// import { Link } from "react-router";
// import {CirclePlus, Copy} from 'lucide-react'
// import Tippy from "@tippyjs/react";
// import "tippy.js/dist/tippy.css";

// const ViewPaste = () => {

//   const {id} = useParams()
//   const allPastes = useSelector((state) => state.paste.pastes)
//   const paste = allPastes.filter((p) => p._id === id)[0]

//   return (
//     <div className="flex flex-col w-[100vw]">
//       <div className="flex flex-row mt-5 gap-5 justify-center items-center px-2">
//         <input
//           className="cursor-not-allowed bg-[#1a1a1a] p-2 mt-2 w-[75%]  pl-3 border border-black rounded-lg backdrop-blur-lg  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blend-saturation "
//           type="text"
//           placeholder="enter title here"
//           value={paste.title}
//           disabled
//           // onChange={(e) => setTitle(e.target.value)}
//         />
//         <Tippy content="New">
//           <Link 
//             to={"/"}
//             className="text-white text-inherit mt-2 p-2 hover:text-blue-500 hover:border-black bg-[#1a1a1a] rounded-lg"
//           >
//             <CirclePlus/>
//           </Link>
//         </Tippy>

//       </div>
//       <div className="mt-5 relative">
//         <textarea
//           className="hover:scale-105 transition-transform duration-300 ease-in-out p-4 rounded-2xl min-w-[85%] bg-[#1a1a1a] cursor-not-allowed"
//           value={paste.content}
//           placeholder="Enter Content Here"
//           // onChange={(e) => setvalue(e.target.value)}
//           rows={20}
//           disabled
//         />
//         <button
//           className="absolute top-2 text-white text-inherit mt-2 p-2 hover:text-blue-500 hover:border-black bg-[#1a1a1a] rounded-lg"
//         >
//           <Copy/>
//         </button>
//       </div>
//     </div>
//   )
// }

// export default ViewPaste
import React from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { CirclePlus, Copy } from "lucide-react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import toast from "react-hot-toast"; // Optional for success messages

const ViewPaste = () => {
  const { id } = useParams();
  const allPastes = useSelector((state) => state.paste.pastes);
  const paste = allPastes.find((p) => p._id === id);

  const handleCopy = () => {
    if (paste && paste.content) {
      navigator.clipboard.writeText(paste.content);
      toast.success("Content copied to clipboard!"); // Show a success message
    } else {
      toast.error("No content to copy."); // Handle empty content
    }
  };

  if (!paste) {
    return <div className="text-center text-red-500 mt-10">Paste not found</div>;
  }

  return (
    <div className="flex flex-col w-[100vw]">
      {/* Title Input */}
      <div className="flex flex-row mt-5 gap-5 justify-center items-center px-2">
        <input
          className="cursor-not-allowed bg-[#1a1a1a] p-2 mt-2 w-[75%] pl-3 border border-black rounded-lg backdrop-blur-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blend-saturation"
          type="text"
          placeholder="Enter title here"
          value={paste.title}
          disabled
        />
        <Tippy content="New">
          <Link
            to={"/"}
            className="text-white text-inherit mt-2 p-2 hover:text-blue-500 hover:border-black bg-[#1a1a1a] rounded-lg"
          >
            <CirclePlus />
          </Link>
        </Tippy>
        <Tippy content="Copy">
          <button
            className=" text-white text-inherit mt-2 p-3 hover:text-blue-500 hover:border-black bg-[#1a1a1a] rounded-lg"
            onClick={() => {
              navigator.clipboard.writeText(paste.content);
              toast.success("Successfully Copied");
            }}
          >
            <Copy size={16} />
          </button>
        </Tippy>
      </div>

      {/* Content Textarea with Copy Button */}
      <div className="mt-5 relative">
        <textarea
          className="hover:scale-105 transition-transform duration-300 ease-in-out p-4 rounded-2xl min-w-[85%] bg-[#1a1a1a] cursor-not-allowed"
          value={paste.content}
          placeholder="Enter Content Here"
          rows={20}
          disabled
        />
        {/* Copy Button */}
        
      </div>
    </div>
  );
};

export default ViewPaste;
