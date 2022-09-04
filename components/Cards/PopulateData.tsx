import { Container, SimpleGrid } from "@mantine/core";
import Head from "next/head";
import { elementalData } from "../../interfaces";
import dynamic from "next/dynamic";

interface propsType {
  files: [elementalData];
}

const FileCard = dynamic(() => import("./FileCard"), {
  ssr: true,
});

const FolderCard = dynamic(() => import("./FolderCard"), {
  ssr: true,
});

function PopulateData(props: propsType) {
  return (
    <Container p={"lg"}>
      <Head>
        <title>Public Files</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SimpleGrid
        cols={2}
        spacing="sm"
        breakpoints={[{ maxWidth: 750, cols: 1, spacing: "sm" }]}>
        {props.files.map((element: elementalData, index: number) => {
          if (element.type === "folder") {
            // return <FolderCard {...element} key={index} />;
            return <FolderCard {...element} key={index} />;
          } else if (element.type === "file") {
            return <FileCard {...element} key={index} />;
          }
        })}
      </SimpleGrid>
    </Container>
  );
}

export default PopulateData;
