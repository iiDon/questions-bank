import { Button, Flex, Image, Text } from "@chakra-ui/react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";

const Header = () => {
  const { data: session } = useSession();

  const handleSignOut = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    signOut({
      redirect: true,
      callbackUrl: "/auth/signin",
    });
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
      <Link href='/dashboard'><Image src="/logo.png" alt="SRU" w="150px" /></Link>
      <Text as="b">Questions Bank System</Text>

      <Button onClick={handleSignOut} bg="sky" textColor="white">
        Logout
      </Button>
    </Flex>
  );
};

export default Header;
