import Cookies from "js-cookie";
import { logout } from "./users.api";

const apiUrl = import.meta.env.VITE_API;

export async function refreshAccessToken() {
  try {
    const res = await fetch(`${apiUrl}/api/refreshToken`, {credentials: "include"});
    const data = await res.json();
    if (!res.ok) throw new Error(`${res.status} : ${res.statusText}`);
    console.log("Access token refreshed:", data);
    Cookies.set("authStatus",true)
  } catch (error) {
    logout();
    Cookies.remove("authStatus");
    localStorage.removeItem("user");
    console.log("Error refreshing access token:", error);
  }
}
