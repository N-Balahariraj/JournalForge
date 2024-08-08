import Cookies from "js-cookie";

const localHost = import.meta.env.VITE_LOCAL_HOST;

export async function refreshAccessToken() {
  try {
    const res = await fetch(`${localHost}/refreshToken`, {credentials: "include"});
    const data = await res.json();
    if (!res.ok) throw new Error(`${res.status} : ${res.statusText}`);
    console.log("Access token refreshed:", data);
  } catch (error) {
    Cookies.set("authStatus", false);
    console.log("Error refreshing access token:", error);
  }
}
