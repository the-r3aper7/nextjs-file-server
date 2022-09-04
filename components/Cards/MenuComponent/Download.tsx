import { Menu } from "@mantine/core";
import { NextLink } from "@mantine/next";
import { IconDownload } from "@tabler/icons";

function Download(props: { fpath: string }) {
  return (
    <Menu.Item
      component={NextLink}
      color={"green"}
      icon={<IconDownload size={16} />}
      href={`/api/download?path=${encodeURIComponent(props.fpath)}`}>
      Download
    </Menu.Item>
  );
}

export default Download;
