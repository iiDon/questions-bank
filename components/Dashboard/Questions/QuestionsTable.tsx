import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";
import { trpc } from "../../../src/utils/trpc";

const QuestionsTable = () => {
  const { data: questions } = trpc.question.getAll.useQuery();
  console.log(questions);
  return (
    <TableContainer w="90%" bg="gray.200" rounded="md">
      <Table size="sm">
        <Thead>
          <Tr>
            <Th>Test</Th>
            <Th>Item</Th>
            <Th>CLO</Th>
            <Th>PLO</Th>
            <Th>Type</Th>
            <Th>User</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Accordion allowToggle>
            {questions?.map((question, index) => (
              // <Tr key={index}>
              //   <Td>{question.question}</Td>
              //   <Td>{question.CLOs}</Td>
              //   <Td>{question.PLOs?.name}</Td>
              //   <Td>{question.type.name}</Td>
              //   <Td>{question.user.name}</Td>
              //   <Td></Td>
              //   <Td></Td>
              // </Tr>

              <Tr>
                <AccordionItem>
                  <AccordionButton>
                    <Td>{question.question}</Td>
                    <Td>{question.CLOs}</Td>
                    <Td>{question.CLOs}</Td>
                    <Td>{question.PLOs?.name}</Td>
                    <Td>{question.type.name}</Td>
                    <Td>{question.user.name}</Td>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel pb={4}>sss</AccordionPanel>
                </AccordionItem>
              </Tr>
            ))}
          </Accordion>
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default QuestionsTable;
