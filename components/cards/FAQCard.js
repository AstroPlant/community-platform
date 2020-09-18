import PropTypes from "prop-types";
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import styled from "styled-components";
import ArrowIcon from "../../public/icons/arrow-down.svg";
import styles from "../../styles/markdown.module.css";
import Date from "../Date";
import Dropdown from "../Dropdown";
import Card from "./Card";

const Container = styled(Card)`
  && {
    height: min-content;
  }

  flex-direction: column;
  justify-content: center;

  margin-bottom: 2rem;
`;

const QuestionRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  color: ${(props) => (props.open ? props.theme.primary : props.theme.light)};

  &:hover {
    cursor: pointer;
    color: ${(props) => props.theme.primary};
    svg {
      fill: ${(props) => props.theme.primary};
    }
  }
`;

const AnswerRow = styled.div`
  display: ${(props) => (props.open ? "flex" : "none")};
  flex-direction: column;

  margin-top: ${(props) => (props.open ? "2rem" : "0")};

  overflow: hidden;
`;

const DateRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  margin-top: 1rem;
`;

export default function FAQCard({ faq }) {
  const [open, setOpen] = useState(false);

  return (
    <Container>
      <QuestionRow open={open} onClick={() => setOpen(!open)}>
        <ReactMarkdown source={faq.question} />
        <Dropdown
          reverse={open}
          color={open ? "primary" : "light"}
          icon={<ArrowIcon />}
        />
      </QuestionRow>
      <AnswerRow open={open}>
        <ReactMarkdown source={faq.answer} className={styles.md} />
        <DateRow>
          <Date dateString={faq.updated_at} />
        </DateRow>
      </AnswerRow>
    </Container>
  );
}

FAQCard.propTypes = {
  /**
   * Object containing the FAQ information
   */
  faq: PropTypes.object.isRequired,
};
