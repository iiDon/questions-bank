import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  ModalHeader,
  useToast,
} from "@chakra-ui/react";
import { trpc } from "../../../src/utils/trpc";

export interface Props {
  isOpen: boolean;
  onClose: () => void;
  questions: string[];
  setQuestions: React.Dispatch<React.SetStateAction<string[]>>;
}

const DeleteQuestionModal = ({
  isOpen,
  onClose,
  questions,
  setQuestions,
}: Props) => {
  const toast = useToast();
  const { refetch } = trpc.question.getAll.useQuery();
  const deleteQuestions = trpc.question.deleteManyQuestions.useMutation({
    onSuccess: () => {
      toast({
        position: "top",
        title: "Questions deleted",
        description: "Questions have been deleted successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      refetch();
      onClose();
      setQuestions([]);
    },
    onError: () => {
      toast({
        position: "top",
        title: "Error",
        description: deleteQuestions.error?.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    },
  });

  const handleDelete = async () => {
    deleteQuestions.mutateAsync({
      ids: questions,
    });
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Are you sure?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {`If you click delete you will delete ${questions.length} questions`}
          </ModalBody>

          <ModalFooter>
            <Button
              mr={3}
              colorScheme="red"
              textColor="white"
              type="submit"
              onClick={handleDelete}
              isLoading={deleteQuestions.isLoading}
            >
              Delete
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteQuestionModal;
