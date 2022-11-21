import { VStack, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { AiOutlineFolderAdd } from "react-icons/ai";

interface Props {
  onOpen: () => void;
}

const ViewPLOs = (Props: Props) => {
  return (
    <Link href="#">
      <VStack>
        <Flex
          onClick={Props.onOpen}
          cursor="pointer"
          justifyContent="center"
          rounded="xl"
          shadow="lg"
          bg="#C9CBCF"
          _hover={{
            bg: "#C9CBC2",
            transform: "scale(1.05)",
            transition: "all 0.2s ease-in-out",
          }}
          p={4}
          alignItems="center"
        >
          <AiOutlineFolderAdd size="3rem" />
        </Flex>
        <Text fontSize="lg" textColor="white" textAlign="center">
          View PLOs
        </Text>
      </VStack>
    </Link>
  );
};

export default ViewPLOs;
