import Link from "next/link";
import React from "react";

export default function ({ children }: { children: React.ReactNode }) {
  return (
    <article>
      <nav>
        <Link href="/">Home</Link>
      </nav>
      {children}
    </article>
  );
}
