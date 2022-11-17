import { Button, Flex, Text, VStack } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

const Unauthenticated = () => {
  return (
    <Flex justifyContent="center" alignItems="center" h="100vh">
      <VStack bg="gray.200" w="30rem" p={5} rounded="md" shadow="lg">
        <Text>
          Sorry you are unauthenticated to access this page, signin then try
          again
        </Text>
        <Link href="/auth/signin">
          <Button
            _hover={{ bg: "blue.800" }}
            type="submit"
            w="100%"
            bg="sky"
            textColor="white"
          >
            Sign in
          </Button>
        </Link>
      </VStack>
    </Flex>
  );
};

export default Unauthenticated;
