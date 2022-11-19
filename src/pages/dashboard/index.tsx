import {
  Box,
  Button,
  Flex,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import AddQuestionModal from "../../../components/Dashboard/AddQuestionModal";
import Header from "../../../components/Dashboard/Header";
import Unauthenticated from "../../../components/Unauthenticated";
import AddQuestion from "../../../components/Dashboard/AddQuestion";
import ViewQuestions from "../../../components/Dashboard/ViewQuestions";
import AddUsers from "../../../components/Dashboard/AddUsers";
import ViewUsers from "../../../components/Dashboard/ViewUsers";
const Home = () => {
  const { status, data } = useSession();
  const { onOpen, isOpen, onClose } = useDisclosure();
  const role =
    typeof window !== "undefined" ? localStorage.getItem("role") : null;

  console.log(role);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    return <Unauthenticated />;
  }

  return (
    <>
      <Header />
      <AddQuestionModal isOpen={isOpen} onClose={onClose} />

      <Flex justifyContent="center" alignItems="center" h="90vh">
        <AddQuestion onOpen={onOpen} />
        <ViewQuestions onOpen={onOpen} />
        {role === "ADMIN" && <AddUsers onOpen={onOpen} />}
        {role === "ADMIN" && <ViewUsers onOpen={onOpen} />}
      </Flex>
    </>
  );
};

export default Home;
