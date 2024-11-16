import type { ReactNode } from "react";

interface HeaderProps {
  children: ReactNode;
}

export default function Header({ children }: HeaderProps) {
  return <h1 className="text-[1rem] font-semibold">{children}</h1>;
}
