import { auth } from "@/auth";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import Session from "@/components/session";

const Provider = async ({ children }: { children: ReactNode }) => {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <Session/>
      <TooltipProvider>{children}</TooltipProvider>
    </SessionProvider>
  );
};

export default Provider;
