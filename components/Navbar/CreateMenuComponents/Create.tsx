import {
  createStyles,
  Menu,
  Group,
  ActionIcon,
  Modal,
  Text,
} from "@mantine/core";
import { useToggle } from "@mantine/hooks";
import { IconFolder, IconPlus } from "@tabler/icons";
import React from "react";
import CreateFolderModal from "./CreateFolderModal";

const useStyles = createStyles((theme) => ({
  button: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },

  menuControl: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    border: 0,
    borderLeft: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white
    }`,
  },
}));

function Create() {
  const { classes, theme } = useStyles();
  const [open, toggleOpen] = useToggle<boolean>([false, true]);

  return (
    <>
      <Modal opened={open} onClose={() => toggleOpen()} title={"Create folder"}>
        <CreateFolderModal toggleModal={toggleOpen} />
      </Modal>

      <Group noWrap spacing={0}>
        <Menu transition={"scale-y"} position={"bottom-end"}>
          <Menu.Target>
            <ActionIcon
              variant="filled"
              color={theme.primaryColor}
              size={36}
              className={classes.menuControl}>
              <IconPlus size={24} stroke={3} />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item
              icon={<IconFolder size={16} />}
              onClick={() => toggleOpen()}>
              <Text lineClamp={1}>Create folder</Text>
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
    </>
  );
}

export default Create;
