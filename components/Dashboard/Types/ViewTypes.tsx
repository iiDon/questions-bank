import { VStack, Flex, useDisclosure, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { AiOutlineFolderAdd } from "react-icons/ai";

const ViewTypes = () => {
  return (
    <Link href="#">
      <VStack>
        <Flex
          cursor="pointer"
          justifyContent="center"
          rounded="md"
          shadow="lg"
          bg="yellow.100"
          _hover={{
            bg: "yellow.200",
            transform: "scale(1.05)",
            transition: "all 0.2s ease-in-out",
          }}
          p={4}
          alignItems="center"
        >
          <AiOutlineFolderAdd size="3rem" />
        </Flex>
        <Text fontSize="lg" textColor="white" textAlign="center">
          View Types
        </Text>
      </VStack>
    </Link>
  );
};

export default ViewTypes;
