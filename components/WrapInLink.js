import Link from "next/link";
import React from "react";

/***
 * Wrapper component for dynamic href and as
 */
export default function WrapInLink({ children, href, as }) {
  return (
    <Link passHref href={href} as={as}>
      <a target="_self">{children}</a>
    </Link>
  );
}
