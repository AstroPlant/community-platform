import dynamic from "next/dynamic";
import Head from "next/head";
import MapGrid from "../components/grids/MapGrid";
import MainLayout from "../components/layouts/MainLayout";
import { getKits } from "../services/data-api";

const NoSSRMapBuilder = dynamic(() => import("../components/MapBuilder"), {
  ssr: false,
});

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
            <NoSSRMapBuilder kits={kits}></NoSSRMapBuilder>
          </div>
          <div />
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
