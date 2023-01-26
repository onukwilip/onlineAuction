// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connect from "@/config/db";
import User from "@/models/User";

export default async function handler(req, res) {
  connect();

  if (req?.method === "GET") {
    if (req.query.id) {
      const user = await User.findOne({ _id: req.query?.id });
      return res.status(200).json(user);
    }

    const users = await User.find();
    return res.status(200).json(users);
  }

  if (req?.method === "POST") {
    const user = await User.create({
      ...req.body,
      phoneNumber: +req.body?.phoneNumber,
      authenticated: false,
      auth: {
        code: 0,
        expiry: null,
      },
    });
    return res.status(200).json({ createdUser: user });
  }

  if (req?.method === "PUT") {
    const users = await User.updateMany(
      { email: req.body.email },
      {
        $set: {
          name: req.body.name,
          "auth.expiry": new Date(),
        },
      },
      { new: true }
    );
    return res.status(200).json({ users: users });
  }

  if (req?.method === "DELETE") {
    const users = await User.remove({ _id: req.query?.id });
    return res.status(200).json({ users: users });
  }

  return res.status(200).json({ name: "John Doe" });
}
