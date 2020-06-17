import PropTypes from "prop-types";
import React, { useRef, useState } from "react";
import styled from "styled-components";
import Notification from "../public/icons/notification.svg";
import { useOutsideClick } from "../utils/clickListener";
import Avatar from "./Avatar";
import Brand from "./Brand";
import Dropdown from "./Dropdown";
import DropdownLinks from "./DropdownLinks";
import HeaderLink from "./HeaderLink";
import Icon from "./Icon";

const HeaderContainer = styled.header`
  position: relative;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 1rem 2rem;

  background-color: #1d1d1d;
  color: #fff;

  font-size: 1em;
  font-weight: bold;

  max-height: ${(props) => props.theme.headerHeight};
`;

const LinksContainer = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: center;
`;

const ProfileButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export default function Header({ username }) {
  const [hideDropdown, setHideDropdown] = useState(true);

  const dropdownLinksRef = useRef(null);
  const dropdownButtonRef = useRef(null);

  useOutsideClick(
    dropdownLinksRef,
    dropdownButtonRef,
    closeDropdown.bind(this)
  );

  const menuLinks = [
    {
      label: "Home",
      slug: "",
      id: 1,
    },
    {
      label: "My Kits",
      slug: "kits",
      id: 2,
    },
    {
      label: "Kit Map",
      slug: "map",
      id: 3,
    },
    {
      label: "Challenges",
      slug: "challenges",
      id: 4,
    },
    {
      label: "News",
      slug: "news",
      id: 5,
    },
    {
      label: "Help",
      slug: "help",
      id: 6,
    },
    {
      label: "Library",
      slug: "library",
      id: 7,
    },
    {
      label: "Community",
      slug: "community",
      id: 8,
    },
  ];

  const extraLinks = [
    {
      label: "Settings",
      slug: "settings",
      id: 9,
    },
    {
      label: "Log Out",
      slug: "logout",
      id: 10,
    },
  ];

  function toggleDropdown() {
    setHideDropdown(!hideDropdown);
  }

  function closeDropdown() {
    setHideDropdown(true);
  }

  return (
    <HeaderContainer>
      <Brand />

      <LinksContainer>
        {menuLinks.map((link) => (
          <HeaderLink key={link.id} label={link.label} slug={link.slug} />
        ))}
      </LinksContainer>

      <ProfileButtons>
        <Icon color={"#fff"} size="24px">
          <Notification></Notification>
        </Icon>
        <Avatar
          size={2.25}
          username={username}
          href={"/profile/[username]"}
          as={`/profile/${username}`}
        />
        <Dropdown
          ref={dropdownButtonRef}
          onClick={() => toggleDropdown()}
          reverse={!hideDropdown}
        />
      </ProfileButtons>

      <DropdownLinks
        ref={dropdownLinksRef}
        links={extraLinks}
        hidden={hideDropdown}
      />
    </HeaderContainer>
  );
}

Header.propTypes = {
  username: PropTypes.string.isRequired,
};
