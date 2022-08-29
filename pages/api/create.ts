import { NextApiRequest, NextApiResponse } from "next";
import { IncomingForm, Fields } from "formidable";
import { mkdir } from "fs/promises";
import { join } from "path";

const publicPath: string = process.env.SHARED_DISK;

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

    const { foldername, type, path } = data.fields as {
      foldername: string;
      type: string;
      path: string;
    };

    try {
      await mkdir(join(publicPath, path, foldername));
      return res.status(201).json({ message: "Folder created" });
    } catch (error) {
      console.log(error.code);
      if (error.code === "EEXIST") {
        return res.status(403).json({ message: "folder already exists" });
      }
      return res.status(500).json({ message: "some error occured" });
    }
  } else {
    return res.status(405).end();
  }
}
