import '@testing-library/jest-dom';
import preloadAll from 'jest-next-dynamic';
import { act, render} from "@testing-library/react";
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { GET_POKEMONS } from 'gql/queries/pokemon';
import Home from 'pages/index';

const mocks : MockedResponse[] = [
    {
        request: {
            query: GET_POKEMONS,
            variables: {
                offset: 0,
                limit: 12
            }
        },
        result: {
            data: {
              "pokemons": {
                "results": [
                  {
                    "id": 1,
                    "name": "bulbasaur",
                    "image": "/logo192.png"
                  },
                  {
                    "id": 2,
                    "name": "ivysaur",
                    "image": "/logo192.png"
                  },
                  {
                    "id": 3,
                    "name": "venusaur",
                    "image": "/logo192.png"
                  },
                  {
                    "id": 4,
                    "name": "charmander",
                    "image": "/logo192.png"
                  },
                  {
                    "id": 5,
                    "name": "charmeleon",
                    "image": "/logo192.png"
                  },
                  {
                    "id": 6,
                    "name": "charizard",
                    "image": "/logo192.png"
                  },
                  {
                    "id": 7,
                    "name": "squirtle",
                    "image": "/logo192.png"
                  },
                  {
                    "id": 8,
                    "name": "wartortle",
                    "image": "/logo192.png"
                  },
                  {
                    "id": 9,
                    "name": "blastoise",
                    "image": "/logo192.png"
                  },
                  {
                    "id": 10,
                    "name": "caterpie",
                    "image": "/logo192.png"
                  },
                  {
                    "id": 11,
                    "name": "metapod",
                    "image": "/logo192.png"
                  },
                  {
                    "id": 12,
                    "name": "butterfree",
                    "image": "/logo192.png"
                  },
                ]
              },
            }          
        } 
    }
]

/// infinite scroll blocking test

describe("Home Test", () => {
    beforeAll(async () => {
        await preloadAll();
    });
    it("should render without error", async () => {
        const component = render(
            <MockedProvider mocks={mocks} addTypename={false} defaultOptions={{ watchQuery: { fetchPolicy: 'no-cache' } }}>
              <Home/>
            </MockedProvider>,
          );

          await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 0));
          });

          const bulbasaur = mocks[0].result["data"]["pokemons"]["results"][0];
          expect(component.getByText("bulbasaur").textContent).toEqual(bulbasaur.name);          
    })
})

