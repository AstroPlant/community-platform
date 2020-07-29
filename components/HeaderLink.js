import Link from "next/link";
import { useRouter } from "next/router";
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
  line-height: 1em;
  font-weight: 550;
  letter-spacing: 0.02em;

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

export default function HeaderLink(props) {
  const router = useRouter();
  const path = `/${props.slug}`;
  const active = router.asPath === path;

  return (
    <Link passHref href={path}>
      <LinkContainer
        className={props.className}
        active={active}
        onClick={props.onClick}
      >
        {props.label}
      </LinkContainer>
    </Link>
  );
}

HeaderLink.propTypes = {
  /* Styling class of the container. Used by styled-components. */
  className: PropTypes.string,
  /* label of the link */
  label: PropTypes.string.isRequired,
  /* slug of the link (destination) */
  slug: PropTypes.string.isRequired,
  /* function to execute on click  */
  onClick: PropTypes.func,
};

HeaderLink.defaultProps = {
  onClick: null,
};
