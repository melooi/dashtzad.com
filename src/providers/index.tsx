"use client";

import type { ReactNode } from "react";
import { QueryProvider } from "./query-provider";

/** Single client-side provider tree mounted once in the root layout. */
export function Providers({ children }: { children: ReactNode }) {
  return <QueryProvider>{children}</QueryProvider>;
}
