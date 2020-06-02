import DashboardGrid from "../components/DashboardGrid";
import Layout from "../components/Layout";

export default function Home() {
  return (
    <div className="container">
      <Layout home>
        <h1 className="title">Welcome, Matt!</h1>

        <DashboardGrid></DashboardGrid>
      </Layout>
    </div>
  );
}
