import dynamic from "next/dynamic";
import Head from "next/head";
import styled from "styled-components";
import Card from "../components/cards/Card";
import KitCountCard from "../components/cards/KitCountCard";
import MapGrid from "../components/grids/MapGrid";
import MainLayout from "../components/layouts/MainLayout";
import { getKits } from "../services/data-api";
import { useState } from "react";

const NoSSRMapBuilder = dynamic(() => import("../components/MapBuilder"), {
  ssr: false,
});

const InstructionCard = styled(Card)`
  && {
    margin-bottom: 1rem;
    height: unset;
  }

  flex-direction: column;
`;

const KitDetailsCard = styled(Card)`
  && {
    margin-bottom: 1rem;
    height: unset;
  }
`;

const CardTitle = styled.h4``;

export default function Map({ kits }) {
  const [selectedKit, setSelectedKit] = useState(null);

  function changeSelectedKit(kitSerial) {
    if (kitSerial === null) {
      setSelectedKit(null);
    }

    for (let kit of kits) {
      if (kit.serial === kitSerial) {
        setSelectedKit(kit);
      }
    }
  }

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
            <NoSSRMapBuilder kits={kits} changeKit={changeSelectedKit} />
          </div>
          <div>
            <KitCountCard title={"Active kits"} count={kits.length} />

            {selectedKit ? (
              <KitDetailsCard>
                <CardTitle>{selectedKit.name}</CardTitle>
                <p>{selectedKit.description}</p>
              </KitDetailsCard>
            ) : (
              <InstructionCard>
                <CardTitle>How to use the kit map ?</CardTitle>
                <p>
                  Here you can find out what other AstroPlant kits around the
                  world are doing and what makes them unique! Try to click on
                  the icons to find out more!
                </p>
              </InstructionCard>
            )}
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
