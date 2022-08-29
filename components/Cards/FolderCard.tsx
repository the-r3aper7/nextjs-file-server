import React from "react";
import { Card, Group, Badge, Text, Center, Space } from "@mantine/core";
import { elementalData } from "../../interfaces";
import { NextLink } from "@mantine/next";

function FolderCard(props: elementalData) {
  return (
    <Card shadow="sm" p="lg" withBorder={true}>
      {/* <Card.Section>
        <Center><Image src={"/folder.svg"} width={150} /></Center>
      </Card.Section> */}
      <Space h={1} />
      <Group position="apart" mb={5}>
        <Text
          lineClamp={1}
          component={NextLink}
          href={`/public/${props.fpath}`}
        >
          {props.name}
        </Text>
        <Group position="right">
          <Badge color="pink" variant="light">
            folder
          </Badge>

          {/* <Menu>
            <Menu.Label>Info</Menu.Label>
            <Menu.Item>Details</Menu.Item>
            <Menu.Item>Rename</Menu.Item>

            <Divider variant="dashed" />

            <Menu.Label>Danger zone</Menu.Label>
            <Menu.Item color={"red"}>Delete</Menu.Item>
          </Menu> */}
        </Group>
      </Group>
    </Card>
  );
}

export default FolderCard;
