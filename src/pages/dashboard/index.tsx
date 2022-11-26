import { Box, Flex, Grid, GridItem, useDisclosure } from "@chakra-ui/react";
import { getSession, useSession } from "next-auth/react";
import AddQuestionModal from "../../../components/Dashboard/Questions/AddQuestionModal";
import Header from "../../../components/Dashboard/Header";
import AddQuestion from "../../../components/Dashboard/Questions/AddQuestion";
import ViewQuestions from "../../../components/Dashboard/Questions/ViewQuestions";
import AddUsers from "../../../components/Dashboard/Users/AddUsers";
import ViewUsers from "../../../components/Dashboard/Users/ViewUsers";
import AddPLO from "../../../components/Dashboard/PLOs/AddPLO";
import ViewPLOs from "../../../components/Dashboard/PLOs/ViewPLOs";
import AddType from "../../../components/Dashboard/Types/AddType";
import AddCourse from "../../../components/Dashboard/Courses/AddCourse";
import ViewCourses from "../../../components/Dashboard/Courses/ViewCourse";
import ViewTypes from "../../../components/Dashboard/Types/ViewTypes";
import { useRouter } from "next/router";
const Home = () => {
  const router = useRouter();
  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/auth/signin");
    },
    
  });

  const { onOpen, isOpen, onClose } = useDisclosure();

  if (status === "loading") {
    return <p>Loading...</p>;
  }



  return (
    <>
      <Header />
      <AddQuestionModal isOpen={isOpen} onClose={onClose} />
      {/* <Box
        position="absolute"
        objectFit="cover"
        width="100%"
        controls={false}
        height="100%"
        zIndex={-1}
        as="video"
        src="/vid/video.mp4"
        opacity={1}
        autoPlay
        loop
        muted
        playsInline
        filter="brightness(30%)"
      /> */}

      <Flex justifyContent="center" alignItems="center" h="90vh">
        <Grid
          transition="0.5s"
          templateColumns={[
            "repeat(2, 1fr)",
            "repeat(2, 1fr)",
            "repeat(4, 1fr)",
            `${
              session?.user?.role === "ADMIN"
                ? "repeat(5, 1fr)"
                : "repeat(2, 1fr)"
            }`,
          ]}
          gap={20}
        >
          <GridItem>
            <AddQuestion onOpen={onOpen} />
          </GridItem>
          <GridItem>
            <ViewQuestions />
          </GridItem>
          {session?.user?.role === "ADMIN" && (
            <GridItem>
              <AddUsers />
            </GridItem>
          )}
          {session?.user?.role === "ADMIN" && (
            <GridItem>
              <ViewUsers onOpen={onOpen} />
            </GridItem>
          )}

          {session?.user?.role === "ADMIN" && (
            <GridItem>
              <AddPLO />
            </GridItem>
          )}

          {session?.user?.role === "ADMIN" && (
            <GridItem>
              <ViewPLOs onOpen={onOpen} />
            </GridItem>
          )}

          {session?.user?.role === "ADMIN" && (
            <GridItem>
              <AddType />
            </GridItem>
          )}

          {session?.user?.role === "ADMIN" && (
            <GridItem>
              <ViewTypes />
            </GridItem>
          )}

          {session?.user?.role === "ADMIN" && (
            <GridItem>
              <AddCourse />
            </GridItem>
          )}

          {session?.user?.role === "ADMIN" && (
            <GridItem>
              <ViewCourses />
            </GridItem>
          )}
        </Grid>
      </Flex>
    </>
  );
};

export default Home;
