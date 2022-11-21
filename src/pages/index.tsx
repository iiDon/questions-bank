import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Home: NextPage = () => {
  // if user is logged in, redirect to dashboard
  const router = useRouter();

  useEffect(() => {
    router.push("/auth/signin");
  }, []);

  return <></>;
};

export default Home;
