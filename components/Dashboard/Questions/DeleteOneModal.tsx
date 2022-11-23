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
    id: string;
}

const DeleteOneModal = ({
    isOpen,
    onClose,
    id
}: Props) => {
    const toast = useToast();
    const { refetch } = trpc.question.getAll.useQuery();
    const deleteOne = trpc.question.deleteQuestion.useMutation({
        onSuccess: () => {
            toast({
                position: "top",
                title: "Question deleted",
                description: "Question has been deleted successfully",
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
                description: deleteOne.error?.message,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        },
    });

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Are you sure?</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        If you click delete you will delete the question
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            mr={3}
                            colorScheme="red"
                            textColor="white"
                            type="submit"
                            onClick={() => deleteOne.mutateAsync({ id })}
                            isLoading={deleteOne.isLoading}
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

export default DeleteOneModal;
