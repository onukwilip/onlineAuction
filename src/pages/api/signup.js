import connect from "@/config/db";
import User from "@/models/User";
import bcrypt from "bcrypt";

export default async function signup(req, res) {
  connect();

  const body = req.body;
  const user = await User.findOne({
    email: body?.email,
  });

  if (user) {
    return res.status(400).json({ message: "User already exists" });
  }

  const salted = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(body?.password, salted);

  const newUser = await User.create({
    name: body?.name,
    email: body?.email,
    phoneNumber: body?.phoneNumber,
    password: hashedPassword,
    image: null,
    authenticated: false,
    auth: {
      code: 0,
      expiry: new Date(),
    },
  });

  if (newUser) {
    return res.status(200).json({ message: "User created successfully" });
  }

  return res.status(400).json({ message: "An error occured" });
}
