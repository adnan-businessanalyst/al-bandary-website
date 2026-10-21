"use client";

import Image from "next/image";
import { useTheme } from "@/lib/theme";

export function Logo({
  compact = false,
  onPhoto = false,
}: {
  compact?: boolean;
  onPhoto?: boolean;
}) {
  const { theme } = useTheme();
  const src = onPhoto || theme === "dark" ? "/logo-on-dark.png" : "/logo-on-light.png";

  return (
    <span className="inline-flex items-center">
      <Image
        src={src}
        alt="SAIC — شركة البندري السعودية للصناعة"
        width={compact ? 150 : 240}
        height={compact ? 50 : 80}
        className={compact ? "h-9 w-auto" : "h-11 w-auto sm:h-14"}
        priority
      />
    </span>
  );
}
