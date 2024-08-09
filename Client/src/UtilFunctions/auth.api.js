import Cookies from "js-cookie";

const localHost = import.meta.env.VITE_LOCALHOST;

export async function refreshAccessToken() {
  try {
    const res = await fetch(`${localHost}/api/refreshToken`, {credentials: "include"});
    const data = await res.json();
    if (!res.ok) throw new Error(`${res.status} : ${res.statusText}`);
    console.log("Access token refreshed:", data);
    Cookies.set("authStatus",true)
  } catch (error) {
    Cookies.remove("authStatus");
    console.log("Error refreshing access token:", error);
  }
}
