import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  text-align: center;
`;

const Rectangle = styled.rect`
  fill: ${(props) => props.theme[props.color]};
`;

const Loader = styled.div`
  margin: 0 0 2em;
  text-align: center;
  padding: 1rem;
  margin: 0 auto;
  display: inline-block;
  vertical-align: top;
`;

export default function LoadingAnimation(props) {
  return (
    <Container>
      <Loader>
        <svg
          x="0px"
          y="0px"
          width="24px"
          height="24px"
          viewBox="0 0 24 24"
          style={{ enableBackground: "new 0 0 50 50" }}
        >
          <Rectangle x="0" y="0" width="4" height="10" color={props.color}>
            <animateTransform
              attributeType="xml"
              attributeName="transform"
              type="translate"
              values="0 0; 0 20; 0 0"
              begin="0"
              dur="0.6s"
              repeatCount="indefinite"
            />
          </Rectangle>

          <Rectangle x="10" y="0" width="4" height="10" color={props.color}>
            <animateTransform
              attributeType="xml"
              attributeName="transform"
              type="translate"
              values="0 0; 0 20; 0 0"
              begin="0.2s"
              dur="0.6s"
              repeatCount="indefinite"
            />
          </Rectangle>

          <Rectangle x="20" y="0" width="4" height="10" color={props.color}>
            <animateTransform
              attributeType="xml"
              attributeName="transform"
              type="translate"
              values="0 0; 0 20; 0 0"
              begin="0.4s"
              dur="0.6s"
              repeatCount="indefinite"
            />
          </Rectangle>
        </svg>
      </Loader>
      {props.message && <p>{props.message}</p>}
    </Container>
  );
}

LoadingAnimation.propTypes = {
  /**
   * Color of the animation
   */
  color: PropTypes.string,
  /**
   * Message to display under the loading animation
   */
  message: PropTypes.string,
};

LoadingAnimation.defaultProps = {
  color: "primary",
  message: null,
};
