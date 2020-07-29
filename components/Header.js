import Link from "next/link";
import React, { useRef, useState } from "react";
import styled from "styled-components";
import { useAuth } from "../providers/Auth";
import Notification from "../public/icons/notification.svg";
import { useOutsideClick } from "../utils/clickListener";
import Avatar from "./Avatar";
import Brand from "./Brand";
import Button from "./Button";
import Dropdown from "./Dropdown";
import DropdownMenu from "./DropdownMenu";
import HeaderLink from "./HeaderLink";
import Icon from "./Icon";
import { API_URL } from "../services/community";

const HeaderContainer = styled.header`
  position: fixed;
  top: 0%;
  left: 0%;

  z-index: 2;

  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  max-height: ${(props) => props.theme.headerHeight};

  padding: 0.75rem 2rem;

  background-color: ${(props) => props.theme.darkLight};

  font-size: 1em;
  font-weight: bold;
  color: ${(props) => props.theme.light};
`;

const LinksContainer = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: center;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const ClickableItems = styled(Row)`
  cursor: pointer;
`;

const Separator = styled.div`
  display: block;

  height: 1px;
  width: 100%;

  margin: 0.5rem 0;

  background-color: ${(props) => props.theme.light};
`;

const NotificationHolder = styled(Icon)`
  transform: rotate(45deg);
`;

export default function Header() {
  const { user, isLogged } = useAuth();

  // Variables to handles opening & closing dropdown menus
  const [hideMenu, setHideMenu] = useState(true);
  const [hideNotif, setHideNotif] = useState(true);

  const ddMenuRef = useRef(null);
  const ddMenuTriggerRef = useRef(null);

  const ddNotifRef = useRef(null);
  const ddNotifTriggerRef = useRef(null);

  const ddMenuClick = useOutsideClick(
    ddMenuRef,
    ddMenuTriggerRef,
    closeMenu.bind(this)
  );

  const ddNotificationsClick = useOutsideClick(
    ddNotifRef,
    ddNotifTriggerRef,
    closeNotif.bind(this)
  );

  /**
   * Changes the state of the selected menu
   * @param {string} selected menus
   */
  function toggleDropdown(selected) {
    if (selected === "Menu") {
      setHideMenu(!hideMenu);
    } else {
      setHideNotif(!hideNotif);
    }
  }

  /**
   * Closes the dropdown menu
   */
  function closeMenu() {
    setHideMenu(true);
  }

  /**
   * Closes the notification menu
   */
  function closeNotif() {
    setHideNotif(true);
  }

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

  return (
    <HeaderContainer>
      <Brand />

      <LinksContainer>
        {menuLinks.map((link) => (
          <HeaderLink key={link.id} label={link.label} slug={link.slug} />
        ))}
      </LinksContainer>

      {isLogged ? (
        <>
          <Row>
            <div
              ref={ddNotifTriggerRef}
              onClick={() => toggleDropdown("Notification")}
            >
              <NotificationHolder color={"light"} size={24}>
                <Notification />
              </NotificationHolder>
              <DropdownMenu ref={ddNotifRef} hidden={hideNotif}>
                <b>Notifications</b>
                <Separator />

                <p>No notifications yet</p>
              </DropdownMenu>
            </div>

            <ClickableItems
              ref={ddMenuTriggerRef}
              onClick={() => toggleDropdown("Menu")}
            >
              <div>
                <Avatar
                  size={2.25}
                  imgSrc={API_URL + user.avatar.url}
                  username={user.username}
                />
                <DropdownMenu ref={ddMenuRef} hidden={hideMenu}>
                  <p>
                    Signed in as <b>{user.username}</b>
                  </p>
                  <Link
                    passHref
                    href={"/users/[username]"}
                    as={`/users/${user.username}`}
                  >
                    <a>My profile</a>
                  </Link>
                  <Link passHref href={"/settings"}>
                    <a>Settings</a>
                  </Link>
                  <Separator />
                  <Link passHref href={"/logout"}>
                    <a>Log out</a>
                  </Link>
                </DropdownMenu>
              </div>

              <Dropdown reverse={!hideMenu} />
            </ClickableItems>
          </Row>
        </>
      ) : (
        <Link passHref href={"/login"}>
          <Button color="primary" label={"Become a space farmer"} />
        </Link>
      )}
    </HeaderContainer>
  );
}
