import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

const HoverBar = styled.div`
  position: absolute;
  bottom: 0%;
  left: 0%;

  height: 2px;
  width: 100%;
  transform: scale(0);

  background-color: transparent;
  transition: background-color 0.3s ease, transform 0.3s ease;
`;

const ButtonContainer = styled.button`
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  padding: 0.5rem 1rem;
  margin: 0.25rem 0.5rem;

  width: ${(props) => (props.large ? "20rem" : "")};
  background-color: ${(props) =>
    props.disabled ? props.theme.grey : props.theme[props.color]};

  color: ${(props) => (props.inverted ? props.theme.light : props.theme.dark)};
  font-family: ${(props) => props.theme.fontFamily};
  font-size: 1em;
  font-weight: 550;

  cursor: pointer;
  pointer-events: ${(props) => (props.disabled ? "none" : "auto")};

  border: none;
  outline: none;

  &:hover ${HoverBar} {
    background-color: ${(props) =>
      props.inverted && !props.disbaled ? props.theme.light : props.theme.dark};
    transform: scale(1);
  }
`;

/***
 * Button component
 * Using forwaredref here to be able to pass the href to the component when using a Next.js link
 */
const Button = React.forwardRef(
  ({ large, inverted, color, label, ...props }, ref) => {
    return (
      <ButtonContainer
        large={large}
        inverted={inverted}
        color={color}
        ref={ref}
        {...props}
      >
        <HoverBar />
        {label}
      </ButtonContainer>
    );
  }
);

Button.propTypes = {
  /**
   * Label of the button
   */
  label: PropTypes.string.isRequired,
  /**
   * Background color of the button
   */
  color: PropTypes.string.isRequired,
  /**
   * Whether or not to apply the large style button
   */
  large: PropTypes.bool,
  /**
   * Whether or not to apply the inverted style (text color white)
   */
  inverted: PropTypes.bool,
  /**
   * Function to execute on button click
   */
  onClick: PropTypes.func,
};

Button.defaultProps = {
  large: false,
  inverted: false,
  onClick: null,
};

export default Button;
