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
  Textarea,
  Select,
  useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { trpc } from "../../../src/utils/trpc";

export interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const AddQuestionModal = ({ isOpen, onClose }: Props) => {
  const toast = useToast();
  const { data: PLOs } = trpc.plos.getAll.useQuery();
  const { data: courses } = trpc.course.getAll.useQuery();
  const { data: types } = trpc.type.getAll.useQuery();
  const { data, refetch } = trpc.question.getAll.useQuery();
  const createQuestion = trpc.question.createQuestion.useMutation({
    onSuccess: () => {
      toast({
        position: "top",
        title: "Question created",
        description: "Question has been created successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      refetch();
      onClose();
    },
    onError: () => {
      toast({
        position: "top",
        title: "Error",
        description: createQuestion.error?.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    },
  });

  const formik = useFormik({
    initialValues: {
      PLOs: "",
      course: "",
      type: "",
      CLOs: "",
      question: "",
    },
    onSubmit: (values) => {
      createQuestion.mutate(values);
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
            <ModalHeader>Add A New Question</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl isRequired>
                <FormLabel htmlFor="course">Course</FormLabel>
                <Select
                  placeholder="Select option"
                  onChange={formik.handleChange}
                  name="course"
                  id="course"
                  value={formik.values.course}
                >
                  {courses?.map((course) => {
                    return (
                      <option value={course.id} key={course.id}>
                        {course.name}
                      </option>
                    );
                  })}
                </Select>
                <FormLabel htmlFor="PLOs">PLOs</FormLabel>
                <Select
                  placeholder="Select option"
                  onChange={formik.handleChange}
                  name="PLOs"
                  id="PLOs"
                  value={formik.values.PLOs}
                >
                  {PLOs?.map((plo) => {
                    return (
                      <option value={plo.id} key={plo.id}>
                        {plo.name}
                      </option>
                    );
                  })}
                </Select>
                <FormLabel htmlFor="CLOs">CLOs</FormLabel>
                <Input
                  type="text"
                  id="CLOs"
                  name="CLOs"
                  value={formik.values.CLOs}
                  onChange={formik.handleChange}
                />
                <FormLabel htmlFor="type">Type</FormLabel>
                <Select
                  placeholder="Select option"
                  onChange={formik.handleChange}
                  name="type"
                  id="type"
                  value={formik.values.type}
                >
                  {types?.map((type) => {
                    return (
                      <option value={type.id} key={type.id}>
                        {type.name}
                      </option>
                    );
                  })}
                </Select>
                <FormLabel htmlFor="question">Item</FormLabel>
                <Textarea
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
