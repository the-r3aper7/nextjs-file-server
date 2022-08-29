import { NextApiRequest, NextApiResponse } from "next";

import { readdir, lstat } from "fs/promises";
import { join, extname, posix, basename } from "path";
import { elementalData } from "../../interfaces";

const publicPath: string = process.env.SHARED_DISK;

const recursiveReadDir = async (dir: string, q: string, filelist = []) => {
  const files = await readdir(dir);
  for await (const file of files) {
    const filepath = join(dir, file);
    const stat = await lstat(filepath);

    if (stat.isDirectory()) {
      filelist = await recursiveReadDir(filepath, q, filelist);
    } else if (basename(filepath).includes(q)) {
      filelist.push({
        name: basename(filepath),
        type: "file",
        extenstion: extname(filepath),
        size: stat.size,
        fpath: posix
          .join(dir, file)
          .replaceAll("\\", "/")
          .replace(publicPath, ""),
      });
    }
  }

  return filelist;
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { q } = req.query as { q: string };
  const data: elementalData[] = await recursiveReadDir(publicPath, q);
  res.status(200).json({ data });
}
