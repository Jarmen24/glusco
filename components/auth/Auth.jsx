import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import Login from "./Login";
import Signup from "./Signup";
import Image from "next/image";

const Auth = () => {
  return (
    <>
      <Tabs defaultValue="login" className="w-[400px]">
        <Image
          src={"/glusco-logo.png"}
          alt={"glusco-logo"}
          width={150}
          height={50}
          className="object-cover mx-auto"
        />
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login" className="cursor-pointer">
            Login
          </TabsTrigger>
          <TabsTrigger value="signup" className="cursor-pointer">
            Signup
          </TabsTrigger>
        </TabsList>

        <TabsContent value="login">
          <Login />
        </TabsContent>
        <TabsContent value="signup">
          <Signup />
        </TabsContent>
      </Tabs>
    </>
  );
};

export default Auth;
