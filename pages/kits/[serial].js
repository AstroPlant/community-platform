import React from "react";
import KitDashboardGrid from "../../components/grids/KitDashboardGrid";
import MainLayout from "../../components/layouts/MainLayout";
import withAuth from "../../hocs/withAuth";
import { getCookieFromHttp } from "../../providers/Auth";
import { getUsersGraphs } from "../../services/community";
import { getFullKit } from "../../services/data-api";

function KitDashBoard({ kit, graphs }) {
  return (
    <MainLayout pageTitle={kit.name}>
      <KitDashboardGrid kit={kit} graphs={graphs} />
    </MainLayout>
  );
}

export async function getServerSideProps(context) {
  const username = getCookieFromHttp(context.req.headers.cookie, "username");
  const kit = await getFullKit(context.params.serial);
  const graphs = await getUsersGraphs(username, context.params.serial);

  return {
    props: {
      kit,
      graphs,
    },
  };
}

export default withAuth(KitDashBoard);
