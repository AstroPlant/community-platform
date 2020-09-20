import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import usePlaceholder from "../utils/usePlaceholder";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;

  overflow: hidden;

  border-bottom: ${(props) =>
    !props.theme.hasCover && `1px solid ${props.theme.greyDark}`};
`;

export default function Cover({ className, cover, children }) {
  const image = usePlaceholder(cover);

  const hasCover = cover != null;

  return (
    <Container hasCover={hasCover} className={className}>
      {image}
      {children}
    </Container>
  );
}

Cover.propTypes = {
  /**
   * Object containing the cover details
   */
  cover: PropTypes.object,
  children: PropTypes.node,
};

Cover.defaultProps = {
  cover: null,
};
