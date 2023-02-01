import connect from "@/config/db";
import RefreshToken from "@/models/RefreshToken";
import User from "@/models/User";
import { deleteCookie, getCookie } from "cookies-next";

export default async function Login(req, res) {
  connect();
  const refreshToken = getCookie("refresh-token", { req, res });
  await RefreshToken.remove({ id: refreshToken });

  deleteCookie("access-token", { req, res });
  deleteCookie("refresh-token", { req, res });

  return res.status(200).json({ message: "User logged out successfully" });
}
