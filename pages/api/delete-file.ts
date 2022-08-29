import { NextApiRequest, NextApiResponse } from "next";
import { join } from "path";
import { unlink } from "fs/promises";

const publicPath: string = process.env.SHARED_DISK;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "DELETE") return;
  const { path } = req.query as { path: string };
  try {
    await unlink(join(publicPath, path));
  } catch (error) {
    res.status(404).json({ status: "some error occured" });
  }
  return res.status(204).end();
}
