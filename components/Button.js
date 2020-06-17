import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

const ButtonContainer = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  padding: 0.5rem 1rem;
  margin: 0.25rem 0.5rem;

  width: ${(props) => (props.large ? "20rem" : "")};
  background-color: ${(props) =>
    props.disabled ? props.theme.grey : props.color};

  color: ${(props) => (props.inverted ? props.theme.light : props.theme.dark)};
  font-size: 1em;
  font-weight: bold;

  cursor: pointer;

  border: none;
  outline: none;
`;

/***
 * Button component
 * Using forwaredref here to be able to pass the href to the component when using a Next.js link
 */
const Button = React.forwardRef(
  ({ className, large, inverted, label, color, ...props }, ref) => {
    return (
      <ButtonContainer
        className={className}
        large={large}
        inverted={inverted}
        color={color}
        ref={ref}
        {...props}
      >
        {label}
      </ButtonContainer>
    );
  }
);

Button.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  large: PropTypes.bool,
  inverted: PropTypes.bool,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  large: false,
  inverted: false,
};

export default Button;
