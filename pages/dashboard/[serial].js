import styled from "styled-components";
import PageLayout from "../../components/layouts/PageLayout";
import { getLoggedUser, useAuth } from "../../providers/Auth";
import { getFullKit, getKitMeasures, getUserDetails, getUserMemberships } from "../../services/data-api";

function Dashboard({ }) {
    const { user, isLogged } = useAuth();

    return (
        <PageLayout
            metaTitle={"Home"}
            metaDescription={
                "The AstroPlant community platform. Read the latest astroplant news, share your results and stories with your fellow space farmers! Manage your kits, and find help and support for your kit issues. AstroPlant, growing a new generation of urban and space farmers."
            }
        >
        </PageLayout>
    );
}

export async function getServerSideProps(ctx) {
    let mainKit = null;
    const user = getLoggedUser(ctx.req.headers.cookie);

    let completeUser = null;
    let memberships = null;

    if (user) {
        completeUser = await getUserDetails(user.username);
        memberships = await getUserMemberships(user.username);

        if (Array.isArray(memberships) && memberships[0]?.kit) {
            const kit = await getFullKit(memberships[0].kit.serial);
            kit.measures = await getKitMeasures(memberships[0].kit.serial, {});
            mainKit = kit;
        }
    }

    return {
        props: {
            mainKit: mainKit,
        },
    };
}

export default Dashboard;
