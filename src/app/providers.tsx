"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

export function ClientSessionProvider({
  children,
  session,
}: {
  children: ReactNode;
  session: any;
}) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
