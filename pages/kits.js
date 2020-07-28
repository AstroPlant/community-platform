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
  const user = getLoggedUser(ctx.req.headers.cookie);
  let memberships = [];

  if (user != null) {
    memberships = await getUserMemberships(user.username);
  }

  return {
    props: {
      memberships: memberships,
    },
  };
}

export default withAuth(Kits);
