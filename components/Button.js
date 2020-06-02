import Link from "next/link";
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
  background-color: ${(props) => props.color};

  color: ${(props) => (props.inverted ? props.theme.light : props.theme.dark)};
  font-size: 1em;
  font-weight: bold;

  cursor: pointer;

  border: none;
  outline: none;
`;

export default function Button({
  className,
  large,
  inverted,
  label,
  color,
  onClick,
  isLink,
  href,
  as,
}) {
  return (
    <>
      {isLink ? (
        <Link href={href} as={as}>
          <ButtonContainer
            className={className}
            large={large}
            inverted={inverted}
            color={color}
          >
            {label}
          </ButtonContainer>
        </Link>
      ) : (
        <ButtonContainer
          className={className}
          large={large}
          inverted={inverted}
          onClick={onClick}
          color={color}
        >
          {label}
        </ButtonContainer>
      )}
    </>
  );
}

Button.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  large: PropTypes.bool,
  inverted: PropTypes.bool,
  onClick: PropTypes.func,
  isLink: PropTypes.bool,
  href: PropTypes.string,
  as: PropTypes.string,
};

Button.defaultProps = {
  large: false,
  inverted: false,
  isLink: false,
  href: "/",
  as: "/",
};
