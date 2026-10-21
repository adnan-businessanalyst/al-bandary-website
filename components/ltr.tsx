import type { ReactNode } from "react";

export function Ltr({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span dir="ltr" className={`inline-block ${className}`}>
      {children}
    </span>
  );
}
