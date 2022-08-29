import { NextApiRequest, NextApiResponse } from "next";
import { Fields, IncomingForm } from "formidable";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const data = (await new Promise((resolve, reject) => {
      const form = new IncomingForm({
        multiples: true,
      });
      form.parse(req, (err, fields) => {
        if (err) return reject(err);
        resolve({ fields });
      });
    })) as { fields: Fields };
    return res.status(200).json({ status: "logged in" });
  } else {
    return res.status(405).end();
  }
}
