import styled from "styled-components";
import LoadingAnimation from "./LoadingAnimation";
import { useSearch } from "../providers/Search";
import SearchResults from "./SearchResults";
import PropTypes from "prop-types";

const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 100vh;
`;

/**
 * @param WrappedComponent The component that this functionality
 * will be added to.
 * @param LoadingComponent The component that will be rendered while
 * the auth state is loading.
 * @param type the type of object query by the search
 */
export default function SearchableContent(props) {
  const { results, params, isLoading } = useSearch();

  return (
    <>
      {results ? (
        <>
          {isLoading ? (
            <Center>
              <LoadingAnimation message={"Searching the database..."} />
            </Center>
          ) : (
            <SearchResults
              params={params}
              results={results}
              resultsType={props.type}
            />
          )}
        </>
      ) : (
        <>{props.children}</>
      )}
    </>
  );
}

SearchableContent.propTypes = {
  /* Node children of the component */
  children: PropTypes.node.isRequired,
  /* type of content to search for */
  type: PropTypes.string.isRequired,
};
