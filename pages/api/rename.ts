import { NextApiRequest, NextApiResponse } from "next";
import { IncomingForm, Fields } from "formidable";
import { rename } from "fs/promises";
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
  if (req.method === "PUT") {
    const data = (await new Promise((resolve, reject) => {
      const form = new IncomingForm({
        multiples: true,
      });
      form.parse(req, (err, fields) => {
        if (err) return reject(err);
        resolve({ fields });
      });
    })) as { fields: Fields };

    const { from, to } = data.fields as { from: string; to: string };

    try {
      await rename(join(publicPath, from), join(publicPath, to));
      return res.status(200).json({ message: "File Renamed !" });
    } catch (error) {
      return res.status(500).json({ message: "some error occured" });
    }
  } else {
    return res.status(405).end();
  }
}
