import Link from "next/link";
import React, { useRef, useState } from "react";
import styled from "styled-components";
import { useAuth } from "../providers/Auth";
import MenuIcon from "../public/icons/menu.svg";
import Notification from "../public/icons/notification.svg";
import SearchIcon from "../public/icons/search.svg";
import Breaks from "../utils/breakpoints";
import { useOutsideClick } from "../utils/clickListener";
import Avatar from "./Avatar";
import Brand from "./Brand";
import Button from "./Button";
import Drawer from "./Drawer";
import DropdownMenu from "./DropdownMenu";
import HeaderLink from "./HeaderLink";
import Icon from "./Icon";
import SearchBar from "./inputs/SearchBar";

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

  @media screen and (max-width: ${Breaks.large}) {
    display: none;
  }
`;

const Row = styled.div`
  display: flex;
  align-items: center;

  width: 100%;
`;

const ButtonsRow = styled(Row)`
  justify-content: flex-end;

  width: auto;
`;

const UserHeaderTools = styled(ButtonsRow)`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  @media screen and (max-width: ${Breaks.large}) {
    display: none;
  }
`;

const ClickableItem = styled.div`
  cursor: pointer;
`;

const Separator = styled.div`
  display: block;

  height: 1px;
  width: 100%;

  margin: 0.5rem 0;

  background-color: ${(props) => props.theme.light};
`;

const IconButtonHolder = styled(Icon)`
  margin: 0;
`;

const HeaderButton = styled(Button)`
  max-height: 40px;
  margin: 0 0.5rem;
`;

const HeaderAvatar = styled(Avatar)`
  margin: 0 0.5rem;
`;

const SignUpButtonHolder = styled.div`
  @media screen and (max-width: ${Breaks.large}) {
    display: none;
  }
`;

// Mobile Components

const DrawerMenuButton = styled(HeaderButton)`
  @media screen and (min-width: ${Breaks.large}) {
    display: none;
  }
`;

export default function Header() {
  const { user, isLogged } = useAuth();

  // Variables to handles opening & closing dropdown menus
  const [hideMenu, setHideMenu] = useState(true);
  const [hideNotif, setHideNotif] = useState(true);

  const [openDrawer, setOpenDrawer] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);

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
   * Changes the state of the search
   */
  function toggleSearch() {
    setOpenSearch(!openSearch);
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
      {openSearch ? (
        <Row>
          <SearchBar />

          <HeaderButton
            inverted
            label="Hide"
            color="dark"
            onClick={() => toggleSearch()}
          />
        </Row>
      ) : (
        <>
          <Brand />

          <LinksContainer>
            {menuLinks.map((link) => (
              <HeaderLink key={link.id} label={link.label} slug={link.slug} />
            ))}
          </LinksContainer>

          <ButtonsRow>
            <HeaderButton
              inverted
              color="dark"
              icon={<SearchIcon />}
              onClick={() => toggleSearch()}
            />

            <DrawerMenuButton
              inverted
              color="dark"
              icon={<MenuIcon />}
              onClick={() => toggleDrawer()}
            />

            <Drawer open={openDrawer} toggle={toggleDrawer} links={menuLinks} />

            {isLogged ? (
              <UserHeaderTools>
                <div
                  ref={ddNotifTriggerRef}
                  onClick={() => toggleDropdown("Notification")}
                >
                  <HeaderButton
                    inverted
                    color="dark"
                    icon={<Notification />}
                    onClick={() => toggleNotification()}
                  />

                  <DropdownMenu ref={ddNotifRef} hidden={hideNotif}>
                    <b>Notifications</b>
                    <Separator />
                    <p>No notifications yet</p>
                  </DropdownMenu>
                </div>

                <Link passHref href="/library/create-media">
                  <HeaderButton color="primary" label="Share" />
                </Link>

                <ClickableItem
                  ref={ddMenuTriggerRef}
                  onClick={() => toggleDropdown("Menu")}
                >
                  <HeaderAvatar size={40} avatar={user.avatar} />
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
                </ClickableItem>
              </UserHeaderTools>
            ) : (
              <SignUpButtonHolder>
                <Link passHref href={"/login"}>
                  <HeaderButton color="primary" label={"Log in / Sign Up"} />
                </Link>
              </SignUpButtonHolder>
            )}
          </ButtonsRow>
        </>
      )}
    </HeaderContainer>
  );
}
