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

    flex-direction: column;
    justify-content: center;

    margin-bottom: 2rem;
    padding: 0;
  }
`;

const QuestionRow = styled.div`
  display: flex;
  justify-content: space-between;

  padding: 2rem;

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

  padding: 1.25rem 2rem;

  background-color: #292929;
  border-top: 2px solid ${(props) => props.theme.greyDark};

  overflow: hidden;
`;

const FAQDropdown = styled(Dropdown)`
  margin-left: 0.5rem;
`;

const AnswerDate = styled(Date)`
  font-size: 14px;
  margin-bottom: 1rem;
`;

export default function FAQCard({ faq }) {
  const [open, setOpen] = useState(false);

  return (
    <Container>
      <QuestionRow open={open} onClick={() => setOpen(!open)}>
        <ReactMarkdown source={faq.question} />
        <FAQDropdown
          reverse={open}
          color={open ? "primary" : "light"}
          icon={<ArrowIcon />}
        />
      </QuestionRow>
      <AnswerRow open={open}>
        <AnswerDate dateString={faq.updated_at} />

        <ReactMarkdown source={faq.answer} className={styles.md} />
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
