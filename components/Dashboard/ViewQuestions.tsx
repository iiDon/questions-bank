import { VStack, Flex, useDisclosure, Text } from "@chakra-ui/react";
import React from "react";
import { AiOutlineFolderView } from "react-icons/ai";

interface Props {
  onOpen: () => void;
}

const ViewQuestions = (Props: Props) => {
  return (
    <VStack mx={8}>
      <Flex
        onClick={Props.onOpen}
        cursor="pointer"
        justifyContent="center"
        rounded="md"
        shadow="lg"
        bg="#4BC0C0"
        _hover={{
          bg: "#4BC0f0",
          transform: "scale(1.05)",
          transition: "all 0.2s ease-in-out",
        }}
        p={4}
        alignItems="center"
      >
        <AiOutlineFolderView size="3rem" />
      </Flex>
      <Text fontSize="lg" textColor="white" textAlign="center">
        View Questions
      </Text>
    </VStack>
  );
};

export default ViewQuestions;
