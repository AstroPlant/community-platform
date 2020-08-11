import Link from "next/link";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import { useAuth } from "../../providers/Auth";
import Button from "../Button";
import SearchBar from "../inputs/SearchBar";
import Path from "../Path";
import SearchableContent from "../SearchableContent";
import PageLayout from "./PageLayout";

const HeadRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  @media screen and (max-width: 864px) {
    flex-direction: column;
  }
`;

const PageTitle = styled.h2`
  margin-right: auto;
`;

const CreateButton = styled(Button)`
  margin: 0;

  @media screen and (max-width: 1024px) {
    display: none;
  }
`;

const SearchbarHolder = styled.div`
  width: 33%;
  margin-left: 2rem;

  @media screen and (max-width: 864px) {
    width: 100%;
    margin: 1.5rem 0 0 0;
  }
`;

export default function MainLayout(props) {
  const { isLogged, user } = useAuth();

  return (
    <PageLayout
      metaTitle={props.metaTitle}
      metaDescription={props.metaDescription}
    >
      <Path />
      <HeadRow>
        <PageTitle>{props.pageTitle}</PageTitle>

        {isLogged && (
          <>
            {props.toolsFor === "libraryMedias" && (
              <Link passHref href="/library/create-media">
                <CreateButton label={"Create Media"} color={"primary"} />
              </Link>
            )}

            {props.toolsFor === "articles" && user.role.name === "Editor" && (
              <Link passHref href="/">
                <CreateButton
                  disabled
                  label={"Create Article"}
                  color={"primary"}
                />
              </Link>
            )}
          </>
        )}

        {props.enableSearch && (
          <SearchbarHolder>
            <SearchBar searchFor={props.searchFor} />
          </SearchbarHolder>
        )}
      </HeadRow>

      {props.enableSearch ? (
        <SearchableContent type={props.searchFor}>
          {props.children}
        </SearchableContent>
      ) : (
        <>{props.children}</>
      )}
    </PageLayout>
  );
}

MainLayout.propTypes = {
  /* Node children of the component */
  children: PropTypes.node.isRequired,
  /* Whether or not to hide the searchbar */
  enableSearch: PropTypes.bool,
  /* The type of content to search */
  searchFor: PropTypes.string,
  /* Whether or not to hide the tools */
  toolsFor: PropTypes.string,
  /* Meta title of the page */
  metaTitle: PropTypes.string,
  /* Meta description of the page */
  metaDescription: PropTypes.string,
};

MainLayout.defaultProps = {
  enableSearch: false,
  searchFor: null,
  toolsFor: null,
  metaTitle: null,
  metaDescription: null,
};
