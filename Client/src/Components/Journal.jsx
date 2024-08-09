import React, { useState } from "react";
import { MdOutlineDeleteOutline, MdEdit } from "react-icons/md";
import { removeJournal } from "../UtilFunctions/journals.api";
import { useNavigate } from "react-router-dom";

export default function Journal({
  id,
  title,
  pic,
  desc,
  pickJournal,
  isMyjournal,
  setEditJournal,
}) {
  const [menu, setMenu] = useState("hidden");
  const navigate = useNavigate()

  return (
    <div
      className="w-[90%] h-[50%] flex border-2 rounded-lg"
      onClick={() => {
        pickJournal({ id, title, pic, desc });
      }}
    >
      <div className="w-[45%] flex flex-col items-center border-2 rounded-md">
        <span className="text-lg font-semibold p-2">{title}</span>
        <img
          src={pic}
          alt="JournalPic"
          className="h-[80%] w-[90%] rounded-lg"
        />
      </div>
      <div
        className="w-[55%] gap-2 text-justify flex items-center border-2 rounded-md p-2 font-Nunito font-medium"
        onMouseEnter={() => isMyjournal&&setMenu("flex")}
        onMouseLeave={() => setMenu("hidden")}
      >
        <span className="w-[100%]">{desc}</span>
        <div
          className={`w-[10%] h-[100%] flex-col items-center justify-center ${menu}`}
        >
          <button
            className="h-[50%] border-2 rounded-md p-[0.2rem] hover:bg-gray-300"
            onClick={(e) => {
              e.preventDefault();
              removeJournal(title);
            }}
          >
            <MdOutlineDeleteOutline />
          </button>
          <button
            className="h-[50%] border-2 rounded-md p-[0.2rem] hover:bg-gray-300"
            onClick={(e) => {
              e.preventDefault();
              setEditJournal(title)
              navigate('/publish')
            }}
          >
            <MdEdit />
          </button>
        </div>
      </div>
    </div>
  );
}
