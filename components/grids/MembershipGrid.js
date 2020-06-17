import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import KitMembershipCard from "../cards/KitMembershipCard";

const Grid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  padding: 2rem 0;
`;

const ListTitle = styled.h3`
  margin-bottom: 1rem;
`;

const KitList = styled.div`
  margin-bottom: 2rem;
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

  return (
    <Grid>
      <div>
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
      </div>
      <div />
    </Grid>
  );
}

MembershipGrid.propTypes = {
  memberships: PropTypes.arrayOf(PropTypes.object).isRequired,
};
