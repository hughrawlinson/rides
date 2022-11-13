import Link from "next/link";
import React from "react";

export default function ({ children }: { children: React.ReactNode }) {
  return (
    <article>
      <nav>
        <Link href="/cycles">All Cycles</Link>
      </nav>
      {children}
    </article>
  );
}
