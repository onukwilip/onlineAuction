import nodeMailer from "nodemailer";

export const generateRandom = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

export const sendMail = async ({ from, to, subject, html, text }) => {
  const transporter = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "onukwilip@gmail.com",
      pass: process.env.SMTP_APP_PASSWORD,
    },
  });

  const mailOptions = {
    from,
    to,
    subject,
    text,
    html,
  };

  const sent = await transporter.sendMail(mailOptions).catch((e) => {
    console.log(e?.message);
  });

  return sent;
};

export const toBase64 = (string) => {
  return Buffer.from(string, "utf-8").toString("base64");
};

export const fromBase64 = (string) => {
  try {
    return Buffer.from(string, "base64").toString("utf-8");
  } catch (e) {
    return string;
  }
};
