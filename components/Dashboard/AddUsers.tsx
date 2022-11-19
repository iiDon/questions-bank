import { VStack, Flex, useDisclosure, Text } from "@chakra-ui/react";
import React from "react";
import { AiOutlineUserAdd } from "react-icons/ai";

interface Props {
  onOpen: () => void;
}

const AddUsers = (Props: Props) => {
  return (
    <VStack mx={8}>
      <Flex
        onClick={Props.onOpen}
        cursor="pointer"
        justifyContent="center"
        rounded="md"
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
        <AiOutlineUserAdd size="3rem" />
      </Flex>
      <Text fontSize="lg" textColor="white" textAlign="center">
        Add A User
      </Text>
    </VStack>
  );
};

export default AddUsers;
