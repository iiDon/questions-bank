import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  Radio,
  RadioGroup,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import type { SignInResponse } from "next-auth/react";
import { signIn, useSession } from "next-auth/react";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import React from "react";

const Signin = () => {
  const router = useRouter();
  const { status } = useSession();
  const toast = useToast();

  const formik = useFormik({
    initialValues: {
      email: "admin@admin.com",
      password: "admin@admin.com",
    },
    onSubmit: async (values) => {
      values.email = "admin@admin.com";
      values.password = "admin";
      const res: SignInResponse | undefined = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
        callbackUrl: "/dashboard",
      });

      if (!res?.ok) {
        toast({
          position: "top",
          title: res?.error,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }

      if (res?.ok) {
        toast({
          position: "top",
          title: "Success",
          description: "You have successfully logged in",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }
    },
  });

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "authenticated") {
    router.push("/dashboard");
  }
  return (
    <Flex justifyContent="center" alignItems="center" h="100vh">
      <Box
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
        filter="brightness(40%)"
      />
      <VStack bg="gray.200" w="30rem" p={5} rounded="md" shadow="lg">
        <Image src="/logo.png" alt="logo" w="15rem" />
        <Text fontSize="2xl" fontWeight="bold" py={5}>
          Login
        </Text>
        <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              defaultValue="admin@admin.com"
              border="2px"
              borderColor="gray.300"
              name="email"
              id="email"
              type="email"
              placeholder="admin@admin.com"
              value={"admin@admin.com"}
              // onChange={formik.handleChange}
              mb={5}
            />
            <FormLabel>Password</FormLabel>
            <Input
              defaultValue="admin"
              border="2px"
              borderColor="gray.300"
              name="password"
              id="password"
              placeholder="admin"
              type="password"
              value={"admin"}
              // onChange={formik.handleChange}
              mb={5}
            />

            <Button
              _hover={{ bg: "blue.800" }}
              isLoading={formik.isSubmitting}
              type="submit"
              w="100%"
              bg="sky"
              textColor="white"
            >
              Login
            </Button>
          </FormControl>
        </form>
      </VStack>
    </Flex>
  );
};

export default Signin;
