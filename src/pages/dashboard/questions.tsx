import { VStack } from "@chakra-ui/react";
import React from "react";
import Header from "../../../components/Dashboard/Header";
import QuestionsTable from "../../../components/Dashboard/Questions/QuestionsTable/QuestionsTable";

const Questions = () => {
  return (
    <>
      <Header />
      <VStack mt={10}>
        <QuestionsTable />
      </VStack>
    </>
  );
};

export default Questions;
