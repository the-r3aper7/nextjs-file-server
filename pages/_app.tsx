import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import "../styles/globals.css";
import { NotificationsProvider } from "@mantine/notifications";
import { UploadProvider } from "../contexts";
import dynamic from "next/dynamic";

const Navbar = dynamic(() => import("../components/Navbar/Navbar"), {
  ssr: true,
});

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
