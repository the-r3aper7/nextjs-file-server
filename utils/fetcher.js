import axios from "axios";

// only for /api/get-files
export default async function fetcher(url, path) {
  const res = await axios.get(url, { params: { path: path } });
  return res.data;
}
