import styled from "styled-components";
import propTypes from "prop-types";
import Theme from "../../styles/theme";
import moment from "moment";
import { observer } from "mobx-react-lite"
import { useContext } from "react";
import { measurementCtx } from "../../stores/measurements";

const Container = styled.div`
    background: ${props => props.color || props.theme.dark};
    padding: 1rem 1.5rem;
    border-radius: ${props => props.theme.radiusMin};
    display: flex;
    flex-direction: column;
`

const ValueUnitContainer = styled.div`
    display: flex;
    align-items: center;
    align-self: center;
`

const Value = styled.h1`
    color: ${props => props.theme.primary};
    margin-right: 1rem;
`

const Type = styled.h4`
    align-self: flex-start;
    margin-bottom: 1.5rem;
`

const Unit = styled.h3`
    font-weight: 400;
`

const PerifName = styled.p`
    margin-bottom: 1.5rem;
    align-self: center;
`

const TimeSince = styled.p`
    font-style: italic;
    align-self: flex-end;
`

function PeripheralCard(props) {

    const measurementsStore = useContext(measurementCtx);
    const { peripheral } = props;

    const quantityType = peripheral.details.quantityTypes.find(quantityType => quantityType.id === props.expectedQuantityType);
    let measurement = Object.assign([], measurementsStore.measurements)
        .sort((a, b) => moment(a.datetime).valueOf() > moment(b.datetime).valueOf() ? -1 : 1)
        .find(measurement => measurement.quantityType === props.expectedQuantityType);

    // Fallback incase the WS does not send us anything
    if (!measurement) {
        const oldMeasurement = peripheral.measures.sort((a, b) => moment(a.endDatetime).valueOf() > moment(b.endDatetime).valueOf() ? -1 : 1).find(measurement => measurement.quantityTypeId === props.expectedQuantityType);
        measurement = {
            value: oldMeasurement.values.average,
            datetime: oldMeasurement.endDatetime
        }
    }

    if (!measurement) return null;
    return (
        <Container {...props}>
            <Type>{quantityType?.physicalQuantity || "-"}</Type>

            <ValueUnitContainer>
                <Value>{(measurement.value.toFixed(2)) || "-"}</Value>
                <Unit>{quantityType?.physicalUnitSymbol}</Unit>
            </ValueUnitContainer>

            <PerifName>{peripheral.name}</PerifName>

            <TimeSince>{moment(measurement.datetime).fromNow()}</TimeSince>
        </Container>
    )
}

PeripheralCard.propTypes = {
    color: propTypes.string,
    expectedQuantityType: propTypes.number.isRequired,
    peripheral: propTypes.object.isRequired
};

PeripheralCard.defaultProps = {
    color: Theme.greyDark,
    peripheral: {}
};

export default observer(PeripheralCard);