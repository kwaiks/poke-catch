import '@testing-library/jest-dom';
import { create } from "react-test-renderer";
import { render, screen } from '@testing-library/react';
import PokemonMovesWrapper from 'components/list/MovesWrapper';
import PokemonListItem from 'components/list/PokemonListItem';
import ShimmerList from 'components/list/ShimmerListItem';


describe(("List Test"), () => {

    describe("Moves Wrapper", () => {
        it("should render",()=> {
            render(<PokemonMovesWrapper moves={[]}/>)
            expect(screen.getByTestId("list-pokemon-wrapper")).toBeVisible()
            expect(screen.getByTestId("list-pokemon-wrapper-title")).toBeVisible()
            expect(screen.getByTestId("list-pokemon-wrapper-list")).toBeVisible()
        })

        it("should match snapshot", () => {
            const wrapper = create(<PokemonMovesWrapper moves={[]}/>).toJSON();

            expect(wrapper).toMatchSnapshot()
        })
    })

    describe("Pokemon List Item", () => {
        const pokemon = {
            name: "Bulbasaur",
            image: "/img",
        }

        const extra = "Owned"

        it("should render and match params", () => {
            render(<PokemonListItem
                pokemon={pokemon}
                extra={extra}
            />);
            expect(screen.getByTestId("pokemon-list-item")).toBeVisible();
            expect(screen.getByTestId("pokemon-list-item-image")).toBeVisible();

            const title = screen.getByTestId("pokemon-list-item-name");
            expect(title).toBeVisible();
            expect(title.textContent).toEqual(pokemon.name);
            
            const extraTest = screen.getByTestId("pokemon-list-item-extra");
            expect(extraTest).toBeVisible();
            expect(extraTest.textContent).toEqual(extra); 
        })

        it("should match snapshot", () => {
            const wrapper = create(<PokemonListItem
                pokemon={pokemon}
                extra={extra}
            />).toJSON();

            expect(wrapper).toMatchSnapshot()
        })
    })

    describe("Shimmer List Item", () => {
        it("should render", () => {
            render(<ShimmerList/>)

            const wrapper = screen.getByTestId("shimmer-list-wrapper");
            expect(wrapper).toBeVisible();
            expect(wrapper.childElementCount).toEqual(8);

            expect(screen.getAllByTestId("shimmer-item")[0]).toBeVisible();
            expect(screen.getAllByTestId("shimmer-image")[0]).toBeVisible();
            expect(screen.getAllByTestId("shimmer-title")[0]).toBeVisible()
            expect(screen.getAllByTestId("shimmer-subtitle")[0]).toBeVisible()
        })

        it("should match snapshot", () => {
            const wrapper = create(<ShimmerList/>).toJSON();

            expect(wrapper).toMatchSnapshot()
        })
    })


})