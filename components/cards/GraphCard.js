import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import Button from "../Button";
import Card from "./Card";

const Container = styled(Card)`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  justify-content: flex-start;

  padding: 1rem 1.5rem;
`;

const HeadRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
`;

const Title = styled.b`
  margin-right: 1rem;
`;

const GraphPlaceHolder = styled.div`
  display: block;
  height: 480px;
  width: 100%;
  background-color: white;
`;

export default function GraphCard(props) {
  return (
    <Container>
      <HeadRow>
        <Title>{props.graph.title}</Title>
        <Button label={"Edit Graph"} color={"#56F265"} />
      </HeadRow>
      <GraphPlaceHolder />
    </Container>
  );
}

GraphCard.propTypes = {
  graph: PropTypes.object.isRequired,
};
GraphCard.defaultProps = defaultProps;
