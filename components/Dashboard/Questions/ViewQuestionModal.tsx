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
import { Question, PLOs, Course, Type } from "@prisma/client";
import { useFormik } from "formik";
import { User } from "next-auth";
import React from "react";
import { trpc } from "../../../src/utils/trpc";

export interface Props {
  isOpen: boolean;
  onClose: () => void;
  q: any;
}

const ViewQuestionModal = ({ isOpen, onClose, q }: Props) => {
  const toast = useToast();
  const { data: PLOs } = trpc.plos.getAll.useQuery();
  const { data: courses } = trpc.course.getAll.useQuery();
  const { data: types } = trpc.type.getAll.useQuery();
  const { data: questions, refetch } = trpc.question.getAll.useQuery({});
  const updateQuestion = trpc.question.updateQuestion.useMutation({
    onSuccess: () => {
      toast({
        position: "top",
        title: "Question Updated",
        description: "Question updated successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      refetch();
    },
    onError: () => {
      toast({
        position: "top",
        title: "Error",
        description: "Error updating question",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
  });

  const formik = useFormik({
    initialValues: {
      id: q?.id,
      PLOs: q?.PLOs,
      course: q?.course.id,
      type: q?.type.id,
      CLOs: q?.CLOs,
      question: q?.question,
    },
    onSubmit: async (values) => {
      const { PLOs, course, type, CLOs, question } = values;
      values.id = q?.id;
      if (values.PLOs === undefined) {
        values.PLOs = q.PLOs.id;
      }
      if (values.course === undefined) {
        values.course = q.course.id;
      }
      if (values.type === undefined) {
        values.type = q.type.id;
      }
      if (values.CLOs === undefined) {
        values.CLOs = q.CLOs;
      }
      if (values.question === undefined) {
        values.question = q.question;
      }

      console.log(values);
      await updateQuestion.mutateAsync(values);
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
            <ModalHeader>View or Edit Question</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl isRequired>
                <FormLabel htmlFor="course">Course</FormLabel>
                <Select
                  placeholder="Select option"
                  onChange={formik.handleChange}
                  name="course"
                  id="course"
                  defaultValue={q?.course.id}
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
                  defaultValue={q?.PLOs?.id}
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
                  defaultValue={q?.CLOs}
                  value={formik.values.CLOs}
                  onChange={formik.handleChange}
                />
                <FormLabel htmlFor="type">Type</FormLabel>
                <Select
                  placeholder="Select option"
                  onChange={formik.handleChange}
                  defaultValue={q?.type.id}
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
                  defaultValue={q?.question}
                  value={formik.values.question}
                  onChange={formik.handleChange}
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button mr={3} bg="sky" textColor="white" type="submit">
                Update
              </Button>
              <Button onClick={onClose}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
};

export default ViewQuestionModal;
