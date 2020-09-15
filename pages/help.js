import HelpGrid from "../components/grids/HelpGrid";
import MainLayout from "../components/layouts/MainLayout";
import { getHelpSections } from "../services/community";
import { REVALIDATION_DELAY } from "../utils/settings";

export default function Help({ helpSections }) {
  return (
    <>
      <MainLayout
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

export async function getStaticProps() {
  return {
    props: {
      helpSections: await getHelpSections(),
    },
    revalidate: REVALIDATION_DELAY,
  };
}
