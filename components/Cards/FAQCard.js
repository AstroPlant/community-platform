import PropTypes from "prop-types";
import React, { useState } from "react";
import styled from "styled-components";
import Date from "../Date";
import Dropdown from "../Dropdown";
import Card from "./Card";

const Container = styled(Card)`
  && {
    height: unset;
  }

  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;

  transition: height 0.3s ease;
`;

const QuestionRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  color: ${(props) => (props.open ? props.theme.primary : props.theme.light)};

  &:hover {
    color: ${(props) => props.theme.primary};
    fill: ${(props) => props.theme.primary};
  }
`;

const AnswerRow = styled.div`
  display: flex;

  height: ${(props) => (props.open ? "auto" : "0")};

  flex-direction: column;

  margin-top: ${(props) => (props.open ? "1rem" : "0")};

  overflow: hidden;

  transition: margin-top 0.1s linear;
`;

const DateRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  margin-top: 1rem;

  font-style: italic;
`;

export default function FAQCard(props) {
  const [open, setOpen] = useState(false);
  const faq = props.faq;
  return (
    <Container>
      <QuestionRow open={open}>
        <b>{faq.question}</b>
        <Dropdown
          onClick={() => setOpen(!open)}
          reverse={open}
          color={open ? "primary" : "#fff"}
        />
      </QuestionRow>
      <AnswerRow open={open}>
        <p>{faq.answer}</p>
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
