import FAQCard from "../../components/cards/FAQCard";
import FAQGrid from "../../components/grids/FAQGrid";
import MainLayout from "../../components/layouts/MainLayout";
import { getCategoryBySlug } from "../../services/community";

export default function FAQ({ category }) {
  return (
    <MainLayout pageTitle={category.name}>
      <FAQGrid>
        {category.faqs.map((faq) => (
          <FAQCard
            key={faq.id}
            question={faq.question}
            answer={faq.answer}
            date={faq.created_at}
          />
        ))}
      </FAQGrid>
    </MainLayout>
  );
}

export async function getServerSideProps(context) {
  const category = await getCategoryBySlug(context.params.slug);

  return {
    props: {
      category,
    },
  };
}
