import MainLayout from "../components/layouts/MainLayout";
import withAuth from "../hocs/withAuth";
import { getCookieFromHttp } from "../providers/Auth";
import { getUserMemberships } from "../services/data-api";
import MembershipGrid from "../components/grids/MembershipGrid";

function Kits({ memberships }) {
  return (
    <MainLayout pageTitle={"Your kits"}>
      <MembershipGrid memberships={memberships} />
    </MainLayout>
  );
}

export async function getServerSideProps(ctx) {
  const username = getCookieFromHttp(ctx.req.headers.cookie, "username");
  const memberships = await getUserMemberships(username);

  return {
    props: {
      memberships: memberships,
    },
  };
}

export default withAuth(Kits);
