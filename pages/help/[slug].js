import FAQGrid from "../../components/grids/FAQGrid";
import MainLayout from "../../components/layouts/MainLayout";
import { getHelpSectionBySlug, searchFAQs } from "../../services/community";

export default function FAQ({ section }) {
  return (
    <MainLayout enableSearch searchFor={"faqs"} pageTitle={section.title}>
      <FAQGrid faqs={section.faqs} />
    </MainLayout>
  );
}

export async function getServerSideProps(context) {
  const section = await getHelpSectionBySlug(context.params.slug);

  return {
    props: {
      section,
    },
  };
}
