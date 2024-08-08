import React, { useEffect, useState } from "react";
import { MDBRow, MDBCol, MDBInput } from "mdb-react-ui-kit";
import { MdOutlineDeleteOutline, MdCloudUpload, MdEdit } from "react-icons/md";
import Alert from "react-bootstrap/Alert";
import { useNavigate } from "react-router-dom";
import { delAcc, editProfile } from "../UtilFunctions/users.api";

export default function Profile() {
  const [edit, setEdit] = useState(true);
  const [alert, setAlert] = useState(false);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [mail, setMail] = useState("");
  const [address, setAddress] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"));
    setFname(user?.name.split(" ")[0]);
    setLname(user?.name.split(" ")[1]);
    setMail(user?.email);
    setAddress(user?.address);
    setCompany(user?.organization);
    setPhone(user?.phone);
  },[])

  return (
    <>
      {alert && (
        <Alert
          onClose={() => {
            setAlert(false);
          }}
          dismissible
        >
          {alert}
        </Alert>
      )}
      <form className="Profile">
        <MDBRow className="mb-4">
          <MDBCol>
            <MDBInput
              id="form6Example1"
              label="First name"
              disabled={edit}
              value={fname}
              onChange={(e) => setFname(e.target.value)}
            />
          </MDBCol>
          <MDBCol>
            <MDBInput
              id="form6Example2"
              label="Last name"
              disabled={edit}
              value={lname}
              onChange={(e) => setLname(e.target.value)}
            />
          </MDBCol>
        </MDBRow>

        <MDBInput
          wrapperClass="mb-4"
          id="form6Example3"
          label="Company name"
          disabled={edit}
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
        <MDBInput
          wrapperClass="mb-4"
          id="form6Example4"
          label="Address"
          disabled={edit}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <MDBInput
          wrapperClass="mb-4"
          type="email"
          id="form6Example5"
          label="Email"
          disabled={edit}
          value={mail}
          onChange={(e) => setMail(e.target.value)}
        />
        <MDBInput
          wrapperClass="mb-4"
          type="tel"
          id="form6Example6"
          label="Phone"
          disabled={edit}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <MDBRow>
          <MDBCol>
            <button
              className="mb-4 flex items-center justify-between gap-2 bg-black text-white rounded-lg h-[100%] w-[20%] overflow-hidden"
              onClick={(e) => e.preventDefault()}
            >
              {edit ? (
                <>
                  <span className="w-[70%] h-[100%] flex items-center justify-center px-2">
                    Edit
                  </span>
                  <span className="hover:bg-slate-600 w-[30%] h-[100%] flex items-center justify-center">
                    <MdEdit
                      onClick={(e) => {
                        e.preventDefault();
                        setEdit(!edit);
                      }}
                    />
                  </span>
                </>
              ) : (
                <>
                  <span className="w-[70%] h-[100%] flex items-center justify-center px-2">
                    Update
                  </span>
                  <span className="hover:bg-slate-600 w-[30%] h-[100%] flex items-center justify-center">
                    <MdCloudUpload
                      onClick={ async e => {
                        e.preventDefault()
                        const status = await editProfile(fname,lname,mail,company,address,phone)
                        setEdit(!edit);
                        setAlert(status)
                        navigate('/login')
                      }}
                    />
                  </span>
                </>
              )}
            </button>
          </MDBCol>
          <MDBCol>
            <button
              className="mb-4 flex items-center justify-between gap-2 bg-black text-white rounded-lg h-[100%] w-[35%] overflow-hidden"
              onClick={async (e) => {
                e.preventDefault();
                const status = await delAcc();
                setAlert(status)
                navigate('/login')
              }}
            >
              <span className="w-[80%] h-[100%] flex items-center justify-center px-2">
                Delete Account
              </span>
              <span className="hover:bg-slate-600 w-[20%] h-[100%] flex items-center justify-center">
                <MdOutlineDeleteOutline />
              </span>
            </button>
          </MDBCol>
        </MDBRow>
      </form>
    </>
  );
}
