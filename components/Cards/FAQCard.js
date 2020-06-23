import PropTypes from "prop-types";
import React, { useState } from "react";
import styled from "styled-components";
import Dropdown from "../Dropdown";
import Card from "./Card";
import Date from "../Date";

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
  flex-direction: column;

  margin-top: 1rem;
`;

const DateRow = styled.div`
  flex: 3;

  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 1rem;
`;

const Answer = styled.p``;

export default function FAQCard(props) {
  const [open, setOpen] = useState(false);
  const faq = props.faq;
  return (
    <Container>
      <QuestionRow open={open}>
        <Question>{faq.question}</Question>{" "}
        <Dropdown
          onClick={() => setOpen(!open)}
          reverse={open}
          color={open ? "#56F265" : "#fff"}
        />
      </QuestionRow>
      <AnswerRow open={open}>
        <Answer>{faq.answer}</Answer>
        <DateRow>
          <Date dateString={faq.updated_at} />
        </DateRow>
      </AnswerRow>
    </Container>
  );
}

FAQCard.propTypes = {
  /* the faq object */
  faq: PropTypes.object.isRequired,
};
