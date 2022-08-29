import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import "../styles/globals.css";
import { Navbar } from "../components";
import { NotificationsProvider } from "@mantine/notifications";
import { UploadProvider } from "../contexts";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider theme={{ colorScheme: "dark" }}>
      <NotificationsProvider>
        <UploadProvider>
          <Navbar />
          <Component {...pageProps} />
        </UploadProvider>
      </NotificationsProvider>
    </MantineProvider>
  );
}

export default MyApp;
