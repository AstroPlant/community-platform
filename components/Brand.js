import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import AstroplantText from "../public/logos/astroplant-text.svg";
import Breaks from "../utils/breakpoints";
import Logo from "./Logo";
import WrapInLink from "./WrapInLink";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const Separator = styled.div`
  display: block;
  height: 2rem;
  width: 1px;
  background-color: ${(props) => props.theme.grey};
  margin: 0 1rem;

  @media screen and (max-width: ${Breaks.medium}) {
    display: none;
  }
`;

const Text = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    height: 32px;
    width: 128px;
  }

  @media screen and (max-width: ${Breaks.medium}) {
    display: none;
  }
`;

export default function Brand(props) {
  return (
    <WrapInLink href={"/"}>
      <Container className={props.className}>
        <Logo size={32} />
        <Separator />
        <Text>
          <AstroplantText />
        </Text>
      </Container>
    </WrapInLink>
  );
}

Brand.propTypes = {
  /**
   * Styling class of the container. Used by styled-components.
   */
  className: PropTypes.string,
};
