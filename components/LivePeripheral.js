import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const DataRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Value = styled.b`
  font-size: 2rem;
  margin-right: 0.5rem;
`;

const QuantitySymbol = styled.p`
  font-size: 1.25rem;
`;

const QuantityMeasured = styled.b`
  color: ${(props) => props.theme.primary};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export default function LivePeripheral(props) {
  console.log(props.peripheral);
  const quantityTypes = props.peripheral.details.quantityTypes;
  return (
    <Column>
      <DataRow>
        <Value>19</Value>
        <QuantitySymbol>{quantityTypes[0].physicalUnitSymbol}</QuantitySymbol>
      </DataRow>
      <QuantityMeasured>{quantityTypes[0].physicalQuantity}</QuantityMeasured>
      <p>{props.peripheral.details.model}</p>
    </Column>
  );
}

LivePeripheral.propTypes = {
  /**
   * Object containing the peripheral information
   */
  peripheral: PropTypes.object.isRequired,
};
