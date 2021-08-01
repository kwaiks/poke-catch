import MainLayout from "components/layout/LayoutMain";
import { ChangeEvent, MouseEvent, useCallback, useEffect, useState } from "react";
import { listWrapperClass, listWrapperStyle } from "styles/emotion/list";
import { usePokemon } from "context/pokemonContext";
import { css } from "@emotion/css";
import debounce from "lodash/debounce";
import Image from "next/image";
import { inputStyle } from "styles/emotion/input";
import { marginTop50Class } from "styles/emotion/content";
import dynamic from "next/dynamic";

import LogoNavbar from "components/navigation/LogoNavbar";
import { useScreenType } from "context/screenContext";
import DesktopNavBar from "components/navigation/DesktopNavBar";
import { buttonStyle } from "styles/emotion/button";
import { RED_COLOR } from "config/constant";
import ReleaseModal from "components/action/ReleaseModal";
import { Pokemon } from "types/pokemon";
const PokemonListItem = dynamic(()=>import("components/list/PokemonListItem"));

const contentWrapperStyle = css`
    height: calc(100vh - 180px);
    margin-bottom: 20px;
    overflow-y: scroll;
    margin-top: 10px;
`;

export default function MyPokemonView() {
    const {ownedPokemon, setOwnedPokemon} = usePokemon();
    const [pokemons, setPokemons] = useState([]);

    // release feature
    const [selectedPokemon, setSelectedPokemon] = useState<Pokemon>(null);
    const [showModal, setShowModal] = useState(false);

    const [searchQuery, setSearchQuery] = useState("");
    const {type} = useScreenType();

    useEffect(()=>{
        setPokemons(ownedPokemon);
    },[ownedPokemon]);

    const releasePokemon = () => {
        if(selectedPokemon){
            const newPokemons = ownedPokemon.filter((pk) => pk.nickname !== selectedPokemon.nickname);
            setOwnedPokemon(newPokemons); 
        }
        setShowModal(false);
    }

    const search = useCallback(debounce((q: string)=>{
        const newPokemons = ownedPokemon.filter((pk) => pk.nickname.toLowerCase().indexOf(q.toLowerCase()) > -1);
        setPokemons(newPokemons);
    },500),[ownedPokemon]);

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value)
        search(e.target.value);
    }
    
  return (
    <MainLayout>
        <div>
            {
                type === "mobile" ?
                <LogoNavbar label="My Pokemons"/> :
                <DesktopNavBar/>
            }
            <div className={marginTop50Class}>
                <input 
                    value={searchQuery}
                    className={inputStyle}
                    onChange={handleSearch}
                    placeholder="Search Nickname"
                />
            </div>
            <div 
                className={contentWrapperStyle}>
                    {
                        pokemons.length > 0 ?
                        <div className={listWrapperClass[type]}>
                            {
                                pokemons.map((item) => (
                                    <PokemonListItem
                                    extra={item.nickname}
                                    key={item.nickname}
                                    pokemon={item}>
                                        <button 
                                        onClick={(e)=>{
                                            e.stopPropagation();
                                            setSelectedPokemon(item);
                                            setShowModal(true);
                                        }}
                                        name={item.nickname}
                                        type="button"
                                        className={css`${buttonStyle}; height: 30px; background-color: ${RED_COLOR}`}
                                        >
                                            Release
                                        </button>
                                    </PokemonListItem>
                                ))
                            }
                        </div> :
                        <div style={{
                            display: "flex",
                            height: "100%", width: "100%", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
                                <Image src="/images/pokeball-opened.webp" objectFit="contain" height="200px" width="200px" alt="Pokeball Empty"/>
                                <span 
                                className={css`margin-top: 10px`}>
                                    {
                                        ownedPokemon.length > 0 ?
                                        "Pokemon not Found" :
                                        "You don't have any pokemons yet"
                                    }
                                </span>
                        </div>
                    }
            </div>
        </div>
        <ReleaseModal 
            open={showModal}
            closeModal={setShowModal}
            onRelease={releasePokemon}
            name={selectedPokemon? `${selectedPokemon.nickname} (${selectedPokemon.name})` : ""}
        />
    </MainLayout>
  )
}