import { elementalData } from "../../../interfaces";
import { Menu, Divider, Button, ActionIcon } from "@mantine/core";
import { IconInfoCircle, IconPencil } from "@tabler/icons";
import Download from "./Download";
import Delete from "./Delete";
import { useState } from "react";
import RenmeModal from "./RenmeModal";
import { IconDots } from "@tabler/icons";

function FileCardMenu(props: elementalData) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <RenmeModal
        open={open}
        setOpen={setOpen}
        fpath={props.fpath}
        name={props.name}
      />
      <Menu withinPortal position="bottom">
        <Menu.Target>
          <ActionIcon>
            <IconDots size={16} />
          </ActionIcon>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Label>Info</Menu.Label>
          <Menu.Item icon={<IconInfoCircle size={16} />}>Details</Menu.Item>
          <Menu.Item
            onClick={() => setOpen(true)}
            color={"cyan"}
            icon={<IconPencil size={16} />}>
            Rename
          </Menu.Item>

          <Download fpath={props.fpath} />
          <Divider variant="dashed" />

          <Menu.Label>Danger zone</Menu.Label>

          <Delete fpath={props.fpath} name={props.name} />
        </Menu.Dropdown>
      </Menu>
    </>
  );
}

export default FileCardMenu;
