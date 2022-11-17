// 1. Import `extendTheme`
import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "sky",
      },
    },
  },
  colors: {
    sky: "#5E91F8",
  },
});
