import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import Button from "../Button";
import Card from "./Card";

const Container = styled(Card)`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  padding: 1rem;
`;

const CardInfos = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

const Title = styled.b`
  margin-right: 1rem;
`;

const Description = styled.p`
  font-weight: 300;
  font-size: 14px;
  margin-top: 2px;
`;

export default function KitToolCard(props) {
  return (
    <Container>
      <CardInfos>
        <Title>{props.title}</Title>
        <Description>{props.description}</Description>
      </CardInfos>
      <Button label={"Open"} color={"primary"} onClick={() => props.action()} />
    </Container>
  );
}

KitToolCard.propTypes = {
  /**
   * Title of the card (Tool Name)
   */
  title: PropTypes.string.isRequired,
  /**
   * Description of the tool
   */
  description: PropTypes.string.isRequired,
  /**
   * Function to execute on button push
   */
  action: PropTypes.string,
};

KitToolCard.defaultProps = {
  action: null,
};
