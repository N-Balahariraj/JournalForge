import React, { useEffect, useState } from 'react'
import Journal from '../UtilComponents/Journal'

export default function Journals({searchText}) {
  const [journals, setJournals] = useState([])
  const [jornals, searchJournals] = useState([])
  const [journal, pickJournal] = useState({})

  useEffect(() => {
    function fetchJournals() {
      fetch(`${process.env.REACT_APP_GLOBALHOST}/Journals`)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          searchJournals(data[0])
          setJournals(data[0])
        })
        .catch(error => {
          console.error('An error occurred:', error);
        });
    }
    fetchJournals()
  }, [])

  useEffect(() => {
    function filterJournals() {
      const filJournals = journals.filter((journal) => {
        return journal.title.toLowerCase().includes(searchText.toLowerCase());
      });
      searchJournals(filJournals);
    }
    filterJournals()
  }, [searchText])

  return (
    <div className='Journals'>
      <div className="w-[40%] h-[100%] border-2 p-2 flex flex-col items-center justify-around text-center font-Nunito">
        <span className='text-3xl font-bold'>{journal.title}</span>
        <img src={journal.pic} alt="" className='h-[50%] w-[90%] rounded-lg' />
        <span>{journal.desc}</span>
      </div>
      <div className="w-[60%] h-[100%] border-2 p-2 flex flex-col items-center overflow-y-scroll gap-10">
        {jornals||journals?.map((J) => {
          return <Journal key={J._id} id={J._id} title={J.title} desc={J.desc} pic={J.pic} pickJournal={pickJournal} />
        })}
      </div>
    </div>
  )
}
