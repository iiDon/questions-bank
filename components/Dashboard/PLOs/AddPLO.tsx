import { VStack, Flex, useDisclosure, Text } from "@chakra-ui/react";
import React from "react";
import { AiOutlineFolderAdd } from "react-icons/ai";
import AddPLOsModal from "./AddPLOsModal";
import AddTypeModal from "../Types/AddTypeModal";

const AddPLO = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <VStack>
      <AddPLOsModal isOpen={isOpen} onClose={onClose} />
      <Flex
        onClick={onOpen}
        cursor="pointer"
        justifyContent="center"
        rounded="md"
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
        Add A PLO
      </Text>
    </VStack>
  );
};

export default AddPLO;
