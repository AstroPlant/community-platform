import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import FileIcon from "../../public/icons/file.svg";
import Breaks from "../../utils/breakpoints";
import Card from "../cards/Card";
import Icon from "../Icon";

const Container = styled(Card)`
  && {
    padding: 1.5rem;
    align-items: center;
  }

  margin: 2rem 0;

  border: 2px solid #5a5a5a;
  border-radius: ${(props) => props.theme.radiusMax};

  background-color: ${(props) => props.theme.dark};
`;

const IconHolder = styled(Icon)`
  padding: 1.5rem;
  margin: 0;

  border-radius: ${(props) => props.theme.radiusMax};

  background-color: ${(props) => props.theme.darkLight};

  @media screen and (max-width: ${Breaks.medium}) {
    padding: 0.5rem;
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

export default function ArticleFile({ file }) {
  return (
    <a
      target="_blank"
      href={process.env.NEXT_PUBLIC_STRAPI_PUBLIC_URL + file.file.url}
    >
      <Container animateOnHover>
        <IconHolder color={"primary"} size={32}>
          <FileIcon />
        </IconHolder>
        <Sep />
        <MetaColumn>
          <b>{file.title}</b>
          <Description>{file.description}</Description>
        </MetaColumn>
      </Container>
    </a>
  );
}

ArticleFile.propTypes = {
  /**
   * Link component containing a caption and a url
   */
  file: PropTypes.object.isRequired,
};
