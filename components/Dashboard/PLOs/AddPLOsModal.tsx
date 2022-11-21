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

const AddPLOsModal = ({ isOpen, onClose }: Props) => {
  const { refetch } = trpc.plos.getAll.useQuery();
  const createPLO = trpc.plos.createPLO.useMutation({
    onSuccess: () => {
      toast({
        position: "top",
        title: "Success",
        description: "You have successfully created a new type",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      refetch();
      onClose();
    },
    onError: () => {
      toast({
        position: "top",
        title: "Error",
        description: createPLO.error?.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
  });
  const toast = useToast();

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    onSubmit: (values) => {
      createPLO.mutate(values);
      formik.resetForm();
      onClose();
    },
  });

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <form onSubmit={formik.handleSubmit}>
          <ModalContent>
            <ModalHeader>Add A New PLO</ModalHeader>
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

export default AddPLOsModal;
