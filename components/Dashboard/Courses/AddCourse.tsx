import { VStack, Flex, useDisclosure, Text } from "@chakra-ui/react";
import React from "react";
import { AiOutlineFolderAdd } from "react-icons/ai";
import AddCoursesModal from "./AddCoursesModal";

const AddCourse = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <VStack>
      <AddCoursesModal isOpen={isOpen} onClose={onClose} />
      <Flex
        onClick={onOpen}
        cursor="pointer"
        justifyContent="center"
        rounded="xl"
        shadow="lg"
        bg="green.200"
        _hover={{
          bg: "green.300",
          transform: "scale(1.05)",
          transition: "all 0.2s ease-in-out",
        }}
        p={4}
        alignItems="center"
      >
        <AiOutlineFolderAdd size="3rem" />
      </Flex>
      <Text fontSize="lg" textColor="white" textAlign="center">
        Add A Course
      </Text>
    </VStack>
  );
};

export default AddCourse;
