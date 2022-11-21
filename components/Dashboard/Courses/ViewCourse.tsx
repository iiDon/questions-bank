import { VStack, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { AiOutlineFolderAdd } from "react-icons/ai";

const ViewCourses = () => {
  return (
    <Link href="#">
      <VStack>
        <Flex
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
          View Course
        </Text>
      </VStack>
    </Link>
  );
};

export default ViewCourses;
