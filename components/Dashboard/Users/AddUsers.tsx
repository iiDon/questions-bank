import {
  VStack,
  Flex,
  useDisclosure,
  Text,
  useToast,
  useControllableState,
} from "@chakra-ui/react";
import React from "react";
import { AiOutlineUserAdd } from "react-icons/ai";
import { trpc } from "../../../src/utils/trpc";
import AddUserModal from "./AddUserModal";

const AddUsers = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: session } = trpc.auth.getSession.useQuery();
  const toast = useToast();
  const createUser = trpc.auth.register.useMutation({
    onSuccess: () => {
      toast({
        position: "top",
        title: "User created",
        description: "User has been created successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onClose();
    },
    onError: () => {
      toast({
        position: "top",
        title: "Error",
        description: createUser.error?.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    },
  });

  return (
    <VStack>
      <AddUserModal onClose={onClose} isOpen={isOpen} />
      <Flex
        onClick={onOpen}
        cursor="pointer"
        justifyContent="center"
        rounded="xl"
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
