
async function validateHuman(token){
  const secret = process.env.SECRET_KEY
  const response = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`,
    {method: "POST",});
  const data = await response.json();
  return data.success;
}


export default async (req, res) => {
  const formData = req.body;

  const human = await validateHuman(formData.token);
  if (!human) {
    res.status(400);
    res.json({ errors: ["You're a bot"] });
    return;
  }

  res.status(201);
  res.json({ message: "Success!" });
}


