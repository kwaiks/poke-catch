import { listItemStyle } from "styles/emotion/list";
import { Pokemon } from "types/pokemon";
import Image from "next/image";
import Link from "next/link";
import { usePokemon } from "context/pokemonContext";

interface Props {
    pokemon: Pokemon;
    extra: string;
    children?: React.ReactChild;
}

export default function PokemonListItem({pokemon, extra, children}:Props){
    const {setSelectedPokemon} = usePokemon();

    const viewPokemon = () => {
        setSelectedPokemon(pokemon);
    }

    return (
        <Link href={`/pokemon/${pokemon.name}`} passHref>
            <div 
            data-testid="pokemon-list-item"
            onClick={viewPokemon}
            className={listItemStyle}>
                <div>
                    <Image 
                    data-testid="pokemon-list-item-image"
                    src={pokemon.image} height="80px" width="80px" alt={pokemon.name}/>
                </div>
                <div style={{width: "100%"}}>
                    <div 
                    data-testid="pokemon-list-item-name"
                    style={{
                        textTransform: "capitalize",
                        fontWeight: "bold"}}>
                    {pokemon.name}
                    </div>
                    <div
                    data-testid="pokemon-list-item-extra"
                    >
                        {extra}
                    </div>
                    <div
                    data-testid="pokemon-list-item-children"
                    >
                        {children}
                    </div>
                </div>
            </div>
        </Link>
    )
}