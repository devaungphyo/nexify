import Session from "@/components/session";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { auth } from "../../auth";
const Provider = async ({ children }: { children: ReactNode }) => {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <Session />
      <TooltipProvider>{children}</TooltipProvider>
    </SessionProvider>
  );
};

export default Provider;
