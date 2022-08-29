import { Button, Group, TextInput } from "@mantine/core";
import axios from "axios";
import { useRouter } from "next/router";
import React, { FormEvent, useState } from "react";
import { useSWRConfig } from "swr";

function CreateFolderModal(props: { toggleModal: React.SetStateAction<any> }) {
  const { params } = useRouter().query as { params: string[] };
  const path: string = params ? params.join("/") : "";
  const [folderName, setFolderName] = useState<string>("");

  const { mutate } = useSWRConfig();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData();

    form.append("foldername", folderName);
    form.append("path", path);
    form.append("type", "folder");

    axios.post("/api/create", form).then((res) => {
      props.toggleModal();
      mutate(["/api/get-files", path]);
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <TextInput
          type={"text"}
          value={folderName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setFolderName(e.target.value);
          }}
          placeholder="Enter File/FolderName"
          my={"sm"}
        />
        <Group position={"center"}>
          <Button type={"submit"}>Submit</Button>
        </Group>
      </form>
    </>
  );
}

export default CreateFolderModal;
