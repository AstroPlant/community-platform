import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getKitMeasures, getMoreMeasures } from "../../services/data-api";
import Button from "../Button";
import Graph from "../Graph";
import Card from "./Card";

const Container = styled(Card)`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  justify-content: flex-start;

  padding: 1rem 1.5rem;
  margin: 1.5rem 0;
`;

const HeadRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const Title = styled.b`
  margin-right: 1rem;
`;

const GraphHolder = styled.div`
  width: 100%;
`;

export default function GraphCard(props) {
  const [data, setData] = useState([]);
  const [next, setNext] = useState("");

  useEffect(() => {
    async function getData() {
      const res = await getKitMeasures(props.graph.kitSerial, {
        quantityTypeId: props.graph.peripherals[0].quantityTypeId,
        configurationId: props.graph.configId,
        peripheralId: props.graph.peripherals[0].id,
      });

      setData(res.measures);
      setNext(res.next);
    }

    getData();
  }, []);

  async function addMoreData() {
    const response = await getMoreMeasures(next);

    for (let measure of response.measures) {
      data.push(measure);
    }

    setNext(response.next);
  }

  return (
    <Container>
      <HeadRow>
        <Title>{props.graph.title}</Title>
        <Row>
          <Button label={"Edit Graph"} color={"#56F265"} />
          <Button
            inverted
            label={"More Data"}
            color={"#000"}
            onClick={() => addMoreData()}
          />
        </Row>
      </HeadRow>

      <GraphHolder>
        <Graph graph={props.graph} data={data} />
      </GraphHolder>
    </Container>
  );
}

GraphCard.propTypes = {
  graph: PropTypes.object.isRequired,
};
