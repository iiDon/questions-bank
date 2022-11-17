import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { signIn, useSession } from "next-auth/react";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import React from "react";

export interface IRes {
  error: string;
  ok: boolean;
  status: number;
  url: string;
}

const signin = () => {
  const router = useRouter();
  const [error, setError] = React.useState<string | null>(null);
  const { data: session } = useSession();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      const res: IRes = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      });
      console.log(res);

      if (!res.ok) {
        setError(res.error);
      }

      if (res.ok) {
        router.push("/");
      }
    },
  });

  return (
    <Flex justifyContent="center" alignItems="center" h="100vh">
      <VStack bg="gray.200" w="30rem" p={5} rounded="md" shadow="lg">
        <Image src="/logo.png" alt="logo" w="15rem" />
        <Text fontSize="2xl" fontWeight="bold">
          Login
        </Text>
        <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              border="2px"
              borderColor="gray.300"
              name="email"
              id="email"
              type="email"
              placeholder="example@example.com"
              value={formik.values.email}
              onChange={formik.handleChange}
              mb={5}
            />
            <FormLabel>Password</FormLabel>
            <Input
              border="2px"
              borderColor="gray.300"
              name="password"
              id="password"
              placeholder="********"
              type="  password"
              value={formik.values.password}
              onChange={formik.handleChange}
              mb={5}
            />
            {error && (
              <Text color="red.700" bg="red.200" p={2} mb={5} rounded="md">
                {error}
              </Text>
            )}
            <Button type="submit" w="100%" bg="sky" textColor="white">
              Login
            </Button>
          </FormControl>
        </form>
      </VStack>
    </Flex>
  );
};

export default signin;
