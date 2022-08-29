import { readdir, lstat } from "fs/promises";
import { join, posix, basename, extname } from "path";
import { NextApiRequest, NextApiResponse } from "next";
import { elementalData } from "../../interfaces";
// import jwt from "jsonwebtoken";

// interface jwtUser {
//   name: string;
//   isAdmin: boolean;
//   iat: number;
// }

const publicPath: string = process.env.SHARED_DISK;

// const verifyJWT = (req: NextApiRequest, res: NextApiResponse) => {
//   const token: string =
//     req.headers["authorization"] && req.headers["authorization"].split(" ")[1];
//   if (token == null) return res.status(401).end({ error: "No Token" });
//   const userData = jwt.verify(
//     token,
//     process.env.ACCESS_TOKEN,
//     (err, user: jwtUser) => {
//       if (err) return res.status(403).end({ error: "Invalid Token" });
//       return user;
//     }
//   );
//   return userData;
// };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // verifyJWT(req, res);
  let { path } = req.query as { path: string };
  let files: elementalData[] = [];
  const directoryFiles = await readdir(join(publicPath, path));

  for await (const element of directoryFiles) {
    let file = await lstat(join(publicPath, path, element));

    if (file.isDirectory()) {
      files.push({
        name: element,
        type: "folder",
        size: null,
        extenstion: "folder",
        fpath: posix.join(path, element),
      });
    } else if (file.isFile()) {
      files.push({
        name: basename(join(publicPath, element)),
        type: "file",
        extenstion: extname(join(path, element)),
        size: file.size,
        fpath: posix.join(path, element),
      });
    }
  }

  return res.status(200).json({ files });
}
