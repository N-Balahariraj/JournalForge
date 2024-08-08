import React, { useEffect, useState } from "react";
import Journal from "./Journal";
import {journals} from "../Data/journalData";

export default function Journals({ searchText, setEditJournal }) {
  const [searchJournals, setSearchJournals] = useState([]);
  const [journal, pickJournal] = useState({});
  const myJournals = JSON.parse(localStorage.getItem("user"))?.journals

  useEffect(() => {
      setSearchJournals([...journals]);
  }, []);
  
  useEffect(() => {
    if (searchText.trim() === "") {
      setSearchJournals(journals);
    } 
    else {
      const filtered = journals.filter(journal =>
        journal.title.toLowerCase().includes(searchText.toLowerCase())
      );
      setSearchJournals(filtered);
    }
  }, [searchText, journals]);

  return (
    <div className="Journals">
      <div className="w-[40%] h-[100%] border-2 p-2 flex flex-col items-center justify-around text-center font-Nunito">
        <span className="text-3xl font-bold">{journal.title}</span>
        <img src={journal.pic} alt="" className="h-[50%] w-[90%] rounded-lg" />
      </div>
      <div className="w-[60%] h-[100%] border-2 p-2 flex flex-col items-center overflow-y-scroll gap-10">
        {searchJournals?.map((J) => {
          return (
            <Journal
              key={J._id}
              id={J._id}
              title={J.title}
              desc={J.desc}
              pic={J.pic}
              pickJournal={pickJournal}
              isMyjournal={myJournals.includes(J.title)}
              setEditJournal={setEditJournal}
            />
          );
        })}
      </div>
    </div>
  );
}