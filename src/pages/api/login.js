import connect from "@/config/db";
import User from "@/models/User";
import bcrypt from "bcrypt";

export default async function Login(req, res) {
  connect();

  const body = req.body;
  const password = body?.password;
  const user = await User.findOne({ email: body?.email });

  if (user && (await bcrypt.compare(password, user?.password))) {
    if (user.authenticated === true) {
      // Return JWT token
      return res.status(200).json({ message: "Login successfull" });
    }
    return res.status(400).json({ message: "User not authenticated" });
  }

  return res.status(404).json({ message: "Incorrect username or password" });
}
