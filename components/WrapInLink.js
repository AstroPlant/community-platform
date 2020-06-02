import React from "react";
import Link from "next/link";

/***
 * Wrapper component for dynamic href and as
 */
export default function WrapInLink({ children, href, as }) {
  return (
    <Link href={href} as={as}>
      <a>{children}</a>
    </Link>
  );
}
