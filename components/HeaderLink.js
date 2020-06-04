import Link from "next/link";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

const LinkContainer = styled.a`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 0.5rem 0;
  margin: 0 0.5rem;

  color: ${(props) => props.theme.light};

  text-align: center;
  font-size: 1em;
  font-weight: bold;
  letter-spacing: 0.01em;

  cursor: pointer;

  &:hover {
    color: ${(props) => props.theme.primary};
  }

  &:after {
    content: " ";

    position: absolute;
    display: ${(props) => (props.active ? "block" : "none")};
    bottom: 0;

    width: 100%;
    height: 2px;
    background-color: ${(props) => props.theme.primary};
  }
`;

export default function HeaderLink({
  active,
  label,
  href,
  className,
  onClick,
}) {
  return (
    <Link passHref href={href}>
      <LinkContainer className={className} active={active} onClick={onClick}>
        {label}
      </LinkContainer>
    </Link>
  );
}

HeaderLink.propTypes = {
  label: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  active: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

HeaderLink.defaultProps = {
  href: "/",
};
