import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import SVGLogo from "../public/logos/astroplant.svg";

const LogoHolder = styled.div`
  display: block;
  height: ${(props) => props.size}rem;
  width: ${(props) => props.size}rem;
`;

const ColoredLogo = styled(SVGLogo)`
  fill: ${(props) => props.theme[props.color]} !important;
  width: 100%;
  height: 100%;
`;

export default function Logo(props) {
  return (
    <LogoHolder className={props.className} size={props.size}>
      <ColoredLogo color={props.color} />
    </LogoHolder>
  );
}

Logo.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.number,
};

Logo.defaultProps = {
  color: "primary",
  size: 2,
};
