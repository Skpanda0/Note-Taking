import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux"
import { addToPastes, updatePastes } from "../redux/pasteSlice";
import toast from "react-hot-toast";

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setvalue] = useState("");
  const [searchPrams, setSearchParams] = useSearchParams();
  const pasteId = searchPrams.get("pasteId");
  const dispatch = useDispatch()
  const allPastes = useSelector((state) => state.paste.pastes)

  useEffect(() => {
    if(pasteId){
      const paste = allPastes.find((p) => p._id === pasteId)
      setTitle(paste.title)
      setvalue(paste.content)
    }
  }, [pasteId])

  const createPaste = () => {
    if(title === ""){
      toast.error("Can not created")
    }else{
        const paste = {
          title: title,
          content: value,
          _id: pasteId || Date.now().toString(36),
          createdAt: new Date().toISOString(),
      }  

      if(pasteId){
          //upadte
          dispatch(updatePastes(paste))
      }else{
          //new
          dispatch(addToPastes(paste))
      }

      //after create or updatation
      setTitle('')
      setvalue('')
      setSearchParams({})
    }
  };

  return (
    <div className="flex flex-col w-[100vw]">
      <div className="flex flex-row mt-5 gap-5 justify-center items-center px-2">
        <input
          className="p-2 mt-2 w-[75%]  pl-3 border border-black rounded-lg backdrop-blur-lg  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blend-saturation hover:border-gray-500"
          type="text"
          placeholder="enter title here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button className="hover:border-black rounded-xl p-2 mt-2 hover:text-gray-400" onClick={createPaste}>
          {pasteId ? "Update Note" : "Create Note"}
        </button>
      </div>
      <div className="mt-5">
        <textarea
          className=" p-4 rounded-2xl min-w-[85%]"
          value={value}
          placeholder="Enter Content Here"
          onChange={(e) => setvalue(e.target.value)}
          rows={20}
        />
      </div>
    </div>
  );
};

export default Home;
