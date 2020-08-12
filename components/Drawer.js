import Link from "next/link";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import { useAuth } from "../providers/Auth";
import CloseIcon from "../public/icons/close.svg";
import LogoutIcon from "../public/icons/exit-app.svg";
import SettingsIcon from "../public/icons/settings.svg";
import { API_URL } from "../services/community";
import Avatar from "./Avatar";
import Button from "./Button";
import Icon from "./Icon";
import WrapInLink from "./WrapInLink";
import Breaks from "../utils/breakpoints";

const Container = styled.nav`
  position: fixed;
  top: 0%;
  right: 0%;
  z-index: 999;

  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  align-items: flex-start;

  width: 100vw;
  height: 100vh;

  padding: 0.75rem 2rem;
  background-color: ${(props) => props.theme.darkLight};

  transform: ${(props) => (props.open ? "translateX(0%)" : "translateX(100%)")};
  transition: transform 0.3s ease-in-out;

  overflow-y: scroll;

  a {
    font-weight: 500;
  }

  @media screen and (min-width: ${Breaks.large}) {
    display: none;
  }
`;

const CloseIconHolder = styled(Icon)`
  margin-left: auto;
`;

const UserRow = styled.div`
  display: flex;
  align-items: center;

  width: 100%;

  margin: 1rem 0 2rem 0;
`;

const UserInfo = styled.div`
  margin: 0 1.5rem;

  a {
    color: ${(props) => props.theme.primary};
  }
`;

const NavLinks = styled.ol`
  list-style-type: none;

  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  align-items: flex-start;

  a {
    font-size: 20px;
    line-height: 2;
  }
`;

const ExtraLinks = styled.div`
  margin: 0 0 0 auto;

  display: flex;
  align-items: center;
`;

const SignUpButton = styled(Button)`
  && {
    margin: auto 0 1.25rem 0;

    width: 100%;
  }
`;

export default function Drawer({ open, toggle, links, ...props }) {
  const { user, isLogged } = useAuth();

  return (
    <Container open={open} {...props}>
      <CloseIconHolder size={32} onClick={() => toggle()}>
        <CloseIcon />
      </CloseIconHolder>

      {isLogged && (
        <UserRow>
          <Avatar
            username={user.username}
            size={64}
            imgSrc={API_URL + user.avatar.url}
          />
          <UserInfo>
            <h3>{user.username}</h3>
            <WrapInLink
              href={"/users/[username]"}
              as={`/users/${user.username}`}
            >
              My profile
            </WrapInLink>
          </UserInfo>

          <ExtraLinks>
            <WrapInLink href={"/settings"}>
              <Icon size={32}>
                <SettingsIcon />
              </Icon>
            </WrapInLink>

            <WrapInLink href={"/logout"}>
              <Icon size={32}>
                <LogoutIcon />
              </Icon>
            </WrapInLink>
          </ExtraLinks>
        </UserRow>
      )}

      <NavLinks>
        {links.map((link) => (
          <WrapInLink key={link.id} href={`/${link.slug}`}>
            {link.label}
          </WrapInLink>
        ))}
      </NavLinks>

      {!isLogged && (
        <Link passHref href={"/login"}>
          <SignUpButton color={"primary"} label={"Sign Up / Login"} />
        </Link>
      )}
    </Container>
  );
}

Drawer.propTypes = {
  /**
   * Whether or not the drawer is opened
   */
  open: PropTypes.bool.isRequired,
  /**
   * function to handle the drawer state
   */
  toggle: PropTypes.func.isRequired,
  /**
   * array of navigation links
   */
  links: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Drawer.defaultProps = {};
