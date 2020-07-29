import Link from "next/link";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import { useAuth } from "../../providers/Auth";
import Button from "../Button";
import Grid from "../grids/Grid";
import SearchBar from "../inputs/SearchBar";
import Path from "../Path";
import SearchableContent from "../SearchableContent";
import PageLayout from "./PageLayout";

const HeadRow = styled(Grid)`
  && {
    padding: 0;
  }
`;

const Row = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export default function MainLayout(props) {
  const { isLogged } = useAuth();

  return (
    <PageLayout
      metaTitle={props.metaTitle}
      metaDescription={props.metaDescription}
    >
      <Path />
      <HeadRow>
        <h2>{props.pageTitle}</h2>

        <Row>
          {isLogged && (
            <Link passHref href="/library/medias/create">
              <Button label={"+"} color={"primary"} />
            </Link>
          )}
          {props.enableSearch && <SearchBar searchFor={props.searchFor} />}
        </Row>
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
  /* Meta title of the page */
  metaTitle: PropTypes.string,
  /* Meta description of the page */
  metaDescription: PropTypes.string,
};

MainLayout.defaultProps = {
  enableSearch: false,
  searchFor: null,
  metaTitle: null,
  metaDescription: null,
};
