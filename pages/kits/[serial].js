import React from "react";
import { getFullKit } from "../../services/data-api";
import withAuth from "../../hocs/withAuth";
import MainLayout from "../../components/layouts/MainLayout";

function KitDashBoard({ kit }) {
  return <MainLayout pageTitle={kit.name}></MainLayout>;
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
