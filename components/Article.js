import PropTypes from "prop-types";
import React from "react";
import ReactMarkdown from "react-markdown";
import styled from "styled-components";
import { API_URL } from "../services/community";
import styles from "../styles/markdown.module.css";
import Breaks from "../utils/breakpoints";
import Chip from "./Chip";

const CoverImage = styled.img`
  position: relative;
  z-index: -1;

  height: 50vh;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  width: 95%;
  max-width: 744px;

  margin: -3rem auto 0 auto;
  padding: 2rem;
  background-color: ${(props) => props.theme.darkLight};

  @media screen and (max-width: ${Breaks.small}) {
    width: 100%;
    margin: -3rem 0 0 0;
  }
`;

const Title = styled.h1`
  margin: 2rem 0;
  line-height: 1.2;
`;

const Row = styled.div`
  display: flex;
`;

export default function Article(props) {
  // Temporary dev env fixes
  const content = props.article.content.replace(
    /\/uploads/g,
    API_URL + "/uploads"
  );
  const coverURL = API_URL + props.article.cover.url;

  return (
    <div>
      <CoverImage src={coverURL} alt={props.article.cover.caption} />
      <Container>
        <Row>
          {props.article.categories &&
            props.article.categories.map((category) => (
              <Chip key={category.id} label={category.title} />
            ))}
        </Row>

        <Title>{props.article.title}</Title>
        <ReactMarkdown source={content} className={styles.md} />
      </Container>
    </div>
  );
}

Article.propTypes = {
  /**
   * Object containing the article informations
   */
  article: PropTypes.object.isRequired,
};
