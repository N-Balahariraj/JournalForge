import React, { useEffect, useState } from "react";
import Journal from "./Journal";
import { journals } from "../Data/journalData";
import { ShimmerContentBlock, ShimmerThumbnail } from "react-shimmer-effects";

export default function Journals({ searchText, setEditJournal }) {
  const [searchJournals, setSearchJournals] = useState([]);
  const [journal, pickJournal] = useState({});
  const myJournals = JSON.parse(localStorage.getItem("user"))?.journals;

  useEffect(() => {
    setSearchJournals([...journals]);

    if (searchText.trim() !== "") {
      const filtered = journals.filter((journal) =>
        journal.title.toLowerCase().includes(searchText.toLowerCase())
      );
      setSearchJournals(filtered);
    }
  }, [searchText, journals]);

  return (
    <div className="Journals">
      <div className="w-[40%] h-[100%] overflow-y-auto border-2 p-2 flex flex-col items-center justify-around text-center font-Nunito">
        {searchJournals.length === 0 ? (
          <div className="h-[100%] w-[100%]"><ShimmerThumbnail fitOnFrame={true}/> </div>
        ) : (
          <>
            <span className="h-[20] text-3xl font-bold">
              {journal.title || journals[0]?.title}
            </span>
            <img
              src={journal.pic || journals[0]?.pic}
              alt=""
              className="h-[50%] w-[90%] rounded-lg"
            />
            <span className="h-[30%] text-lg font-semibold text-justify">
              {journal.desc || journals[0]?.desc}
            </span>
          </>
        )}
      </div>
      <div className="w-[60%] h-[100%] border-2 p-2 flex flex-col items-center overflow-y-scroll gap-6">
        {searchJournals.length === 0 ? (
          Array.from({ length: 3 }).map((_, index) => (
            <ShimmerContentBlock
            title={true}
            text={true}
            thumbnailWidth={300}
            thumbnailHeight={300}
            key={index}
          />
          ))
        ) : (
          searchJournals.map((J) => {
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
          })
        )}
      </div>
    </div>
  );
}
