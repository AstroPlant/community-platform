import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import Breaks from "../../utils/breakpoints";
import Card from "../cards/Card";
import PostCaption from "./PostCaption";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin: 2rem 0;

  width: 100%;
`;

const RichLinkContainer = styled(Card)`
  && {
    padding: 1.5rem;
    align-items: center;
  }

  border: 2px solid ${(props) => props.theme.greyDark};
  border-radius: ${(props) => props.theme.radiusMax};

  background-color: ${(props) => props.theme.dark};
`;

const ImageHolder = styled.img`
  height: 96px;
  width: 96px;

  border-radius: ${(props) => props.theme.radiusMax};

  @media screen and (max-width: ${Breaks.medium}) {
    height: 48px;
    width: 48px;
  }
`;

const Sep = styled.div`
  display: block;

  margin: 0 2rem;

  height: 96px;
  width: 1px;

  background-color: ${(props) => props.theme.grey};

  @media screen and (max-width: ${Breaks.medium}) {
    height: 48px;
    margin: 0 1rem;
  }

  @media screen and (max-width: ${Breaks.small}) {
    display: none;
  }
`;

const MetaColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const Description = styled.p`
  line-height: 1.35em;
  margin: 0.5rem 0;

  @media screen and (max-width: ${Breaks.medium}) {
    display: none;
  }
`;

const Publisher = styled.p`
  color: ${(props) => props.theme.primary};
  font-size: 14px;
`;

export default function PostLink({ link }) {
  return (
    <Container>
      <a href={link.url} target="_blank">
        <RichLinkContainer animateOnHover>
          <ImageHolder
            src={link.meta_image_url}
            alt={`${link.meta_publisher} site image`}
          />
          <Sep />
          <MetaColumn>
            <b>{link.meta_title}</b>
            <Description>{link.meta_description}</Description>
            <Publisher>{link.meta_publisher}</Publisher>
          </MetaColumn>
        </RichLinkContainer>
      </a>

      {link.url_caption && <PostCaption caption={link.url_caption} />}
    </Container>
  );
}

PostLink.propTypes = {
  /**
   * Link component containing a caption and a url
   */
  link: PropTypes.object.isRequired,
};
