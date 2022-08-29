import { createStyles, Menu, Group, ActionIcon, Modal } from "@mantine/core";
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
  const [open, toggleOpen] = useToggle<boolean>(false, [false, true]);

  return (
    <>
      <Modal opened={open} onClose={() => toggleOpen()} title={"Create folder"}>
        <CreateFolderModal toggleModal={toggleOpen} />
      </Modal>
      <Group noWrap spacing={0}>
        <Menu
          control={
            <ActionIcon
              variant="filled"
              color={theme.primaryColor}
              size={36}
              className={classes.menuControl}
            >
              <IconPlus size={16} />
            </ActionIcon>
          }
          transition={"scale-y"}
          placement={"center"}
        >
          <Menu.Item
            icon={<IconFolder size={16} />}
            onClick={() => toggleOpen()}
          >
            Create folder
          </Menu.Item>
        </Menu>
      </Group>
    </>
  );
}

export default Create;
