import { VStack, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { AiOutlineFolderView } from "react-icons/ai";

interface Props {
  onOpen: () => void;
}
const ViewUsers = (Props: Props) => {
  return (
    <Link href="#">
      <VStack>
        <Flex
          onClick={Props.onOpen}
          cursor="pointer"
          justifyContent="center"
          rounded="xl"
          shadow="lg"
          bg="#FF6384"
          _hover={{
            bg: "#FF6363",
            transform: "scale(1.05)",
            transition: "all 0.2s ease-in-out",
          }}
          p={4}
          alignItems="center"
        >
          <AiOutlineFolderView size="3rem" />
        </Flex>
        <Text fontSize="lg" textColor="white" textAlign="center">
          View Users
        </Text>
      </VStack>
    </Link>
  );
};

export default ViewUsers;
