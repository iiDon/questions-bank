import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Checkbox,
  Input,
  VStack,
  Button,
  Flex,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { trpc } from "../../../src/utils/trpc";
import AddQuestionModal from "./AddQuestionModal";
import DeleteQuestionModal from "./DeleteQuestionModal";

const QuestionsTable = () => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenD,
    onOpen: onOpenD,
    onClose: onCloseD,
  } = useDisclosure();
  const [search, setSearch] = React.useState("");
  const { data: questions } = trpc.question.getAll.useQuery();

  const [selected, setSelected] = React.useState<string[]>([]);

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelected([...selected, value]);
    } else {
      setSelected(selected.filter((item) => item !== value));
    }
  };

  return (
    <VStack w="90%">
      <AddQuestionModal isOpen={isOpen} onClose={onClose} />
      <DeleteQuestionModal
        isOpen={isOpenD}
        onClose={onCloseD}
        questions={selected}
        setQuestions={setSelected}
      />
      <Flex w="100%">
        <Button shadow="md" onClick={onOpen}>
          Add A Question
        </Button>
        <Button shadow="md" ml={8}>
          Import
        </Button>
        <Button shadow="md" ml={8}>
          Export
        </Button>
        <Button
          isDisabled={selected.length <= 0}
          shadow="md"
          ml={8}
          colorScheme={"red"}
          onClick={onOpenD}
        >
          Delete
        </Button>
      </Flex>
      <TableContainer w="100%" bg="gray.100" rounded="md" shadow="md">
        <Table size="sm">
          <Thead>
            <Tr h={12} bg="gray.200">
              <Th textAlign="center"></Th>
              <Th>Item</Th>
              <Th>CLO</Th>
              <Th>PLO</Th>
              <Th>Type</Th>
              <Th>User</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {questions
              ?.filter(
                (question) =>
                  question.question
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                  question.CLOs?.toLowerCase().includes(search.toLowerCase()) ||
                  question.PLOs?.name
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                  question.type?.name
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                  question.user?.name
                    ?.toLowerCase()
                    .includes(search.toLowerCase())
              )
              .map((question, index) => (
                <Tr
                  key={index}
                  cursor="pointer"
                  _hover={{ bg: "gray.300" }}
                  border="2px"
                  borderColor="gray.200"
                >
                  <Td textAlign="center">
                    <Checkbox
                      borderColor="gray.400"
                      value={question.id}
                      onChange={handleSelect}
                    />
                  </Td>
                  <Td>{question.question.substring(0, 20) + "..."}</Td>
                  <Td>{question.CLOs}</Td>
                  <Td>{question.PLOs?.name}</Td>
                  <Td>{question.type.name}</Td>
                  <Td>{question.user.name}</Td>
                  <Td></Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </TableContainer>
    </VStack>
  );
};

export default QuestionsTable;
