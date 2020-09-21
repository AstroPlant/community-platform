import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

const Caption = styled.i`
  margin: 0.75rem 0 0 0;
  color: ${(props) => props.theme.grey};

  text-align: center;
  font-style: italic;
  font-size: 14px;
`;

export default function PostCaption({ caption, className }) {
  return <Caption className={className}>{caption}</Caption>;
}

PostCaption.propTypes = { caption: PropTypes.string.isRequired };
