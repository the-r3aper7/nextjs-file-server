import { join } from "path";
import busboy from "busboy";
import { NextApiRequest, NextApiResponse } from "next";
import { createWriteStream } from "fs";
import { unlink } from "fs/promises";

const publicPath: string = process.env.SHARED_DISK;

export const config = {
  api: {
    bodyParser: false,
  },
};

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { path } = req.query as { path: string };
    const bb = busboy({ headers: req.headers });
    // Handling uploading data
    const writeFile = new Promise<void>(() => {
      bb.on("file", async (_, file, info) => {
        const filename = info.filename;
        const filePath = join(publicPath, path, filename);

        const writeFileStream = createWriteStream(filePath);

        file.pipe(writeFileStream);

        req.on("close", () => {
          writeFileStream.end();
          res.status(201).json({ message: "file uploaded" });
          res.end();
        });
        req.on("error", () => {
          unlink(join(publicPath, path, filename));
          res.end();
        });
      });

      bb.on("error", async (error) => {
        console.log(error);
        res.status(500).json({ messge: "some error occured" });
        res.end();
      });
      req.pipe(bb);
    });
    await writeFile;
  }
}

export default handler;
