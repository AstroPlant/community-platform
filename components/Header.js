import Link from "next/link";
import React, { useRef, useState } from "react";
import styled from "styled-components";
import { useAuth } from "../providers/Auth";
import MenuIcon from "../public/icons/menu.svg";
import DropdownIcon from "../public/icons/more.svg";
import Notification from "../public/icons/notification.svg";
import { API_URL } from "../services/community";
import { useOutsideClick } from "../utils/clickListener";
import Avatar from "./Avatar";
import Brand from "./Brand";
import Button from "./Button";
import Drawer from "./Drawer";
import Dropdown from "./Dropdown";
import DropdownMenu from "./DropdownMenu";
import HeaderLink from "./HeaderLink";
import Icon from "./Icon";

const BREAKPOINT = "960px";

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

  @media screen and (max-width: ${BREAKPOINT}) {
    display: none;
  }
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  @media screen and (max-width: ${BREAKPOINT}) {
    display: none;
  }
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

const SignUpButtonHolder = styled.div`
  @media screen and (max-width: ${BREAKPOINT}) {
    display: none;
  }
`;

// Mobile Components

const MenuIconHolder = styled(Icon)`
  @media screen and (min-width: ${BREAKPOINT}) {
    display: none;
  }
`;

export default function Header() {
  const { user, isLogged } = useAuth();

  // Variables to handles opening & closing dropdown menus
  const [hideMenu, setHideMenu] = useState(true);
  const [hideNotif, setHideNotif] = useState(true);
  const [openDrawer, setOpenDrawer] = useState(false);

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
   * Changes the state of the drawer
   */
  function toggleDrawer() {
    setOpenDrawer(!openDrawer);
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
  ];

  return (
    <HeaderContainer>
      <Brand />

      <LinksContainer>
        {menuLinks.map((link) => (
          <HeaderLink key={link.id} label={link.label} slug={link.slug} />
        ))}
      </LinksContainer>

      <MenuIconHolder size={32} onClick={() => toggleDrawer()}>
        <MenuIcon />
      </MenuIconHolder>

      <Drawer open={openDrawer} toggle={toggleDrawer} links={menuLinks} />

      {isLogged ? (
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
                size={36}
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

            <Dropdown reverse={!hideMenu} icon={<DropdownIcon />} />
          </ClickableItems>
        </Row>
      ) : (
        <SignUpButtonHolder>
          <Link passHref href={"/login"}>
            <Button color="primary" label={"Become a space farmer"} />
          </Link>
        </SignUpButtonHolder>
      )}
    </HeaderContainer>
  );
}
