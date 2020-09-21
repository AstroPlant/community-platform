import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import FAQCard from "../../components/cards/FAQCard";
import Breaks from "../../utils/breakpoints";
import Grid from "./Grid";

const EmptyGrid = styled.div`
  padding: 2rem 0;
`;

const GridContainer = styled(Grid)`
  && {
    grid-template-columns: repeat(2, 1fr);

    @media screen and (max-width: ${Breaks.large}) {
      grid-template-columns: unset;
    }
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export default function FAQGrid({ faqs }) {
  // Sorting questions to be placed into columns
  // Avoids big gaps on opposite side when a FAQ is open on one dide
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
    <>
      {faqs.length === 0 ? (
        <EmptyGrid>
          <p>No FAQs were found.</p>
        </EmptyGrid>
      ) : (
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
      )}
    </>
  );
}

FAQGrid.propTypes = {
  /* Array containing the frequently asked questions */
  faqs: PropTypes.arrayOf(PropTypes.object).isRequired,
};
