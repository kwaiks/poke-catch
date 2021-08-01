import { gql } from "@apollo/client";

export const GET_POKEMONS = gql`
    query GET_POKEMONS($limit: Int!, $offset: Int!){
        pokemons(limit: $limit, offset: $offset){
            count
            results {
                name
                image
                id
            }
        }
    }
`;

export const GET_POKEMON_DETAIL = gql`
    query GET_POKEMON_DETAIL($name: String!) {
        pokemon(name: $name){
            name
            height
            weight
            types {
                type {
                    name
                }
            }
            abilities {
                ability {
                    name
                }
            }
            moves {
                move {
                    name
                }
            }
        }
    }
`;

export const GET_MOVE_DETAIL = gql`
    query GET_MOVE_DETAIL($name: String!) {
        move(move: $name){
            response
        }
    }
`;

export const GET_ABILITY_DETAIL = gql`
    query GET_ABILITY_DETAIL($name: String!) {
        ability(ability: $name){
            response
        }
    }
`;