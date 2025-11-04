"use client";
import React from "react";
// Import JS module; TypeScript allowJs is enabled in tsconfig
import { ThemeProvider } from "@/gesport/context/ThemeContext";

export default function ThemeProviderClient({ children }: { children: React.ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
