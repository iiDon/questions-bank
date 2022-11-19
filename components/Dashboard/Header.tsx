import { Button, Flex, Text } from "@chakra-ui/react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";

const Header = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleSignOut = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    localStorage.removeItem("role");
    signOut();
    router.push("/auth/signin");
  };

  return (
    <Flex
      bg="gray.200"
      p={4}
      justifyContent="space-between"
      alignItems="center"
      shadow="lg"
    >
      <Text>
        {session?.user?.name} ({session?.user?.email})
      </Text>

      <Text as="b">Questions Bank System</Text>

      <Button onClick={handleSignOut} bg="sky" textColor="white">
        Logout
      </Button>
    </Flex>
  );
};

export default Header;
