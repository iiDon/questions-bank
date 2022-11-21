import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  ModalHeader,
  FormControl,
  FormLabel,
  Input,
  Flex,
  Radio,
  RadioGroup,
  useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import React from "react";
import { trpc } from "../../../src/utils/trpc";

export interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const AddUserModal = ({ isOpen, onClose }: Props) => {
  const [role, setRole] = React.useState("USER");
  const toast = useToast();
  const createUser = trpc.auth.register.useMutation({
    onSuccess: () => {
      toast({
        position: "top",
        title: "Success",
        description: "You have successfully created a new user",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onClose();
    },
    onError: (err) => {
      toast({
        position: "top",
        title: "Error",
        description: err.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      password: "",
      role,
    },
    onSubmit: (values) => {
      values.role = role;
      createUser.mutate({
        email: values.email,
        name: values.name,
        password: values.password,
        role: values.role,
      });
      formik.resetForm();
    },
  });

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <form onSubmit={formik.handleSubmit}>
          <ModalContent>
            <ModalHeader>Add A New User</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl isRequired>
                <FormLabel htmlFor="name">Name:</FormLabel>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                />
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                />
                <FormLabel htmlFor="password">Role</FormLabel>
                <RadioGroup onChange={setRole} defaultValue={role} mb={5}>
                  <Flex justifyContent="space-around">
                    <Radio colorScheme="blue" value="USER">
                      Faculty
                    </Radio>
                    <Radio colorScheme="blue" value="ADMIN">
                      Admin
                    </Radio>
                  </Flex>
                </RadioGroup>
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button mr={3} bg="sky" textColor="white" type="submit">
                Submit
              </Button>
              <Button onClick={onClose}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
};

export default AddUserModal;
