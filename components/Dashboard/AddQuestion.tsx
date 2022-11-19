import { VStack, Flex, useDisclosure, Text } from "@chakra-ui/react";
import React from "react";
import { AiOutlineFolderAdd } from "react-icons/ai";

interface Props {
  onOpen: () => void;
}

const AddQuestion = (Props: Props) => {
  return (
    <VStack mx={8}>
      <Flex
        onClick={Props.onOpen}
        cursor="pointer"
        justifyContent="center"
        rounded="md"
        shadow="lg"
        bg="#FF9F40"
        _hover={{
          bg: "#FF9F70",
          transform: "scale(1.05)",
          transition: "all 0.2s ease-in-out",
        }}
        p={4}
        alignItems="center"
      >
        <AiOutlineFolderAdd size="3rem" />
      </Flex>
      <Text fontSize="lg" textColor="white" textAlign="center">
        Add A Question
      </Text>
    </VStack>
  );
};

export default AddQuestion;
