import send from "send";
import { lookup } from "mime-types";
import { NextApiRequest, NextApiResponse } from "next";
import { basename, join } from "path";

const publicPath = process.env.SHARED_DISK;

export const config = {
  api: {
    bodyParser: {
      responseLimit: 123456789 ** 123456789, // Set desired value here
    },
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { path } = req.query as { path: string };
  const filePath: string = join(publicPath, path);
  const filename: string = basename(filePath);
  const type = lookup(filename);
  res.setHeader("Content-Type", `${type}`);
  await new Promise((resolve) => {
    send(req, filePath).on("end", resolve).pipe(res);
  });
}
