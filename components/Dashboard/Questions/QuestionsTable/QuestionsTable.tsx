import {
  TableContainer,
  Table,
  Tr,
  Tbody,
  Td,
  Checkbox,
  VStack,
  Button,
  Flex,
  useDisclosure,
  Input,
  FormLabel,
  Box,
  Text,
} from "@chakra-ui/react";
import React from "react";

import { trpc } from "../../../../src/utils/trpc";

import AddQuestionModal from "../AddQuestionModal";
import DeleteQuestionModal from "../DeleteQuestionModal";
import * as XLSX from "xlsx";
import Link from "next/link";
import Selector from "../Selector";
import { AiFillDelete } from "react-icons/ai";
import { MdViewWeek } from "react-icons/md";
import DeleteOneModal from "../DeleteOneModal";
import ViewQuestionModal from "../ViewQuestionModal";
import TableHeader from "./TableHeader";
import { handleSelect } from "../../../../Hooks/hooks";

const QuestionsTable = () => {
  // modals for adding, deleting and updating questions
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalId, setModalId] = React.useState("");
  const {
    isOpen: isOpenD,
    onOpen: onOpenD,
    onClose: onCloseD,
  } = useDisclosure();
  const {
    isOpen: isOpenDO,
    onOpen: onOpenDO,
    onClose: onCloseDO,
  } = useDisclosure();

  const {
    isOpen: isOpenU,
    onOpen: onOpenU,
    onClose: onCloseU,
  } = useDisclosure();
  // ===================================================

  // get all questions and slice it and declare filters
  const [sliceStart, setSliceStart] = React.useState(0);
  const [sliceEnd, setSliceEnd] = React.useState(10);
  const { data: PLOs } = trpc.plos.getAll.useQuery();
  const { data: Types } = trpc.type.getAll.useQuery();
  const { data: Courses } = trpc.course.getAll.useQuery();
  const [filterPlos, setFilterPlos] = React.useState<string | undefined>(
    undefined
  );
  const [filterTypes, setFilterTypes] = React.useState<string | undefined>(
    undefined
  );
  const [filterCourses, setFilterCourses] = React.useState<string | undefined>(
    undefined
  );

  const { data: questions, refetch } = trpc.question.getAll.useQuery({
    PLOs: filterPlos,
    Types: filterTypes,
    Courses: filterCourses,
  });
  const length = questions?.length;
  const createManyQ = trpc.question.createManyQuestions.useMutation({
    onSuccess: () => {
      console.log("success");
      refetch();
    },
  });

  // const createManyPlos = trpc.plos.createManyPLOs.useMutation({
  //   onSuccess: () => {
  //     console.log("success");
  //     refetch();
  //   },
  // });


  const [selected, setSelected] = React.useState<string[]>([]);
  const [questionModal, setQuestion] = React.useState();

  const dataExport = questions?.map((question) => {
    return {
      Question: question.question,
      CLOs: question.CLOs,
      PLOs: question.PLOs?.name,
      Types: question.type.name,
      Courses: question.course.name,
    };
  });

  const handleExport = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(dataExport!);
    XLSX.utils.book_append_sheet(wb, ws, "Questions");
    XLSX.writeFile(wb, "Questions.xlsx");
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    // read file
    const file = e.target.files?.[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target?.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const wsname = workbook.SheetNames[0];
      const ws = workbook.Sheets[wsname!];
      const dataParse: any = XLSX.utils.sheet_to_json(ws!, { header: 2 });
      console.log(dataParse);
      createManyQ.mutateAsync(dataParse);
    };
    reader.readAsBinaryString(file!);
  };

  const handleUpdate = (question: any) => {
    setQuestion(question);
    onOpenU();
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
      <DeleteOneModal isOpen={isOpenDO} onClose={onCloseDO} id={modalId} />
      <ViewQuestionModal
        isOpen={isOpenU}
        onClose={onCloseU}
        q={questionModal}
      />
      <Flex w="100%" justifyContent="space-between">
        <Flex>
          <Button shadow="md" onClick={onOpen}>
            Add A Question
          </Button>

          <Input
            disabled={createManyQ.isLoading}
            type="file"
            id="file"
            display="none"
            onChange={handleImport}
          />
          <FormLabel
            htmlFor="file"
            rounded="md"
            p={2}
            shadow="md"
            bg="gray.100"
            mx={2}
            cursor="pointer"
            _hover={{ bg: "gray.200" }}
          >
            Import
          </FormLabel>

          <Button shadow="md" ml={2} onClick={handleExport}>
            Export
          </Button>
          <Button
            isDisabled={selected.length <= 0}
            shadow="md"
            ml={2}
            colorScheme={"red"}
            onClick={onOpenD}
          >
            Delete
          </Button>
          <Selector placeholder="PLOs" options={PLOs} setter={setFilterPlos} />
          <Selector
            placeholder="Types"
            options={Types}
            setter={setFilterTypes}
          />
          <Selector
            placeholder="Courses"
            options={Courses}
            setter={setFilterCourses}
          />
        </Flex>

        <Link href="/dashboard">
          <Button shadow="md">Back</Button>
        </Link>
      </Flex>
      <TableContainer w="100%" bg="gray.100" rounded="md" shadow="md">
        <Table size="sm">
          <TableHeader />
          <Tbody>
            {questions?.slice(sliceStart, sliceEnd)?.map((question, index) => (
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
                    onChange={(e) => handleSelect(e, setSelected, selected)}
                  />
                </Td>
                <Td w="auto">{sliceStart + index + 1}</Td>
                <Td>{question.question.substring(0, 20) + "..."}</Td>
                <Td>{question.CLOs}</Td>
                <Td>{question.PLOs?.name.substring(0, 7)}</Td>
                <Td>{question.type.name}</Td>
                <Td>{question.course.name}</Td>
                <Td w="auto">
                  <Flex justifyContent="space-between">
                    <Box
                      _hover={{ bg: "gray.100" }}
                      p={1}
                      rounded="md"
                      onClick={() => {
                        setModalId(question.id);
                        onOpenDO();
                      }}

                    >
                      {/* Delete */}
                      <AiFillDelete size={24} color="red" />
                    </Box>
                    {/* Update */}
                    <Box
                      _hover={{ bg: "gray.200" }}
                      p={1}
                      onClick={() => handleUpdate(question)}
                    >
                      <MdViewWeek size={24} color="#5E91F8" />
                    </Box>
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        {length === 0 && (
          <Text
            my={16}
            ml={2}
            textAlign="center"
            fontWeight="bold"
            fontSize="xl"
          >
            There is no question to show
          </Text>
        )}
        <Flex w="100%" my={2} justifyContent="center" alignItems="center">
          <Button
            bg="sky"
            color="white"
            mx={2}
            w={24}
            onClick={() => {
              if (sliceStart > 0) {
                setSliceStart(sliceStart - 10);
                setSliceEnd(sliceEnd - 10);
              }
            }}
          >
            Previous
          </Button>
          {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            length! > 0 && (
              <Text>
                {sliceStart + 1} - {sliceEnd} of {questions?.length}
              </Text>
            )
          }
          <Button
            bg="sky"
            color="white"
            mx={2}
            w={24}
            onClick={() => {
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              if (sliceEnd < length!) {
                setSliceStart(sliceStart + 10);
                setSliceEnd(sliceEnd + 10);
              }
            }}
          >
            Next
          </Button>
        </Flex>
      </TableContainer>
    </VStack>
  );
};

export default QuestionsTable;
