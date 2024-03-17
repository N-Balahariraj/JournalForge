import React from "react";
export default function About() {
  return (
    <div className="About">
      <span className="font-Nunito font-bold text-4xl border-b-[5px] border-b-[#ccf373] p-3 rounded-xl">About Us</span>
      <div className="w-[50%] font-Nunito leading-loose">
        <p className="indent-10 text-justify">
          At JournalForge,our mission is to empower researchers, scholars, and
          practitioners worldwide by providing a dynamic platform for the exchange
          of ideas and the publication of high-quality, peer-reviewed articles. We
          are committed to fostering academic excellence, promoting
          interdisciplinary collaboration, and driving innovation forward. 
        </p>
        <dl className=" list-none pt-10">
          <dt className="font-bold text-xl pb-3">Our Values</dt>
          <dd>⭐ Excellence</dd>
          <dd>⭐ Inclusivity</dd>
          <dd>⭐ Collaboration</dd>
          <dd>⭐ Accessibility</dd>
        </dl>
      </div>
    </div>
  );
}
