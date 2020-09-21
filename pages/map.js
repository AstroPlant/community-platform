import dynamic from "next/dynamic";
import Head from "next/head";
import { useState } from "react";
import styled from "styled-components";
import InformationCard from "../components/cards/InformationCard";
import KitCountCard from "../components/cards/KitCountCard";
import Grid from "../components/grids/Grid";
import MainLayout from "../components/layouts/MainLayout";
import { getKits } from "../services/data-api";
import Breaks from "../utils/breakpoints";
import { REVALIDATION_DELAY } from "../utils/settings";

const NoSSRMapBuilder = dynamic(() => import("../components/MapBuilder"), {
  ssr: false,
});

const MapHolder = styled.div`
  @media screen and (max-width: ${Breaks.large}) {
    grid-row: 2;
  }
`;

const InfoHolder = styled.div`
  @media screen and (max-width: ${Breaks.large}) {
    grid-row: 1;
  }
`;

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
        <Grid fillHeight>
          <MapHolder>
            <NoSSRMapBuilder kits={kits} changeKit={changeSelectedKit} />
          </MapHolder>
          <InfoHolder>
            <KitCountCard title={"Active kits"} count={kits.length} />

            {selectedKit ? (
              <InformationCard
                headline={selectedKit.name}
                details={selectedKit.description}
              />
            ) : (
              <InformationCard
                headline={"How to use the kit map ?"}
                details={
                  "Here you can find out what other AstroPlant kits around the world are doing and what makes them unique! Try to click on the icons to find out more!"
                }
              />
            )}
          </InfoHolder>
        </Grid>
      </MainLayout>
    </>
  );
}

export async function getStaticProps() {
  const kits = await getKits();

  return {
    props: {
      kits: kits || [],
    },
    revalidate: REVALIDATION_DELAY,
  };
}
