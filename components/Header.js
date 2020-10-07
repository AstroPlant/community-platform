import Link from "next/link";
import React, { useState } from "react";
import styled from "styled-components";
import { useAuth } from "../providers/Auth";
import CloseIcon from "../public/icons/close.svg";
import MenuIcon from "../public/icons/menu.svg";
import Notification from "../public/icons/notification.svg";
import SearchIcon from "../public/icons/search.svg";
import Breaks from "../utils/breakpoints";
import Avatar from "./Avatar";
import Brand from "./Brand";
import Button from "./Button";
import Drawer from "./Drawer";
import DropdownMenu from "./DropdownMenu";
import HeaderLink from "./HeaderLink";
import SearchBar from "./inputs/SearchBar";

const HeaderContainer = styled.header`
  position: fixed;
  top: 0%;
  left: 0%;

  z-index: 2;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  max-height: ${(props) => props.theme.headerHeight};

  background-color: ${(props) => props.theme.darkLight};

  font-size: 1em;
  font-weight: bold;
  color: ${(props) => props.theme.light};
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  max-width: 1920px;

  padding: 0.75rem 2rem;
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

const SearchBarHolder = styled.div`
  position: absolute;
  z-index: 1;

  display: flex;
  align-items: center;
  justify-content: center;

  top: ${(props) => (props.show ? props.theme.headerHeight : "0%")};

  width: 100%;

  padding: 0 2rem;

  transition: top ease-out 0.15s;
`;

const HeaderSearchBar = styled(SearchBar)`
  && {
    max-width: 1856px;
    margin: 0;
    background-color: ${(props) => props.theme.darkLight};
  }
`;

const ButtonsRow = styled.div`
  display: flex;
  align-items: center;
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

const Separator = styled.div`
  display: block;

  height: 1px;
  width: 90%;

  margin: 0.5rem auto;

  background-color: rgba(256, 256, 256, 0.5);
`;

const HeaderButton = styled(Button)`
  && {
    max-height: 40px;
    margin: 0 0.5rem;
  }
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
  && {
    @media screen and (min-width: ${Breaks.large}) {
      display: none;
    }
  }
`;

const menuLinks = [
  {
    label: "Home",
    slug: "",
    id: 1,
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
    label: "Roadmap",
    slug: "roadmap",
    id: 8,
  },
];

export default function Header() {
  const { user, isLogged } = useAuth();

  const [openDrawer, setOpenDrawer] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);

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
    if (!openSearch) {
      document.getElementById("query").focus();
    }
  }

  return (
    <>
      <HeaderContainer>
        <HeaderContent>
          <Brand />

          <LinksContainer>
            {menuLinks.map((link) => (
              <HeaderLink key={link.id} label={link.label} slug={link.slug} />
            ))}
          </LinksContainer>

          <ButtonsRow>
            <HeaderButton
              inverted
              label={"Open search"}
              color="dark"
              icon={openSearch ? <CloseIcon /> : <SearchIcon />}
              onClick={() => toggleSearch()}
            />

            <DrawerMenuButton
              inverted
              label={"Open menu"}
              color="dark"
              icon={<MenuIcon />}
              onClick={() => toggleDrawer()}
            />

            <Drawer open={openDrawer} toggle={toggleDrawer} links={menuLinks} />

            {isLogged ? (
              <UserHeaderTools>
                <div>
                  <DropdownMenu
                    name="notif"
                    trigger={
                      <HeaderButton
                        inverted
                        label={"Open notifications"}
                        color="dark"
                        icon={<Notification />}
                      />
                    }
                  >
                    <b>Notifications</b>
                    <Separator />
                    <p>No notifications yet</p>
                  </DropdownMenu>
                </div>

                <Link passHref href="/library/create-media">
                  <HeaderButton inverted color="secondary" label="Share" />
                </Link>

                <DropdownMenu
                  name="user"
                  trigger={<HeaderAvatar size={40} avatar={user.avatar} />}
                >
                  <b>{user.username}</b>

                  <Separator />

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
              </UserHeaderTools>
            ) : (
              <SignUpButtonHolder>
                <Link passHref href={"/login"}>
                  <HeaderButton
                    inverted
                    color="secondary"
                    label={"Log in / Sign Up"}
                  />
                </Link>
              </SignUpButtonHolder>
            )}
          </ButtonsRow>
        </HeaderContent>
      </HeaderContainer>
      <SearchBarHolder show={openSearch}>
        <HeaderSearchBar />
      </SearchBarHolder>
    </>
  );
}
