import styled from "styled-components";
import { useSearch } from "../providers/Search";
import SearchBar from "./inputs/SearchBar";
import LoadingAnimation from "./LoadingAnimation";
import SearchResults from "./SearchResults";

const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 100vh;
`;

const LargeSearchBar = styled(SearchBar)`
  && {
    height: 56px;
    margin: 2rem 0 1rem 0;
    background-color: ${(props) => props.theme.darkLight};
  }
`;

export default function SearchMenu(props) {
  const search = useSearch();

  return (
    <>
      <LargeSearchBar />

      {search.isLoading ? (
        <Center>
          <LoadingAnimation message={"Searching the database..."} />
        </Center>
      ) : (
        <>
          {search.results && (
            <SearchResults params={search.params} results={search.results} />
          )}
        </>
      )}
    </>
  );
}

SearchMenu.propTypes = {};
