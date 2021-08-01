import { usePokemon } from "context/pokemonContext";
import Image from "next/image";
import { initializeApollo } from "gql/client";
import { useQuery } from "@apollo/client";
import { GET_POKEMON_DETAIL } from "gql/queries/pokemon";
import { shimmerStyle } from "styles/emotion/shimmer";
import { css, keyframes } from "@emotion/css";
import dynamic from "next/dynamic";
import { MAIN_COLOR } from "config/constant";
import { useMemo, useState } from "react";
import { fixedBottomClass, flexClass, flexGrowClass, marginBottom10Class, marginTop50Class, paddedContentClass, safeBottomClass } from "styles/emotion/content";
import { headerImageClass, statLabelClass } from "styles/emotion/detail";
import { buttonStyle } from "styles/emotion/button";
import { fontLightClass, textLGClass, textSMClass, titleXLClass } from "styles/emotion/text";
import BackNavbar from "components/navigation/BackNavbar";
import { useScreenType } from "context/screenContext";
import MainLayout from "components/layout/LayoutMain";
import DesktopNavBar from "components/navigation/DesktopNavBar";

const PokemonTypeWrapper = dynamic(() => import("components/list/PokemonType"));
const PokemonMovesWrapper = dynamic(()=>import("components/list/MovesWrapper"));
const PokemonAbilityWrapper = dynamic(()=>import("components/list/AbilityWrapper"));
const CatchPokemon = dynamic(()=>import("components/action/CatchPokemon"));
const Separator = dynamic(()=>import("components/common/Separator"));

const textShimmerStyle = css`
    height: 16px;
    width: 40px;
`;

const textShimmerLargeStyle = css`
    height: 18px;
    width: 40px;
    width: 100%;
`;

const shakeKeyframe = keyframes`
    0% {
        margin-top: 20px;
    }
    10% {
        margin-top: 0px;
        margin-bottom: 20px;
    }
    20% {
        margin-top: 20px;
    }
    30% {
        margin-top: 0px;
        margin-bottom: 20px;
    }
    40% {
        margin-top: 20px;
    }
    50% {
        margin-top: 0px;
        margin-bottom: 20px;
    }
    70% {
        margin-top: 0px;
        margin-bottom: 0px;
    }
`;

const imageStyle = css`
    height: 150px;
    width: 150px;
    animation: ${shakeKeyframe} 2s alternate;
`;


