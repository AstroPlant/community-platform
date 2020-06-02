import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import DropdownIcon from "../public/icons/dropdown.svg";
import Icon from "./Icon";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  text-align: center;

  transform: ${(props) => (props.reverse ? "rotate(180deg)" : "")};
`;

export default function Dropdown({ onClick, reverse, color }) {
  return (
    <Container reverse={reverse} onClick={onClick}>
      <Icon size="24px" color={color}>
        <DropdownIcon />
      </Icon>
    </Container>
  );
}

Dropdown.propTypes = {
  onClick: PropTypes.func,
  reverse: PropTypes.bool.isRequired,
  color: PropTypes.string,
};

Dropdown.defaultProps = {
  color: "#FFF",
};
