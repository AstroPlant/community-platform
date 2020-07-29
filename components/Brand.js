import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import Logo from "./Logo";

const Container = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.vertical ? "column" : "row")};
  align-items: center;
  justify-content: flex-start;

  margin: ${(props) => (props.vertical ? "2rem 0" : "0")};
`;

const Separator = styled.div`
  display: ${(props) => (props.vertical ? "none" : "block")};
  height: 2rem;
  width: 1px;
  background-color: ${(props) => props.theme.grey};
  margin: 0 1rem;
`;

const BrandName = styled.h3`
  color: white;
  margin-top: ${(props) => (props.vertical ? "1rem" : "0")};
`;

export default function Brand(props) {
  return (
    <Container className={props.className} vertical={props.vertical}>
      <Logo size={props.vertical ? 40 : 32} />
      <Separator vertical={props.vertical} />
      <BrandName vertical={props.vertical}>astroplant</BrandName>
    </Container>
  );
}

Brand.propTypes = {
  className: PropTypes.string,
  vertical: PropTypes.bool,
};

Brand.defaultProps = {
  vertical: false,
};
