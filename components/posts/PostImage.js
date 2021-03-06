import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import PostCaption from "./PostCaption";

const Container = styled.div`
  display: flex;
  flex-direction: column;

  margin: 2rem 0;
`;

const ImageHolder = styled.img`
  border-radius: ${(props) => props.theme.radiusMax};
`;

export default function PostImage({ image }) {
  return (
    <Container>
      <ImageHolder
        src={process.env.NEXT_PUBLIC_STRAPI_PUBLIC_URL + image.image.url}
        alt={image.caption}
      />
      <PostCaption caption={image.caption} />
    </Container>
  );
}

PostImage.propTypes = {
  /**
   * Image component containing a caption and a url
   */
  image: PropTypes.object.isRequired,
};
