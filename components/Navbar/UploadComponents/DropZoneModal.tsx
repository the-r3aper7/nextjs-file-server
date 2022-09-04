import {
  Text,
  Group,
  Button,
  createStyles,
  useMantineTheme,
} from "@mantine/core";
import { Dropzone } from "@mantine/dropzone";
import { IconPhoto, IconUpload } from "@tabler/icons";
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
        radius="md">
        <Group
          position="center"
          spacing="xl"
          style={{ minHeight: 220, pointerEvents: "none" }}>
          <Dropzone.Accept>
            <IconUpload
              size={50}
              stroke={1.5}
              color={
                theme.colors[theme.primaryColor][
                  theme.colorScheme === "dark" ? 4 : 6
                ]
              }
            />
          </Dropzone.Accept>

          <Dropzone.Idle>
            <IconPhoto size={100} stroke={1.5} />
          </Dropzone.Idle>

          <Text size="xl" inline>
            Drag images here or click to select files
          </Text>
        </Group>
      </Dropzone>

      <Button
        className={classes.control}
        size="md"
        radius="xl"
        onClick={() => openRef.current()}>
        Select files
      </Button>
    </div>
  );
}

export default DropZoneModal;
