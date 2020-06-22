import withAuth from "../hocs/withAuth";
import { logout } from "../providers/Auth";

function LogOut() {
  logout();
  return <p>Disconnecting...</p>;
}

export default withAuth(LogOut);
