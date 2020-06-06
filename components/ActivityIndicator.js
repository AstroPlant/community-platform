import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

const Circle = styled.div`
  display: block;
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background-color: ${(props) =>
    props.active ? props.theme.primary : props.theme.error};
  margin: 0 0.5rem;
`;

export default function ActivityIndicator({ active }) {
  return <Circle active={active} />;
}

ActivityIndicator.propTypes = {
  active: PropTypes.bool.isRequired,
};
