import { Thead, Tr, Th } from "@chakra-ui/react";
import React from "react";

const TableHeader = () => {
  return (
    <Thead>
      <Tr h={12} bg="gray.200">
        <Th textAlign="center" w="1%"></Th>
        <Th w="1%">N</Th>
        <Th>Item</Th>
        <Th>CLO</Th>
        <Th>PLO</Th>
        <Th>Type</Th>
        <Th>Course</Th>
        <Th w="1%">Actions</Th>
      </Tr>
    </Thead>
  );
};

export default TableHeader;
