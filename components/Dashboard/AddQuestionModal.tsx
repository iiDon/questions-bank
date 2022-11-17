import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "@chakra-ui/react";

export interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const AddQuestionModal = ({ isOpen, onClose }: Props) => {
  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent bgColor={"customDarkBlue"}>
          <ModalHeader>ِAre you sure?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Press yes to create new API Key</ModalBody>

          <ModalFooter>
            <Button
              bgGradient={
                "linear-gradient(100.67deg, #1EC69B 29.36%, #1EA5AD 55.47%)"
              }
              mr={3}
            >
              Yes
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default AddQuestionModal;
