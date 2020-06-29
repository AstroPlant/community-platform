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

const Dropdown = React.forwardRef(({ onClick, reverse, color }, ref) => (
  <Container ref={ref} reverse={reverse} onClick={onClick}>
    <Icon size={24} color={color}>
      <DropdownIcon />
    </Icon>
  </Container>
));

Dropdown.propTypes = {
  /* function to execute when the dropdown is clicked */
  onClick: PropTypes.func,
  /* Indicates if the container should be rotated from 180° */
  reverse: PropTypes.bool.isRequired,
  /* String representing the color of the dropdown, should be a string color from the theme. e.g "primary" */
  color: PropTypes.string,
};

Dropdown.defaultProps = {
  color: "light",
};

export default Dropdown;
