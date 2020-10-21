import { createContext, useContext, useEffect, useState } from "react";
import { search } from "../services/community";

/* Creating a search context
 */
export const SearchContext = createContext({
  params: {},
  setParams: () => {},
  results: null,
  setResults: () => {},
  isLoading: true,
});

// Provider passing the SearchContext to its children
export const SearchProvider = ({ children }) => {
  // passing context values to states to avoid too many rendering
  const [params, setParams] = useState({});
  const [results, setResults] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    function init() {
      if (params.query && params.query !== "") {
        execute();
      }
    }

    init();
  }, [params]);

  /**
   * Execute the search with the current parameters
   */
  async function execute() {
    setLoading(true);
    const res = await search(params);
    setLoading(false);
    setResults(res.data);
  }

  /**
   * Clears the results and parameters
   */
  function clear() {
    setParams({});
    setResults(null);
  }

  return (
    <SearchContext.Provider
      value={{
        execute,
        clear,
        params,
        setParams,
        results,
        isLoading,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export function useSearch() {
  const context = useContext(SearchContext);

  if (context === undefined) {
    throw new Error("useSearch must be used within a SearchProvider");
  }

  return context;
}
