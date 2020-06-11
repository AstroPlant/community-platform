import PropTypes from "prop-types";
import React, { useRef, useState } from "react";
import styled from "styled-components";
import Notification from "../public/icons/notification.svg";
import { useOutsideClick } from "../utils/clickListener";
import Avatar from "./Avatar";
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

const BrandContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.div`
  display: block;
  height: 2rem;
  width: 2rem;
  background-color: white;
`;

const Separator = styled.div`
  display: block;
  height: 2rem;
  width: 1px;
  background-color: ${(props) => props.theme.grey};
  margin: 0 1rem;
`;

const BrandName = styled.h3`
  color: white;
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
  const dropdownRef = useRef(null);

  useOutsideClick(dropdownRef, closeDropdown.bind(this));

  const extraLinks = [
    {
      name: "Settings",
    },
    {
      name: "Log Out",
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
      <BrandContainer>
        <Logo></Logo>
        <Separator></Separator>
        <BrandName>astroplant</BrandName>
      </BrandContainer>

      <LinksContainer>
        <HeaderLink active label={"Home"} />
        <HeaderLink label={"Kit Map"} />
        <HeaderLink label={"News"} />
        <HeaderLink label={"Help"} />
        <HeaderLink label={"Library"} />
        <HeaderLink label={"Community"} />
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
        <Dropdown onClick={() => toggleDropdown()} reverse={!hideDropdown} />
      </ProfileButtons>

      <DropdownLinks
        forwardedRef={dropdownRef}
        links={extraLinks}
        hidden={hideDropdown}
      />
    </HeaderContainer>
  );
}

Header.propTypes = {
  username: PropTypes.string.isRequired,
};
