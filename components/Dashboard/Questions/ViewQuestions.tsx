import { VStack, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { AiOutlineFolderView } from "react-icons/ai";



// #4BC0C0   #4BC0f0
const ViewQuestions = () => {
  
  return (
    <Link href="dashboard/questions">
      <VStack>
        <Flex
          cursor="pointer"
          justifyContent="center"
          rounded="xl"
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
          <AiOutlineFolderView size="3rem" />
        </Flex>
        <Text fontSize="lg" textColor="white" textAlign="center">
          View Questions
        </Text>
      </VStack>
    </Link>
  );
};

export default ViewQuestions;
