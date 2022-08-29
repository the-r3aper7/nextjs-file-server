import React, { useState } from "react";
import { Card, Group, Badge, Text, Modal, Space } from "@mantine/core";
import { elementalData } from "../../interfaces";
import FileCardMenu from "./MenuComponent/FileCardMenu";
import { NextLink } from "@mantine/next";

function FileCard(props: elementalData) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      {/* <Modal
        opened={open}
        onClose={() => setOpen(false)}
        title={props.name}
        size="55%"
      >
        <video src={`/api/stream?path=${props.fpath}`} width="720" controls />
        <iframe src={`/api/stream?path=${props.fpath}`}></iframe>
      </Modal> */}

      <Card shadow="sm" p="lg" withBorder={true}>
        <Space h={1} />
        <Group position="apart" mb={5}>
          <Text
            lineClamp={1}
            component={NextLink}
            href={`/api/stream?path=${props.fpath}`}
            // onClick={() => setOpen(true)}
          >
            {props.name}
          </Text>
          <Group position="right">
            <Badge color="pink" variant="light">
              {props.extenstion.replace(".", "")}
            </Badge>

            <FileCardMenu {...props} />
          </Group>
        </Group>
      </Card>
    </>
  );
}

export default FileCard;
