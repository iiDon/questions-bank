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
} from "@chakra-ui/react";
import React from "react";
import { trpc } from "../../../src/utils/trpc";

const QuestionsTable = () => {
  const { data: questions } = trpc.question.getAll.useQuery();
  const [checkedItems, setCheckedItems] = React.useState([false, false]);
  const allChecked = checkedItems.every(Boolean);
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked;
  const [search, setSearch] = React.useState("");
  return (
    <VStack w="90%">
      <Input
        placeholder="Search..."
        size="md"
        type="search"
        bg="gray.100"
        shadow="md"
        rounded="md"
        onChange={(e) => setSearch(e.target.value)}
      />
      <TableContainer w="100%" bg="gray.100" rounded="md" shadow="md">
        <Table size="sm">
          <Thead>
            <Tr h={12} bg="gray.200">
              <Th textAlign="center">
                <Checkbox
                  borderColor="gray.400"
                  isChecked={allChecked}
                  isIndeterminate={isIndeterminate}
                  onChange={(e) =>
                    setCheckedItems([e.target.checked, e.target.checked])
                  }
                />
              </Th>
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
                      isChecked={checkedItems[index]}
                      onChange={(e) =>
                        `${
                          index === 0
                            ? setCheckedItems([
                                e.target.checked,
                                checkedItems[index]!,
                              ])
                            : setCheckedItems([
                                checkedItems[index]!,
                                e.target.checked,
                              ])
                        }`
                      }
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
