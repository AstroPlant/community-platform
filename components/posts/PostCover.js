import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Breaks from "../../utils/breakpoints";

const CoverImage = styled.img`
  border-radius: ${(props) => props.theme.radiusMax}
    ${(props) => props.theme.radiusMax} 0 0;

  height: 512px;

  @media screen and (max-width: ${Breaks.medium}) {
    height: 256px;
  }
`;

export default function PostCover({ cover }) {
  // Checking for cover and replacing placeholders
  let image = {
    url: cover
      ? process.env.NEXT_PUBLIC_STRAPI_PUBLIC_URL + cover.url
      : "/images/placeholder.jpg",
    caption: cover
      ? cover.caption
      : "A plant sprout growing out of the ground.",
  };

  return <CoverImage src={image.url} alt={image.caption} />;
}

PostCover.propTypes = {
  /**
   * Object containing the cover details
   */
  cover: PropTypes.object,
};

PostCover.defaultProps = {
  cover: null,
};
