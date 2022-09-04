import React, { useContext } from "react";
import { createStyles, Header, Progress, ActionIcon } from "@mantine/core";
import { IconCloudUpload } from "@tabler/icons";
import uploadFileContext from "../../contexts/UploadFiles/UploadContext";
import Search from "./Search";
import { NextLink } from "@mantine/next";
import dynamic from "next/dynamic";

const UploadModal = dynamic(() => import("./UploadComponents/Upload"), {
  ssr: true,
});

const useStyles = createStyles((theme) => ({
  header: {
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
  },

  inner: {
    height: 56,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));

function Navbar() {
  const { classes } = useStyles();
  const { progress, fileSize, uploadedFileSize } =
    useContext(uploadFileContext);

  return (
    <>
      <Header height={56} className={classes.header} mb={5}>
        <div className={classes.inner}>
          <ActionIcon
            component={NextLink}
            href={"/public"}
            size={"xl"}
            mx={"xs"}>
            <IconCloudUpload size={26} />
          </ActionIcon>
          <Search />
          <UploadModal />
        </div>
        {progress && uploadedFileSize && fileSize && (
          <Progress
            size={"xl"}
            value={progress}
            mt={4.5}
            label={`( ${uploadedFileSize} / ${fileSize} ) / ${progress}%`}
          />
        )}
      </Header>
    </>
  );
}

export default Navbar;
