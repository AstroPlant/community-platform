import React, { useEffect } from "react";
import MainLayout from "../components/layouts/MainLayout";
import SearchMenu from "../components/SearchMenu";
import { useSearch } from "../providers/Search";

export default function SearchPage({ query }) {
  const search = useSearch();

  useEffect(() => {
    function init() {
      search.setParams({ ...search.params, query });
      search.execute();
    }

    init();
  }, [query]);

  return (
    <MainLayout pageTitle="Search" metaTitle="Search">
      <SearchMenu />
    </MainLayout>
  );
}

export async function getServerSideProps(ctx) {
  return {
    props: {
      query: ctx.query.keywords,
    },
  };
}
