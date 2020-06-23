import React from "react";
import Link from "next/link";

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
