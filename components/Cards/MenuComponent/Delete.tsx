import { Menu } from "@mantine/core";
import { useNotifications } from "@mantine/notifications";
import { IconTrash } from "@tabler/icons";
import axios from "axios";
import { useRouter } from "next/router";
import { useSWRConfig } from "swr";

interface propsType {
  fpath: string;
  name: string;
}

function Delete(props: propsType) {
  const { params } = useRouter().query as { params: string[] };
  const notification = useNotifications();
  const { mutate } = useSWRConfig();

  const handleDelete = () => {
    const path: string = params ? params.join("/") : "";
    axios
      .delete("/api/delete-file", {
        params: { path: props.fpath },
      })
      .then((res) => {
        notification.showNotification({
          color: "red",
          title: "File Deleted",
          message: `${props.name} was deleted!`,
        });
        mutate(["/api/get-files", path]);
      });
  };

  return (
    <Menu.Item
      color={"red"}
      icon={<IconTrash size={16} />}
      onClick={handleDelete}
    >
      Delete
    </Menu.Item>
  );
}

export default Delete;
