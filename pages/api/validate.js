import { NextApiRequest, NextApiResponse } from "next";
require('dotenv').config()

export default async (NextApiRequest, NextApiResponse) => {
  const formData = NextApiRequest.body;

  const human = await validateHuman(formData.token);
  if (!human) {
    NextApiResponse.status(400);
    NextApiResponse.json({ errors: ["Please, you're not fooling us, bot."] });
    return;
  }

  NextApiResponse.status(201);
  NextApiResponse.json({ message: "Success!" });
}



async function validateHuman(token){
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  const response = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`,
    {method: "POST",});
  const data = await response.json();
  return data.success;
}