import {
  Text,
  Group,
  Button,
  createStyles,
  MantineTheme,
  useMantineTheme,
} from "@mantine/core";
import { Dropzone, DropzoneStatus } from "@mantine/dropzone";
import { IconCloudUpload } from "@tabler/icons";
import uploadFileContext from "../../../contexts/UploadFiles/UploadContext";
import { useRouter } from "next/router";
import { useSWRConfig } from "swr";
import { useContext, useRef } from "react";

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: "relative",
    marginBottom: 30,
  },

  dropzone: {
    borderWidth: 1,
    paddingBottom: 50,
  },

  icon: {
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[3]
        : theme.colors.gray[4],
  },

  control: {
    position: "absolute",
    width: 250,
    left: "calc(50% - 125px)",
    bottom: -20,
  },
}));

function getActiveColor(status: DropzoneStatus, theme: MantineTheme) {
  return status.accepted
    ? theme.colors[theme.primaryColor][6]
    : status.rejected
    ? theme.colors.red[6]
    : theme.colorScheme === "dark"
    ? theme.colors.dark[0]
    : theme.black;
}

interface propsTypes {
  setModalOpen: React.SetStateAction<any>;
}

function DropZoneModal(props: propsTypes) {
  const theme = useMantineTheme();
  const { classes } = useStyles();
  const openRef = useRef<() => void>();
  const { uploadFiles } = useContext(uploadFileContext);
  const { params } = useRouter().query as { params: string[] };
  const currentPath: string = params ? params.join("/") : "";
  const { mutate } = useSWRConfig();

  const handleOnDrop = async (files: File[]) => {
    props.setModalOpen();
    await uploadFiles(files, currentPath);
    mutate(["/api/get-files", currentPath]);
  };

  return (
    <div className={classes.wrapper}>
      <Dropzone
        openRef={openRef}
        onDrop={handleOnDrop}
        className={classes.dropzone}
        radius="md"
      >
        {(status) => (
          <div style={{ pointerEvents: "none" }}>
            <Group position="center">
              <IconCloudUpload
                size={50}
                color={getActiveColor(status, theme)}
              />
            </Group>
            <Text
              align="center"
              weight={700}
              size="lg"
              mt="xl"
              sx={{ color: getActiveColor(status, theme) }}
            >
              {status.accepted
                ? "Drop files here"
                : status.rejected
                ? "Some Error Occured"
                : "Upload Files"}
            </Text>
            <Text align="center" size="sm" mt="xs" color="dimmed">
              Drag and Drop your files here
            </Text>
          </div>
        )}
      </Dropzone>

      <Button
        className={classes.control}
        size="md"
        radius="xl"
        onClick={() => openRef.current()}
      >
        Select files
      </Button>
    </div>
  );
}

export default DropZoneModal;
