import Link from "next/link";
import PropTypes from "prop-types";
import React from "react";

/***
 * Wrapper component for dynamic href and as
 */
export default function WrapInLink({ children, href, as, ...props }) {
  return (
    <Link passHref href={href} as={as}>
      <a {...props} target="_self">
        {children}
      </a>
    </Link>
  );
}

WrapInLink.propTypes = {
  /**
   * Components to wrap
   */
  children: PropTypes.node.isRequired,
  /**
   * Destination of the link
   */
  href: PropTypes.string.isRequired,
  /**
   * As path of the link
   */
  as: PropTypes.string,
};

WrapInLink.defaultProps = {
  as: null,
};
