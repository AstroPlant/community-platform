import PropTypes from "prop-types";
import React, { useState } from "react";
import styled from "styled-components";
import Dropdown from "../Dropdown";
import Card from "./Card";

const Container = styled(Card)`
  display: flex;
  flex-direction: column;

  transition: 0.3s ease;
`;

const QuestionRow = styled.div`
  flex: 1;

  display: flex;
  align-items: center;
  justify-content: space-between;

  color: ${(props) => (props.open ? props.theme.primary : props.theme.light)};

  &:hover {
    color: ${(props) => props.theme.primary};
    fill: ${(props) => props.theme.primary};
  }
`;

const Question = styled.b``;

const AnswerRow = styled.div`
  flex: 3;

  display: ${(props) => (props.open ? "flex" : "none")};

  margin-top: 1rem;
`;

const Answer = styled.p``;

export default function FAQCard({ question, answer, date }) {
  const [open, setOpen] = useState(false);

  return (
    <Container>
      <QuestionRow open={open}>
        <Question>{question}</Question>{" "}
        <Dropdown onClick={() => setOpen(!open)} reverse={open} />
      </QuestionRow>
      <AnswerRow open={open}>
        <Answer>{answer}</Answer>
      </AnswerRow>
    </Container>
  );
}

FAQCard.propTypes = {
  question: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
};
