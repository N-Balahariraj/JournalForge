import Cookies from "js-cookie";

const apiUrl = import.meta.env.VITE_API;

export async function register(name, email, password) {
  try {
    const res = await fetch(`${apiUrl}/api/Register`, {
      method: "POST",
      credentials: 'include',
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const data = await res.json();
    if (!res.ok) throw new Error(`${res.status} : ${res.statusText}`);
    return data;
  } 
  
  catch (error) {
    console.log("err : ", error);
    return error.message;
  }
}

export async function login(email, password) {
  try {
    const res = await fetch(`${apiUrl}/api/Login`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const data = await res.json();
    if (!res.ok) throw new Error({ code: res.status, message: res.statusText });
    Cookies.set("authStatus", true);
    localStorage.setItem("user", JSON.stringify(data.user));
    return {code:res.status, message:data.message};
  } 
  
  catch (error) {
    console.log("err : ", error);
    return {code:error.code, message:error.message};
  }
}

export async function editProfile(
  fname,
  lname,
  email,
  organization,
  address,
  phone
) {
  try {
    const res = await fetch(`${apiUrl}/api/editProfile`, {
      method: "PUT",
      credentials: 'include',
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name: fname + " " + lname,
        email,
        organization,
        address,
        phone,
      }),
    });

    if (!res.ok) throw new Error(`${res.status} : ${res.statusText}`);

    return `${res.status} : ${res.statusText}`;
  } 
  
  catch (error) {
    console.log("err : ", error);
    return error.message;
  } 
  
  finally {
    Cookies.remove("authStatus");
  }
}

export async function delAcc () {
    try {
      const res = await fetch(
        `${apiUrl}/api/deleteAcc`,
        {
          method: "DELETE",
          credentials: 'include',
          headers: {
            "content-type": "Application/json",
          },
        }
      );
      if (!res.ok) throw new Error(`${res.status} : ${res.statusText}`);

      return(`${res.status} : ${res.statusText}`);
    } 
    
    catch (error) {
      console.log("err : ", error);
      return error.message
    }

    finally{
        Cookies.remove("authStatus");
    }
  };

export async function logout(){
  try {
    const res = await fetch(`${apiUrl}/api/logout`,{credentials:'include'})
    if(!res.ok) throw new Error(`${res.status} : ${res.statusText}`)
    Cookies.remove("authStatus");
    localStorage.removeItem("user");
  } 
  
  catch (error) {
    console.log("error : ",error)
  }
}
