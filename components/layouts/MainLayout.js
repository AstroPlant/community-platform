import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import Grid from "../grids/Grid";
import Path from "../Path";
import BaseLayout from "./BaseLayout";
import SearchBar from "../inputs/SearchBar";
import SearchableContent from "../SearchableContent";
import { useAuth } from "../../providers/Auth";
import Button from "../Button";
import Link from "next/link";

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
    <BaseLayout>
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
    </BaseLayout>
  );
}

MainLayout.propTypes = {
  /* Node children of the component */
  children: PropTypes.node.isRequired,
  /* Whether or not to hide the searchbar */
  enableSearch: PropTypes.bool,
  /* The type of content to search */
  searchFor: PropTypes.string,
};

MainLayout.defaultProps = {
  enableSearch: false,
  searchFor: null,
};
