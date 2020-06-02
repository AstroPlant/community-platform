import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import WrapInLink from "../WrapInLink";

const Container = styled.div`
  display: block;

  width: 100%;
  height: 100%;

  background-color: ${(props) => props.theme.darkLight};

  padding: 1.5rem;
`;

export default function Card({ isLink, children, className, href, as }) {
  return (
    <>
      {isLink ? (
        <WrapInLink href={href} as={as}>
          <Container className={className}>{children}</Container>
        </WrapInLink>
      ) : (
        <Container className={className}>{children}</Container>
      )}
    </>
  );
}

Card.propTypes = {
  children: PropTypes.node,
};

Card.defaultProps = {};
