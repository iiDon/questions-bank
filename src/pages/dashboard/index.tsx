import { Button, Flex, Text, useDisclosure } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import AddQuestionModal from "../../../components/Dashboard/AddQuestionModal";
import Unauthenticated from "../../../components/Unauthenticated";

const Index = () => {
  const { status } = useSession();
  const { onOpen, isOpen, onClose } = useDisclosure();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    return <Unauthenticated />;
  }

  return (
    <>
      <AddQuestionModal isOpen={isOpen} onClose={onClose} />
      <Flex justifyContent="center" alignItems="center" h="100vh">
        <Flex
          onClick={onOpen}
          cursor="pointer"
          justifyContent="center"
          rounded="md"
          shadow="lg"
          bg="gray.200"
          _hover={{
            bg: "gray.300",
            transform: "scale(1.05)",
            transition: "all 0.2s ease-in-out",
          }}
          p={4}
          m={4}
          alignItems="center"
        >
          <Text fontWeight="bold" fontSize="2xl">
            Add A Question
          </Text>
        </Flex>
      </Flex>
    </>
  );
};

export default Index;
