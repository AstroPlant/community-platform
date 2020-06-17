import React from "react";
import KitDashboardGrid from "../../components/grids/KitDashboardGrid";
import MainLayout from "../../components/layouts/MainLayout";
import withAuth from "../../hocs/withAuth";
import { getFullKit } from "../../services/data-api";

function KitDashBoard({ kit }) {
  return (
    <MainLayout pageTitle={kit.name}>
      <KitDashboardGrid kit={kit} />
    </MainLayout>
  );
}

export async function getServerSideProps(context) {
  const kit = await getFullKit(context.params.serial);

  return {
    props: {
      kit,
    },
  };
}

export default withAuth(KitDashBoard);
