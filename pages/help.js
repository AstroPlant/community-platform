import HelpGrid from "../components/grids/HelpGrid";
import MainLayout from "../components/layouts/MainLayout";
import { getHelpSections } from "../services/community";

export default function Help({ helpSections }) {
  return (
    <>
      <MainLayout
        enableSearch
        searchFor={"faqs"}
        pageTitle={"How can we help you ?"}
        metaTitle={"Help"}
        metaDescription={
          "Help section of AstroPlant, frequently asked questions, community support."
        }
      >
        <HelpGrid helpSections={helpSections} />
      </MainLayout>
    </>
  );
}

export async function getServerSideProps() {
  return {
    props: {
      helpSections: await getHelpSections(),
    },
  };
}
