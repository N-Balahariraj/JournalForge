import Alert from "react-bootstrap/Alert";
import React, { useState } from "react";
import { publishJournal, updateJournal } from "../UtilFunctions/journals.api";
import { journals } from "../Data/journalData";

export default function Publish({ editJournal, setEditJournal }) {
  const [alert, setAlert] = useState(false);
  const journal = journals?.find((j) => editJournal === j.title);
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      {alert && (
        <Alert onClose={() => setAlert(false)} dismissible>
          {alert}
        </Alert>
      )}
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const title = e.target[0].value;
          const desc = e.target[1].value;
          const author = e.target[2].value;
          const email = e.target[3].value;
          const status = editJournal
            ? await updateJournal(title, desc, author, email)
            : await publishJournal(title, desc, author, email);
          setAlert(status);
          setEditJournal(null);
          e.target[0].value = "";
          e.target[1].value = "";
          e.target[2].value = "";
          e.target[3].value = "";
        }}
        className="Publish"
      >
        <label htmlFor="Title">Title :</label>
        <input
          type="text"
          id="Title"
          className="h-[7%] outline-none border-2 rounded-lg px-2"
          defaultValue={journal?.title}
        />
        <label htmlFor="Description">Description :</label>
        <textarea
          name=""
          id="Description"
          cols="30"
          rows="10"
          className="h-[25%] outline-none border-2 rounded-lg px-2"
          defaultValue={journal?.desc}
        ></textarea>
        <label htmlFor="Author">Author :</label>
        <input
          type="text"
          id="Author"
          className="h-[7%] outline-none border-2 rounded-lg px-2"
          defaultValue={journal?.author || user?.name}
        />
        <label htmlFor="Email">Email :</label>
        <input
          type="text"
          id="Email"
          className="h-[7%] outline-none border-2 rounded-lg px-2"
          defaultValue={user?.email}
        />
        <button className="h-[9%] bg-black text-white rounded-lg">
          {editJournal ? "Edit" : "Post"}
        </button>
      </form>
    </>
  );
}
