import { Group, Button, Modal, createStyles } from "@mantine/core";
import { IconUpload } from "@tabler/icons";
import { useToggle } from "@mantine/hooks";
import DropZoneModal from "./DropZoneModal";
import Create from "../CreateMenuComponents/Create";

const useStyles = createStyles(() => ({
  button: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
}));

function UploadModal() {
  const [opened, setOpened] = useToggle<boolean>([false, true]);
  const { classes } = useStyles();

  return (
    <>
      <Modal opened={opened} onClose={() => setOpened()} title="Upload Files!">
        <DropZoneModal setModalOpen={setOpened} />
      </Modal>

      <Group noWrap spacing={0}>
        <Button
          leftIcon={<IconUpload size={18} stroke={3} />}
          onClick={() => setOpened()}
          className={classes.button}>
          Upload
        </Button>
        <Create />
      </Group>
    </>
  );
}

export default UploadModal;
