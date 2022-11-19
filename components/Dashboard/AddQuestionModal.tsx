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
} from "@chakra-ui/react";
import { useFormik } from "formik";

export interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const AddQuestionModal = ({ isOpen, onClose }: Props) => {
  const types = ["Multiple Choice", "True/False", "Short Answer"];

  const formik = useFormik({
    initialValues: {
      question: "",
      type: types[0],
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <form onSubmit={formik.handleSubmit}>
          <ModalContent>
            <ModalHeader>Add A New Question</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl isRequired>
                <FormLabel htmlFor="question">Title</FormLabel>
                <Input
                  type="text"
                  id="question"
                  name="question"
                  value={formik.values.question}
                  onChange={formik.handleChange}
                />
                <FormLabel htmlFor="type">Type</FormLabel>
                <Input
                  type=""
                  id="question"
                  name="question"
                  value={formik.values.question}
                  onChange={formik.handleChange}
                />
                <FormLabel htmlFor="question">Title</FormLabel>
                <Input
                  type="text"
                  id="question"
                  name="question"
                  value={formik.values.question}
                  onChange={formik.handleChange}
                />
                <FormLabel htmlFor="question">Title</FormLabel>
                <Input
                  type="text"
                  id="question"
                  name="question"
                  value={formik.values.question}
                  onChange={formik.handleChange}
                />
                <FormLabel htmlFor="question">Title</FormLabel>
                <Input
                  type="text"
                  id="question"
                  name="question"
                  value={formik.values.question}
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

export default AddQuestionModal;
