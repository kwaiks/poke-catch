import { useMemo } from "react";
import { 
    ApolloClient, 
    InMemoryCache, NormalizedCacheObject } from 
"@apollo/client";
import { API_URL } from "config/constant";

let apolloClient: ApolloClient<NormalizedCacheObject>;


function createApolloClient() {
  return new ApolloClient({
    ssrMode: (typeof window === "undefined"), // set to true for SSR
    uri: API_URL,
    headers: {
        'Access-Control-Allow-Origin': '*',
        "Access-Control-Allow-Methods":"GET,POST,OPTIONS",
        "Access-Control-Allow-Headers": "Connection, Host, Origin, Referer, Access-Control-Request-Method, Access-Control-Request-Headers, User-Agent, Accept, Content-Type, Authorization, Content-Length, X-Requested-With, Accept-Encoding, Accept-Language"
    },
    cache: new InMemoryCache()
  });
}

export function initializeApollo(initialState: NormalizedCacheObject | null = null) {
    const _apolloClient = apolloClient ?? createApolloClient();

    // If your page has Next.js data fetching methods that use Apollo Client,
    // the initial state gets hydrated here
    if (initialState) {
      // Get existing cache, loaded during client side data fetching
      const existingCache = _apolloClient.extract();

      // Restore the cache using the data passed from
      // getStaticProps/getServerSideProps combined with the existing cached data
      _apolloClient.cache.restore({ ...existingCache, ...initialState });
    }

    // For SSG and SSR always create a new Apollo Client
    if (typeof window === "undefined") return _apolloClient;

    // Create the Apollo Client once in the client
    if (!apolloClient) apolloClient = _apolloClient;
    return _apolloClient;
}

export function useApollo(initialState) {
    const store = useMemo(() => initializeApollo(initialState), [initialState]);
    return store;
}