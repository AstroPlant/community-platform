import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import useSWR from "swr";
import { getKitMeasures, getMoreMeasures } from "../../services/data-api";
import Button from "../Button";
import Graph from "../Graph";
import LoadingAnimation from "../LoadingAnimation";
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
  const key = [
    props.graph.kitSerial,
    props.graph.peripherals[0].quantityTypeId,
    props.graph.configId,
    props.graph.peripherals[0].id,
  ];

  const fetcher = (kitSerial, quantityTypeId, configurationId, peripheralId) =>
    getKitMeasures(kitSerial, {
      quantityTypeId: quantityTypeId,
      configurationId: configurationId,
      peripheralId: peripheralId,
    });

  const { data, error, mutate } = useSWR(key, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  async function addMoreData() {
    if (data.next != null) {
      const response = await getMoreMeasures(data.next);

      mutate(
        {
          ...data,
          next: response.next,
          measures: data.measures.concat(response.measures),
        },
        false
      );
    } else {
      alert("No more data available.");
    }
  }

  return (
    <Container>
      <HeadRow>
        <Title>{props.graph.title}</Title>
        <Row>
          <Button
            label={"Edit Graph"}
            color={"primary"}
            onClick={() => props.editGraph()}
          />
          <Button
            inverted
            label={"More Data"}
            color={"dark"}
            onClick={() => addMoreData()}
          />
        </Row>
      </HeadRow>

      <GraphHolder>
        {data && typeof error === "undefined" ? (
          <Graph graph={props.graph} data={data.measures} />
        ) : (
          <LoadingAnimation message="Fetching graph data..." />
        )}
        {error && <p>Could not load graph data.</p>}
      </GraphHolder>
    </Container>
  );
}

GraphCard.propTypes = {
  /**
   * Object containing the graph to display
   */
  graph: PropTypes.object.isRequired,
  /**
   * Function to execute when the "Edit graph" button is clicked
   */
  editGraph: PropTypes.func,
};

GraphCard.defaultProps = {
  editGraph: null,
};
