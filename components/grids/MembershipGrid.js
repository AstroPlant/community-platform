import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import KitMembershipCard from "../cards/KitMembershipCard";
import Grid from "./Grid";
import Button from "../Button";

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

const ListTitle = styled.h3`
  margin-bottom: 1rem;
`;

const KitList = styled.div`
  margin-bottom: 2rem;
`;

const AddButton = styled(Button)`
  margin: auto 0 0 0;
  width: auto;
  align-self: flex-end;
`;

export default function MembershipGrid(props) {
  let OwnedKitMemberships = [];
  let FollowedKitMemberShips = [];

  for (let membership of props.memberships) {
    if (membership.accessSuper) {
      OwnedKitMemberships.push(membership);
    } else {
      FollowedKitMemberShips.push(membership);
    }
  }

  //TODO Implement add kit functionality

  return (
    <Grid>
      <Column>
        <ListTitle>Owned</ListTitle>
        <KitList>
          {OwnedKitMemberships.length === 0 ? (
            <p>No kit owned.</p>
          ) : (
            <>
              {OwnedKitMemberships.map((membership) => (
                <KitMembershipCard
                  key={membership.id}
                  membership={membership}
                />
              ))}
            </>
          )}
        </KitList>

        <ListTitle>Member of</ListTitle>
        <KitList>
          {FollowedKitMemberShips.length === 0 ? (
            <p>No kit followed.</p>
          ) : (
            <>
              {FollowedKitMemberShips.map((membership) => (
                <KitMembershipCard
                  key={membership.id}
                  membership={membership}
                />
              ))}
            </>
          )}
        </KitList>
        <AddButton disabled label={"Add a kit"} color={"primary"} />
      </Column>
      <div />
    </Grid>
  );
}

MembershipGrid.propTypes = {
  /* Array containing membership objects */
  memberships: PropTypes.arrayOf(PropTypes.object).isRequired,
};
