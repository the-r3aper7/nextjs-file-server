import { Modal, Button, Group, TextInput } from "@mantine/core";
import React, { FormEvent, useState } from "react";
import { useNotifications } from "@mantine/notifications";
import axios from "axios";
import { useRouter } from "next/router";
import { useSWRConfig } from "swr";

interface propsType {
  open: boolean;
  setOpen: React.SetStateAction<any>;
  name: string;
  fpath: string;
}

function RenmeModal(props: propsType) {
  const [renameFileText, setRenameFileText] = useState<string>(props.name);

  const { params } = useRouter().query as { params: string[] };
  const notification = useNotifications();
  const { mutate } = useSWRConfig();

  const handleRename = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const path: string = params ? params.join("/") : "";
    const form = new FormData();

    form.append("from", props.fpath);
    form.append("to", props.fpath.replace(props.name, renameFileText));

    axios.put("/api/rename", form).then((res) => {
      mutate(["/api/get-files", path]);
      props.setOpen(false);
      setRenameFileText("");
      notification.showNotification({
        color: "blue",
        title: "Renamed",
        message: `${props.name} was renamed !`,
      });
    });
  };
  return (
    <Modal
      opened={props.open}
      onClose={() => props.setOpen(false)}
      title={`Rename :- ${props.name}`}
      centered
    >
      <form onSubmit={handleRename}>
        <TextInput
          type={"text"}
          value={renameFileText}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setRenameFileText(e.target.value);
          }}
          placeholder="Enter File/FolderName"
          my={"sm"}
        />
        <Group position={"center"}>
          <Button type={"submit"}>Submit</Button>
        </Group>
      </form>
    </Modal>
  );
}

export default RenmeModal;
