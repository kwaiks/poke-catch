import '@testing-library/jest-dom';
import preloadAll from 'jest-next-dynamic';
import { act, render} from "@testing-library/react";
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { GET_POKEMON_DETAIL } from 'gql/queries/pokemon';
import Home from 'pages/index';
import PokemonDetail from 'pages/pokemon/[name]';

const pokemonName = "venusaur";

const mocks : MockedResponse[] = [
    {
        request: {
            query: GET_POKEMON_DETAIL,
            variables: {
                name: pokemonName
            }
        },
        result: {
            data: {
              "pokemon": {
                "name": "venusaur",
                "height": 20,
                "weight": 1000,
                "abilities": [
                  {
                    "ability": {
                      "name": "overgrow"
                    }
                  },
                  {
                    "ability": {
                      "name": "chlorophyll"
                    }
                  }
                ],
                "moves": [
                  {
                    "move": {
                      "name": "swords-dance"
                    }
                  },
                  {
                    "move": {
                      "name": "cut"
                    }
                  },
                  {
                    "move": {
                      "name": "bind"
                    }
                  },
                  {
                    "move": {
                      "name": "vine-whip"
                    }
                  },
                  {
                    "move": {
                      "name": "headbutt"
                    }
                  },
                  {
                    "move": {
                      "name": "tackle"
                    }
                  },
                  {
                    "move": {
                      "name": "body-slam"
                    }
                  },
                  {
                    "move": {
                      "name": "take-down"
                    }
                  },
                  {
                    "move": {
                      "name": "double-edge"
                    }
                  },
                  {
                    "move": {
                      "name": "growl"
                    }
                  },
                  {
                    "move": {
                      "name": "roar"
                    }
                  },
                  {
                    "move": {
                      "name": "hyper-beam"
                    }
                  },
                ],
                "types": [
                  {
                    "type": {
                      "name": "grass"
                    }
                  },
                  {
                    "type": {
                      "name": "poison"
                    }
                  }
                ]
              }
            }
        } 
    }
]

describe("Pokemon Detail Test", () => {
    beforeAll(async () => {
      await preloadAll();
  });
    it("should render without error and match result query", async () => {
        const component = render(
            <MockedProvider mocks={mocks} addTypename={false} defaultOptions={{ watchQuery: { fetchPolicy: 'no-cache' } }}>
              <PokemonDetail param={pokemonName}/>
            </MockedProvider>,
          );

          await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 0));
          });

          const result = mocks[0].result["data"]["pokemon"];
          expect(component.getByTestId("poke-detail-name").textContent).toContain(result.name);
          expect(component.getByTestId("poke-detail-weight").textContent).toContain(result.weight.toString());
          expect(component.getByTestId("poke-detail-height").textContent).toContain(result.height.toString());
    })
})

