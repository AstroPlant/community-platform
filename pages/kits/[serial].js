import React from "react";
import KitDashboardGrid from "../../components/grids/KitDashboardGrid";
import MainLayout from "../../components/layouts/MainLayout";
import withAuth from "../../hocs/withAuth";
import { getLoggedUser } from "../../providers/Auth";
import { getUsersGraphs } from "../../services/community";
import { getFullKit } from "../../services/data-api";

function KitDashBoard({ kit, graphs }) {
  return (
    <MainLayout pageTitle={kit.name} metaTitle={kit.name}>
      <KitDashboardGrid kit={kit} graphs={graphs} />
    </MainLayout>
  );
}

export async function getServerSideProps(context) {
  const { username } = getLoggedUser(context.req.headers.cookie);

  return {
    props: {
      kit: await getFullKit(context.params.serial),
      graphs: await getUsersGraphs(username, context.params.serial),
    },
  };
}

export default withAuth(KitDashBoard);
