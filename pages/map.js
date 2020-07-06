import dynamic from "next/dynamic";
import Head from "next/head";
import styled from "styled-components";
import Card from "../components/cards/Card";
import KitCountCard from "../components/cards/KitCountCard";
import MapGrid from "../components/grids/MapGrid";
import MainLayout from "../components/layouts/MainLayout";
import { getKits } from "../services/data-api";

const NoSSRMapBuilder = dynamic(() => import("../components/MapBuilder"), {
  ssr: false,
});

const InstructionCard = styled(Card)`
  && {
    margin-bottom: 1rem;
    height: unset;
  }
`;

export default function Map({ kits }) {
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
        />
      </Head>
      <MainLayout pageTitle={"All AstroPlant kits"}>
        <MapGrid>
          <div>
            <NoSSRMapBuilder kits={kits} />
          </div>
          <div>
            <InstructionCard>
              <b>How to use the kit map ?</b>
              <p>
                Here you can find out what other AstroPlant kits around the
                world are doing and what makes them unique! Try to click on the
                icons to find out more!
              </p>
            </InstructionCard>

            <KitCountCard title={"Active kits"} count={kits.length} />
          </div>
        </MapGrid>
      </MainLayout>
    </>
  );
}

export async function getServerSideProps() {
  const kits = await getKits();
  return {
    props: {
      kits,
    },
  };
}
