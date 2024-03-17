import React, { useEffect, useState } from 'react'
import JournalCards from './JournalCards'
import Journal from '../Common/JournalData'
import { useOutletContext } from 'react-router-dom'

export default function Journals() {
  const [selJournal, setJournal] = useState(1)
  const [search, setSearch] = useOutletContext()
  const [searchJournal, setSearchJournal] = useState([])

  function filterBySearchInput() {
    const Filter = searchJournal.filter((Journal) => {
      return Journal.title.toLowerCase().includes(search.toLowerCase());
    });
    setSearchJournal(Filter);

    if (search == "")
      setSearchJournal(Journal)
  }

  function fetchJournals() {
    fetch('http://localhost:4500/Journals')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setSearchJournal(data)
      })
      .catch(error => {
        console.error('An error occurred:', error);
      });
  }

  useEffect(() => {
    fetchJournals()
  }, [])

  useEffect(() => {
    filterBySearchInput()
  }, [search])

  return (
    <div className='Journals'>
      <div className="w-[40%] h-[100%] border-2 p-2 flex flex-col items-center justify-around text-center font-Nunito">
        <span className='text-3xl font-bold'>{Journal[selJournal - 1].title}</span>
        <img src={Journal[selJournal - 1].pic} alt="" className='h-[50%] w-[90%] rounded-lg' />
        <span>{Journal[selJournal - 1].desc}</span>
      </div>
      <div className="w-[60%] h-[100%] border-2 p-2 flex flex-col items-center overflow-y-scroll gap-10">
        {searchJournal.map((J) => {
          return <JournalCards key={J._id} id={J._id} title={J.title} desc={J.desc} pic={J.pic} setJournal={setJournal} />
        })}
      </div>
    </div>
  )
}
