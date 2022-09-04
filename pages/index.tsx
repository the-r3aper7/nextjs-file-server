import Head from "next/head";
import {
  Container,
  Center,
  SimpleGrid,
  Card,
  Text,
  Space,
} from "@mantine/core";
import { NextLink } from "@mantine/next";
import dynamic from "next/dynamic";

const Login = dynamic(() => import("../components/AuthComponents/Login"), {
  ssr: true,
});

export default function Home() {
  return (
    <Container>
      <Head>
        <title>File Server</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <SimpleGrid cols={2} spacing="lg">
        <Card
          shadow={"sm"}
          p={"lg"}
          withBorder={true}
          component={NextLink}
          href={"/public"}>
          <Space h={1} />
          <Center>
            <Text>Public Files</Text>
          </Center>
        </Card>
        <Card shadow={"sm"} p={"lg"} withBorder={true}>
          <Center>
            <Text>Login</Text>
          </Center>
        </Card>
      </SimpleGrid>
      <Login />
    </Container>
  );
}
