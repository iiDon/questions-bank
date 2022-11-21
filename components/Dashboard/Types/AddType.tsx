import { VStack, Flex, useDisclosure, Text } from "@chakra-ui/react";
import React from "react";
import { AiOutlineFolderAdd } from "react-icons/ai";
import AddTypeModal from "./AddTypeModal";

const AddType = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <VStack>
      <AddTypeModal isOpen={isOpen} onClose={onClose} />
      <Flex
        onClick={onOpen}
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
        Add A Type
      </Text>
    </VStack>
  );
};

export default AddType;
