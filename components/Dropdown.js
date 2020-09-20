import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import Icon from "./Icon";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  text-align: center;

  transform: ${(props) => (props.reverse ? "rotate(180deg)" : "")};
`;

const Dropdown = React.forwardRef(
  ({ className, color, icon, reverse, onClick }, ref) => (
    <Container
      ref={ref}
      className={className}
      reverse={reverse}
      onClick={onClick}
    >
      {icon && (
        <Icon size={24} color={color}>
          {icon}
        </Icon>
      )}
    </Container>
  )
);

Dropdown.propTypes = {
  /**
   * function to execute when the dropdown is clicked
   */
  onClick: PropTypes.func,
  /**
   * Indicates if the container should be rotated from 180°
   */
  reverse: PropTypes.bool.isRequired,
  /**
   * String representing the color of the dropdown, should be a string color from the theme. e.g "primary"
   */
  color: PropTypes.string,
  /**
   * Icon Component to use for the dropdown
   */
  icon: PropTypes.node,
};

Dropdown.defaultProps = {
  color: "light",
  icon: null,
};

export default Dropdown;
