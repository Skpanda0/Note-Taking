import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPastes } from "../redux/pasteSlice";
import toast from "react-hot-toast";
import { Link } from "react-router";
import { Calendar, Copy, Eye, PencilLine, Trash2, Share} from "lucide-react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

const Paste = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const pastes = useSelector((state) => state.paste.pastes);
  const disapatch = useDispatch();

  const filterData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handelDelete = (pasteId) => {
    disapatch(removeFromPastes(pasteId));
  };

  const format = (timestamp) => {
    const date = new Date(timestamp);
    const options = { month: "long" }; // Full month name
    const monthName = date.toLocaleString("en-US", options); // e.g., "December"
    const day = date.getDate(); // e.g., 14
    const year = date.getFullYear(); // e.g., 2024
    // Extract time components
    const hours = date.getHours(); // e.g., 16
    const minutes = date.getMinutes(); // e.g., 10
    const seconds = date.getSeconds(); // e.g., 24

    // Format time to HH:MM:SS format
    const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;

    const formattedDate = `${monthName}-${day}-${year} (${formattedTime})`;
    return formattedDate;
  };
  return (
    <div className="flex flex-col w-[100vw]">
      <div>
        <input
          className="overflow-hidden p-2 mt-4 pl-4 w-[90%] border border-black rounded-lg backdrop-blur-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blend-saturation hover:border-gray-500"
          type="search"
          placeholder="search here"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="font-normal text-xs my-2 text-gray-400">
        <h1>All Notes</h1>
      </div>
      <div className="flex flex-col gap-5 mt-5 ">
        {filterData.length > 0 &&
          filterData.map((paste) => {
            return (
              <div
                className="rounded-lg border border-black hover:border-gray-600 flex w-[90%] gap-4 py-2 mx-auto place-content-between hover:scale-105 transition-transform duration-300 ease-in-out"
                key={paste._id}
              >
                <div className="w-[70%] flex flex-col text-left gap-2 pl-3">
                  <div className="font-bold text-xl">{paste.title}</div>
                  <div className="font-thin text-xs">
                    {paste.content.split(" ").slice(0, 10).join(" ")}
                    {paste.content.split(" ").length > 10 && "..."}
                  </div>
                </div>
                <div>
                  <div className="flex flex-row gap-1 pr-2">
                    <Tippy content="Edit">
                      <Link
                        to={`/?pasteId=${paste._id}`}
                        className="text-white text-inherit  p-2 hover:text-blue-500 hover:border-black bg-[#1a1a1a] rounded-lg"
                      >
                        <PencilLine size={12} />
                      </Link>
                    </Tippy>
                    <Tippy content="View">
                      <Link
                        to={`/pastes/${paste._id}`}
                        className="text-white text-inherit  p-2 hover:text-blue-500 hover:border-black bg-[#1a1a1a] rounded-lg"
                      >
                        <Eye size={12} />
                      </Link>
                    </Tippy>
                    <Tippy content="Delete">
                      <button
                        className="p-2 text-white hover:text-blue-500 hover:border-black"
                        onClick={() => handelDelete(paste._id)}
                      >
                        <Trash2 size={12} />
                      </button>
                    </Tippy>
                    <Tippy content="Copy">
                      <button
                        className="p-2 text-white hover:text-blue-500 hover:border-black"
                        onClick={() => {
                          navigator.clipboard.writeText(paste.content);
                          toast.success("Successfully Copied");
                        }}
                      >
                        <Copy size={12} />
                      </button>
                    </Tippy>
                    <Tippy content="Share">
                      <button
                        className="p-2 text-white hover:text-blue-500 hover:border-black"
                        onClick={() => {
                          const link = `${window.location.origin}/pastes/${paste._id}`;
                          navigator.clipboard.writeText(link);
                          toast.success("Link copied to clipboard!");
                        }}
                      >
                        <Share size={12} />
                      </button>
                    </Tippy>
                  </div>
                  <div className="flex mt-2 py-1 gap-2">
                    <Calendar size={12} />
                    <div className="font-light text-xs">
                      {format(paste.createdAt)}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Paste;
