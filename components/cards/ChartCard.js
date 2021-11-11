import { observer } from 'mobx-react-lite';
import { Line } from 'react-chartjs-2';
import styled from 'styled-components';
import propTypes from "prop-types";
import Theme from '../../styles/theme';
import useTabs from '../../utils/useTabs';

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

function ChartCard({ expectedQuantityType, peripheral, measurements }) {
    const { currentTab, Tabs } = useTabs(["1 hour", "3 hours", "1 day"]);
    const quantityType = peripheral.details.quantityTypes.find(quantityType => quantityType.id === expectedQuantityType);
    console.log(measurements)

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
                labels={["Minimum", "Average", "Maximum"]}
                redraw={true}
                data={{
                    datasets: [
                        {
                            label: "Minimum",
                            data: measurements
                                .map(measurement => measurement.values.minimum),
                            fill: true,
                            backgroundColor: Theme.primaryTransparent,
                        },
                        {
                            label: "Average",
                            data: measurements
                                .map(measurement => measurement.values.average),
                            fill: true,
                            backgroundColor: Theme.primarySemiTransparent
                        },
                        {
                            label: "Maximum",
                            data: measurements
                                .map(measurement => measurement.values.maximum),
                            fill: true,
                            backgroundColor: Theme.primary
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