import { Formik } from "formik";
import { useRouter } from "next/router";
import styled from "styled-components";
import Grid from "../../components/grids/Grid";
import PeripheralCard from "../../components/cards/PeripheralCard";
import Select from "../../components/inputs/Select";
import PageLayout from "../../components/layouts/PageLayout";
import { useAuth } from "../../providers/Auth";
import { getFullKit, getKitMeasures, getKits } from "../../services/data-api";
import useTabs from "../../utils/useTabs";
import Theme from "../../styles/theme";
import { useEffect } from "react";
import { measurementsStore } from "../../stores/measurements";
import ChartCard from "../../components/cards/ChartCard";

const Row = styled.div`
    display: flex;
    width: fit-content;
    align-items: center;
    margin-top: 1.5rem;
`

const PeripheralCardsContainer = styled.div`
  align-self: flex-start;
  display: grid;
  gap: 1.5rem;
  width: 100%;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr) );
  margin-bottom: 1.5rem;
`;

const ChartsCardsContainer = styled.div`
  align-self: flex-start;
  display: grid;
  gap: 1.5rem;
  width: 100%;
  margin-bottom: 1.5rem;
  grid-template-columns: repeat(auto-fit, minmax(700px, 1fr) );
`;


function Kit({ kit, otherKits }) {
    const { user, isLogged } = useAuth();
    const router = useRouter();
    const { currentTab, Tabs } = useTabs(["Overview", "Details"]);

    useEffect(() => {
        measurementsStore.setSerial(kit.serial);
    }, [])

    return (
        <PageLayout
            metaTitle={kit.name}
            metaDescription={kit.description}
        >
            <Row>
                <Tabs />
                {/* <Formik initialValues={kit} onSubmit={(values) => { }}>
                    <Select name="kit" onChange={(e) => {
                        e.preventDefault()
                        router.push("/kit/" + e.target.value)
                    }}>
                        {otherKits?.map(kit => <option key={kit.serial} value={kit.serial}>{kit.name}</option>)}
                    </Select>
                </Formik> */}
            </Row>

            <PeripheralCardsContainer>
                {kit.config?.peripherals?.map(peripheral => {
                    peripheral.measures = kit.measures?.measures?.filter(measure => measure.peripheralId === peripheral.id);
                    return peripheral.details.expectedQuantityTypes?.map((quantityType, i) => {
                        return <PeripheralCard key={i} color={Theme.darkLight} peripheral={peripheral} expectedQuantityType={quantityType} />
                    })
                })}
            </PeripheralCardsContainer>

            <ChartsCardsContainer>

                {kit.config?.peripherals?.map(peripheral => {
                    peripheral.measures = kit.measures?.measures?.filter(measure => measure.peripheralId === peripheral.id);
                    return peripheral.details.expectedQuantityTypes?.map((quantityType, i) => {
                        return <ChartCard key={i} peripheral={peripheral} measurements={peripheral.measures} expectedQuantityType={quantityType} />
                    })
                })}
            </ChartsCardsContainer>

        </PageLayout>
    );
}

export async function getServerSideProps(context) {

    const kit = await getFullKit(context.params.serial);
    kit.measures = await getKitMeasures(context.params.serial, {});
    const otherKits = await getKits();

    return {
        props: {
            kit,
            otherKits
        },
    };
}

export default Kit;
