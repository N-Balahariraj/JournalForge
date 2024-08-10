const apiUrl = import.meta.env.VITE_API;

export async function fetchJournals() {
  try {
    const res = await fetch(`${apiUrl}/Journals`, { credentials: "include" });
    const data = await res.json();
    if (!res.ok) throw new Error(`${res.status} : ${res.statusText}`);
    return data;
  } 
  
  catch (error) {
    console.log(error);
  }
}

export async function publishJournal(title, desc, author, email) {
  try {
    const res = await fetch(`${apiUrl}/Journals/Publish`, {
      method: "POST",
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        title,
        desc,
        author,
        email,
      }),
    });
    if (!res.ok) throw new Error(`${res.status} : ${res.statusText}`);
    return `${res.status} : ${res.statusText}`;
  } 
  
  catch (error) {
    console.log("err : ", error);
    return error.message;
  }
}

export async function updateJournal(title, desc, author, email) {
    try {
        const res = await fetch(`${apiUrl}/Journals/Edit/${title}`,{
            method : 'PUT',
            credentials : 'include',
            headers :{
                'content-type':'application/json'
            },
            body : JSON.stringify({
                title,
                desc,
                author,
                email
            })
        })
        if(!res.ok) throw new Error(`${res.status} : ${res.statusText}`)
        return `${res.status} : ${res.statusText}`
    } 
    
    catch (error) {
        console.log('err : ',error)
        return error.message
    }
}

export async function removeJournal(title){
    try {
        const res = await fetch(`${apiUrl}/Journals/remove/${title}`,{
            method : 'DELETE',
            credentials : 'include',
        })
        if(!res.ok) throw new Error(`${res.status} : ${res.statusText}`)
        return `${res.status} : ${res.statusText}`
    } 
    
    catch (error) {
        console.log('err : ',error)
        return error.message
    }
}
