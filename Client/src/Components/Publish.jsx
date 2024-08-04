import Alert from 'react-bootstrap/Alert';
import React, { useState } from "react";

export default function Publish() {
  const [alert, setAlert] = useState(false);

  const publish = async (e) => {
    const title = e.target[0].value;
    const desc = e.target[1].value;
    const auth = e.target[2].value;
    const email = e.target[3].value;
    console.log(title, desc, auth, email);
    // try {
    //   const res = await fetch(`${import.meta.env.VITE_LOCALHOST}`, {
    //     method: "POST",
    //     headers: {
    //       "content-type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       title,
    //       desc,
    //       auth,
    //       email,
    //     }),
    //   });
    //   if(!res.ok) throw new Error(`${res.status} : ${res.statusText}`)
    //   setAlert(`${res.status} : ${res.statusText}`)
    // }
    // catch (error) {
    //   setAlert(error.message)
    //   console.log("err : ", error);
    // }
  };
  return (
    <>
      {alert && <Alert onClose={()=>setAlert(false)} dismissible>{alert}</Alert>}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          publish(e);
        }}
        className="Publish"
      >
        <label htmlFor="Title">Title :</label>
        <input
          type="text"
          id="Title"
          className="h-[7%] outline-none border-2 rounded-lg px-2"
        />
        <label htmlFor="Description">Description :</label>
        <textarea
          name=""
          id="Description"
          cols="30"
          rows="10"
          className="h-[25%] outline-none border-2 rounded-lg px-2"
        ></textarea>
        <label htmlFor="Author">Author :</label>
        <input
          type="text"
          id="Author"
          className="h-[7%] outline-none border-2 rounded-lg px-2"
        />
        <label htmlFor="Email">Email :</label>
        <input
          type="text"
          id="Email"
          className="h-[7%] outline-none border-2 rounded-lg px-2"
        />
        <button className="h-[9%] bg-black text-white rounded-lg">Post</button>
      </form>
    </>
  );
}
