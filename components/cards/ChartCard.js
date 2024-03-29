import { observer } from 'mobx-react-lite';
import { Line } from 'react-chartjs-2';
import styled from 'styled-components';
import propTypes from "prop-types";
import Theme from '../../styles/theme';
import useTabs from '../../utils/useTabs';
import moment from 'moment';

const Container = styled.div`
    padding: 1.5rem;
    border-radius: ${props => props.theme.radiusMin};
    background: ${props => props.theme.darkLight};
`

const Row = styled.div`
    display: flex;
    align-items: center;
`

const RowCenter = styled(Row)`
    justify-content: space-between;
    margin-top: 1.5rem;
`

const Type = styled.h4`
`

const MeasuredByType = styled.p`
    font-style: italic;
    align-self: flex-end;
`

const NoWrap = styled.p`
    white-space: nowrap;
`

const data = {
    labels: ['1', '2', '3', '4', '5', '6'],
    datasets: [
        {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            fill: false,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgba(255, 99, 132, 0.2)',
        },
    ],
};


function ChartCard({ expectedQuantityType, peripheral, measurements }) {
    const { currentTab, Tabs } = useTabs(["1 hour", "3 hours", "1 day"]);
    const quantityType = peripheral.details.quantityTypes.find(quantityType => quantityType.id === expectedQuantityType);

    const min = measurements
        .map(measurement => measurement.values.minimum.toFixed(2));

    const max = measurements
        .map(measurement => measurement.values.maximum.toFixed(2))

    const average = measurements
        .map(measurement => measurement.values.average.toFixed(2))

    const labels = measurements.map(measurement => moment(measurement.datetimeEnd).format("HH:mm"))

    return (
        <Container>
            <Row>
                <Type>{quantityType?.physicalQuantity || "-"}</Type>
            </Row>

            <RowCenter>
                <div style={{ marginBottom: "-1.5rem" }}>
                    <Tabs noMargin />
                </div>
                <MeasuredByType>Measured by {peripheral?.name || "-"}</MeasuredByType>
            </RowCenter>

            <Line
                options={{}}
                data={{
                    labels,
                    datasets: [
                        {
                            label: "Minimum",
                            data: min,
                            fill: true,
                            backgroundColor: Theme.primary,
                        },
                        {
                            label: "Average",
                            data: average,
                            fill: true,
                            backgroundColor: Theme.primarySemiTransparent
                        },
                        {
                            label: "Maximum",
                            data: max,
                            fill: true,
                            backgroundColor: Theme.primaryTransparent
                        }
                    ]
                }}
            />

        </Container>
    )
}

ChartCard.propTypes = {
    color: propTypes.string,
    expectedQuantityType: propTypes.number.isRequired,
    peripheral: propTypes.object.isRequired,
    measurements: propTypes.array.isRequired
};

ChartCard.defaultProps = {
    color: Theme.greyDark,
    peripheral: {},
    measurements: []
};

export default observer(ChartCard);