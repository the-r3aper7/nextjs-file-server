import { createContext } from "react";

interface contextTypes {
  status: number;
  progress: number;
  fileSize: string;
  uploadedFileSize: string;
  uploadFiles: Function;
  message: string;
}

const uploadFileContext = createContext<contextTypes | null>(null);

export default uploadFileContext;
