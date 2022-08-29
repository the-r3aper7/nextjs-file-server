import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return;
  const { username } = req.query;

  const accessToken = jwt.sign(
    { name: username, isAdmin: false },
    process.env.ACCESS_TOKEN
  );
  const refreshToken = jwt.sign(
    { name: username, isAdmin: false },
    process.env.REFRESH_TOKEN
  );
  // console.log(jwt.verify(accessToken, process.env.ACCESS_TOKEN))
  return res
    .status(200)
    .json({ accessToken: accessToken, refreshToken: refreshToken });
}

const genAccessToken = (user: string) => {
  jwt.sign(user, process.env.ACCESS_TOKEN, { expiresIn: "15s" });
};
