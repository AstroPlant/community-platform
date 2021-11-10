import styled from "styled-components";
import propTypes from "prop-types";
import Theme from "../../styles/theme";
import moment from "moment";

const Container = styled.div`
    background: ${props => props.theme.dark};
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
`

const TimeSince = styled.p`
    font-style: italic;
    align-self: flex-end;
`

export default function PeripheralCard(props) {

    const { peripheral } = props;
    const quantityType = peripheral.details.quantityTypes.find(quantityType => quantityType.id === props.expectedQuantityType);
    const measurement = peripheral.measures.find(measurement => measurement.quantityTypeId === props.expectedQuantityType);
    if (!measurement) return null;

    return (
        <Container {...props}>
            <Type>{quantityType?.physicalQuantity || "-"}</Type>

            <ValueUnitContainer>
                <Value>{(measurement.values.average.toFixed(2)) || "-"}</Value>
                <Unit>{quantityType.physicalUnitSymbol}</Unit>
            </ValueUnitContainer>

            <PerifName>{peripheral.name}</PerifName>

            <TimeSince>{moment(measurement.datetimeEnd).fromNow()}</TimeSince>
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