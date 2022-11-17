// 1. Import `extendTheme`
import { extendTheme } from "@chakra-ui/react";
import "roboto-fontface";

export const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "sky",
        fontFamily: "Roboto",
      },
    },
  },
  colors: {
    sky: "#5E91F8",
  },
});
