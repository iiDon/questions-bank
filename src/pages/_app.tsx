import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ChakraProvider } from "@chakra-ui/react";
import { trpc } from "../utils/trpc";

import "../styles/globals.css";
import { theme } from "../styles/themes";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
      <ChakraProvider theme={theme}>
    <SessionProvider session={session}>
        <Component {...pageProps} />
    </SessionProvider>
      </ChakraProvider>
  );
};

export default trpc.withTRPC(MyApp);
