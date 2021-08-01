import Head from "next/head";
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "gql/client";
import { PokemonProvider } from "context/pokemonContext";
import { ScreenProvider } from "context/screenContext";

function PokeCatchApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={apolloClient}>
      <ScreenProvider>
        <PokemonProvider>
          <Head>
            <meta charSet="utf-8" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta
              name="viewport"
              content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
            />
            <meta name="description" content="Pokemon Web Application. Alexander Jacquelline" />
            <meta name="keywords" content="pokemon, catch, pokecatch, pokeapi" />
            <title>Pokemon Catch</title>
            <link rel="manifest" href="/manifest.json" />
          </Head>
          <Component {...pageProps} />
        </PokemonProvider>
      </ScreenProvider>
    </ApolloProvider>)
}
export default PokeCatchApp
