import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import HeaderLink from "./HeaderLink";

const Container = styled.div`
  position: absolute;
  right: 0;
  top: 100%;
  display: ${(props) => (props.hidden ? "none" : "flex")};

  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  text-align: center;

  padding: 1rem 2rem;

  background-color: ${(props) => props.theme.darkLight};

  transition: opacity 0.2s ease-out, transform 0.4s ease;
`;

export default function DropdownLinks({ links, hidden, forwardedRef }) {
  return (
    <Container ref={forwardedRef} hidden={hidden}>
      {links.map((link) => (
        <HeaderLink key={link.id} label={link.label} slug={link.slug} />
      ))}
    </Container>
  );
}

DropdownLinks.propTypes = {
  links: PropTypes.arrayOf(PropTypes.object).isRequired,
  hidden: PropTypes.bool.isRequired,
  forwardedRef: PropTypes.oneOfType([
    // Either a function
    PropTypes.func,
    // Or the instance of a DOM native element
    PropTypes.shape({ current: PropTypes.instanceOf(PropTypes.element) }),
  ]),
};
