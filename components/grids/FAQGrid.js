import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import FAQCard from "../../components/cards/FAQCard";

const GridContainer = styled.div`
  display: grid;
  grid-gap: ${(props) => props.theme.gridGap};
  grid-template-columns: repeat(2, 1fr);

  padding: 2rem 0;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  padding: 2rem 0;
`;

export default function FAQGrid(props) {
  const faqs = props.faqs;
  let leftQuestions = [];
  let rightQuestions = [];

  for (let i = 0; i < faqs.length; i++) {
    if (i < faqs.length / 2) {
      leftQuestions.push(faqs[i]);
    } else {
      rightQuestions.push(faqs[i]);
    }
  }

  return (
    <GridContainer>
      <Column>
        {leftQuestions.map((faq) => (
          <FAQCard key={faq.id} faq={faq} />
        ))}
      </Column>
      <Column>
        {rightQuestions.map((faq) => (
          <FAQCard key={faq.id} faq={faq} />
        ))}
      </Column>
    </GridContainer>
  );
}

FAQGrid.propTypes = {
  /* The Frequently asked questions to displat=y */
  faqs: PropTypes.arrayOf(PropTypes.object).isRequired,
};
