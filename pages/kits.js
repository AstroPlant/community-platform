import MembershipGrid from "../components/grids/MembershipGrid";
import MainLayout from "../components/layouts/MainLayout";
import withAuth from "../hocs/withAuth";
import { getLoggedUser } from "../providers/Auth";
import { getUserMemberships } from "../services/data-api";

function Kits({ memberships }) {
  return (
    <MainLayout pageTitle={"Your kits"}>
      <MembershipGrid memberships={memberships} />
    </MainLayout>
  );
}

export async function getServerSideProps(ctx) {
  const { username } = getLoggedUser(ctx.req.headers.cookie);
  const memberships = await getUserMemberships(username);

  return {
    props: {
      memberships: memberships,
    },
  };
}

export default withAuth(Kits);
