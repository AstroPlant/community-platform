import styled from "styled-components";
import InProgress from "../components/InProgress";
import MainLayout from "../components/layouts/MainLayout";
import { getChallenges } from "../services/community";

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 100%;
`;

export default function Challenges({ challenges }) {
  return (
    <MainLayout
      pageTitle={"Community Challenges"}
      metaTitle={"Challenges"}
      metaDescription={
        "All the community challenges proposed by AstroPlant. Join a challenge now and help space and plant scientists around the world."
      }
    >
      <Content>
        <InProgress
          title={"Currently in the works"}
          details={
            "We are currently working on defining and building community challenges in association with our partners. If you want to learn more about communtiy challenges or want to help building them, please shoot us a message on the Slack."
          }
        />
      </Content>
    </MainLayout>
  );
}

export async function getServerSideProps() {
  return {
    props: {
      challenges: await getChallenges(),
    },
  };
}