export default function PokemonDetail({param}){
    const [showCatch, setShowCatch] = useState(false);
    const {type} = useScreenType();

    const {data, loading} = useQuery(GET_POKEMON_DETAIL, {
        variables: {
            name: param
        }
    })
    const {selectedPokemon, ownedPokemon} = usePokemon();

    const ownedPokemonNames = useMemo(() => {
        if(data){
            const owned = ownedPokemon.filter((pk) => pk.name === data.pokemon.name);
            if(owned.length < 1) {
                return "You don't have this pokemon yet"
            }
            const nicknames = owned.map((pk) => pk.nickname);
            return nicknames.join(", ");
        }
        return "0"
    },[ownedPokemon,data])
    
    return (
        <>{
        type === "mobile" ?
            <div><BackNavbar/>
                <div className={safeBottomClass}>
                    <div className={headerImageClass}>
                        {
                            selectedPokemon &&
                            <div className={imageStyle}>
                                <Image
                                src={selectedPokemon.image} height="150px" width="150px" objectFit="cover" alt={selectedPokemon.name}/>
                            </div>
                        }
                    </div>
                    <div id="content">
                        <div className={paddedContentClass}>
                            <span 
                            data-testid="poke-detail-name"
                            className={titleXLClass}>{data && data.pokemon.name}</span>
                            <div className={css`${flexClass}; margin-top: 8px;`}>
                                <div className={flexGrowClass}>
                                    <div className={textSMClass}>
                                        <div className={statLabelClass}>
                                            <span>Height</span>
                                        </div>
                                        {
                                                loading ?
                                                <div className={shimmerStyle+" "+textShimmerStyle}/> :
                                                data && 
                                                    <span data-testid="poke-detail-height">{data.pokemon.height + " m"}</span>
                                            }
                                    </div>
                                    <div 
                                    className={textSMClass}>
                                        <div className={statLabelClass}>
                                            <span>Weight</span>
                                        </div>
                                            {
                                                loading ?
                                                <div className={shimmerStyle+" "+textShimmerStyle}/> :
                                                data && 
                                                <span data-testid="poke-detail-weight">{data.pokemon.weight + " lbs"}</span>
                                            }
                                    </div>
                                </div>
                                <div className={flexGrowClass}>
                                <div className={css`${textSMClass}; ${flexClass};`}>
                                        <div className={statLabelClass}>
                                            <span>Types</span>
                                        </div>
                                        <div>
                                            {
                                                data?.pokemon.types && data.pokemon.types.map(({type}, idx) => (
                                                    <PokemonTypeWrapper key={idx} type={type} />
                                                ))
                                            }
                                        </div>  
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Separator/>
                        <div className={css`${paddedContentClass};${flexClass};`}>
                            <div className={css`display: inline-block; width: 100px;`}>
                                <span className={textLGClass}>Owned</span>
                            </div>
                            <div 
                            className={css`${flexClass}; ${flexGrowClass}; align-items: center`}>
                                {
                                    loading?
                                    <div className={css`${shimmerStyle}; ${textShimmerLargeStyle}`}/> :
                                    <span className={css`${textSMClass}; ${fontLightClass};`}>{ownedPokemonNames}</span>
                                }
                            </div>
                        </div>
                        <Separator/>
                        <div className={paddedContentClass}>
                            {data && data.pokemon.abilities &&
                                <PokemonAbilityWrapper abilities={data.pokemon.abilities}/> 
                            }
                        </div>
                        <Separator/>
                        <div className={paddedContentClass}>
                            {data && data.pokemon.moves &&
                                <PokemonMovesWrapper moves={data.pokemon.moves}/> 
                            }
                        </div>
                    </div>
                </div>
                <div className={css`${fixedBottomClass};padding: 0px 12px 8px 12px`}>
                    <button 
                    type="button"
                    onClick={()=>setShowCatch(true)}
                    className={css`${buttonStyle};background-color: ${MAIN_COLOR}`}>
                            Catch {data && data.pokemon.name}
                    </button>
                </div>
            </div> :
            <MainLayout>
                <DesktopNavBar/>
                <div 
                className={marginTop50Class}
                style={{position: "relative"}}>
                    <div style={{position: "fixed", width: 240}}>
                        <div style={{border: "1px solid black", padding: "8px 24px", borderRadius: 8}}>
                        {
                            selectedPokemon &&
                            <div className={imageStyle}
                            style={{margin: "0 auto"}}
                            >
                                <Image
                                src={selectedPokemon.image} height="150px" width="150px" objectFit="cover" alt={selectedPokemon.name}/>
                            </div>
                        }
                        <span 
                        data-testid="poke-detail-name"
                        className={titleXLClass}>{data && data.pokemon.name}</span>
                            <div className={css`${flexClass}; margin-top: 8px; flex-direction: column`}>
                                <div className={flexGrowClass}>
                                    <div className={textSMClass}>
                                        <div className={statLabelClass}>
                                            <span>Height</span>
                                        </div>
                                        {
                                                loading ?
                                                <div className={shimmerStyle+" "+textShimmerStyle}/> :
                                                data && 
                                                <span data-testid="poke-detail-height">{data.pokemon.height + " m"}</span>
                                            }
                                    </div>
                                    <div className={textSMClass}>
                                        <div className={statLabelClass}>
                                            <span>Weight</span>
                                        </div>
                                            {
                                                loading ?
                                                <div className={shimmerStyle+" "+textShimmerStyle}/> :
                                                data && 
                                                <span data-testid="poke-detail-weight">{data.pokemon.weight + " lbs"}</span>
                                            }
                                    </div>
                                </div>
                                <div className={flexGrowClass}>
                                <div className={css`${textSMClass}; ${flexClass};`}>
                                        <div className={statLabelClass}>
                                            <span>Types</span>
                                        </div>
                                        <div>
                                            {
                                                data?.pokemon.types && data.pokemon.types.map(({type}, idx) => (
                                                    <PokemonTypeWrapper key={idx} type={type} />
                                                ))
                                            }
                                        </div>  
                                    </div>
                                </div>
                                <div className={css`${textSMClass};`}>
                                        <div className={statLabelClass}>
                                            <span>Owned</span>
                                        </div>
                                        <div>
                                            {
                                                loading?
                                                <div className={css`${shimmerStyle}; ${textShimmerLargeStyle}`}/> :
                                                <span className={css`font-size: 12px; ${fontLightClass};`}>{ownedPokemonNames}</span>
                                            }
                                        </div>  
                                    </div>
                                </div>
                            </div>
                            <div style={{height: 40, marginTop: 16}}>
                                <button 
                                type="button"
                                onClick={()=>setShowCatch(true)}
                                className={css`${buttonStyle};background-color: ${MAIN_COLOR}`}>
                                        Catch {data && data.pokemon.name}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div style={{marginLeft: 280}}>
                        <div className={marginBottom10Class}>
                            {data && data.pokemon.abilities &&
                                <PokemonAbilityWrapper abilities={data.pokemon.abilities}/> 
                            }
                        </div>
                        <div >
                            {data && data.pokemon.moves &&
                                <PokemonMovesWrapper moves={data.pokemon.moves}/> 
                            }
                        </div>
                    </div>
            </MainLayout>}
            <CatchPokemon open={showCatch} setOpen={setShowCatch}/>
        </>
    );
}

export async function getServerSideProps(context){
    const apolloClient = initializeApollo();
    await apolloClient.query({
        query: GET_POKEMON_DETAIL,
        variables: {
            name: context.params.name
        }
    })

    return {
        props: {
            param: context.params.name,
            initialApolloState: apolloClient.cache.extract()
        }
    }
}