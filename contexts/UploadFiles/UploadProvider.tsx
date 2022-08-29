import uploadFileContext from "./UploadContext";
import { useState } from "react";
import axios, { AxiosRequestConfig } from "axios";
import { useSWRConfig } from "swr";
import { useRouter } from "next/router";
import { convertHumanFileSize } from "../../utils/humanFileSize";

const UploadProvider = ({ children }) => {
  const [progress, setProgress] = useState<number>();
  const [fileSize, setFileSize] = useState<string>();
  const [uploadedFileSize, setUploadFileSize] = useState<string>();
  const [status, setStatus] = useState<number>();
  const [message, setMessage] = useState<string>();
  const { params } = useRouter().query as { params: string[] };
  const currPath: string = params ? params.join("/") : "";

  const { mutate } = useSWRConfig();

  const uploadFiles = (files: File[], uploadPath: string) => {
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("file", files[i]);
    }

    const config: AxiosRequestConfig = {
      params: { path: uploadPath },
      onUploadProgress: (data) => {
        let percentCompleted: number = Math.round(
          (data.loaded * 100) / data.total
        );
        setUploadFileSize(convertHumanFileSize(data.loaded));
        setFileSize(convertHumanFileSize(data.total));
        setProgress(percentCompleted);
      },
    };

    axios
      .post("/api/upload", data, config)
      .then((res) => {
        setStatus(res.status);
        setMessage(res.data.message);
        mutate(["/api/get-files", currPath]);
        setFileSize(null);
        setUploadFileSize(null);
        setProgress(null);
      })
      .catch((err) => {
        setStatus(err);
        setMessage(err.message);
      });
  };

  return (
    <uploadFileContext.Provider
      value={{
        progress,
        status,
        uploadFiles,
        message,
        fileSize,
        uploadedFileSize,
      }}
    >
      {children}
    </uploadFileContext.Provider>
  );
};

export default UploadProvider;
