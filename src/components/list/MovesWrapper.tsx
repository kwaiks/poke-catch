import { useQuery } from "@apollo/client"
import { pokemonTypes } from "config/pokemonTypes"
import { GET_MOVE_DETAIL } from "gql/queries/pokemon"
import React, { useState } from "react"
import Image from "next/image";
import { PokemonMoves } from "types/pokemon"
import { shimmerStyle } from "styles/emotion/shimmer";
import { css } from "@emotion/css";
import { convertSnakeCase } from "utils/stringConvert";
import { centerContentClass, flexClass, marginBottom10Class } from "styles/emotion/content";
import { textLGClass } from "styles/emotion/text";
import { SECONDARY_COLOR } from "config/constant";
import { subTitleClass } from "styles/emotion/detail";
import { useScreenType } from "context/screenContext";

const imageWrapperStyle = css`
    border-radius: 8;
    height: 50px; 
    width: 50px;
`;

const textShimmerStyle = css`
    height: 16px;
    width: 200px;
`;

const statStyle = css`
    ${flexClass};
    padding-left: 10px;
    overflow: hidden;
    flex-direction: column;
    justify-content: space-between;
`;


function StatWrapper({type, value}:{type: "pwr" | "acc" | "pp", value: number}) {
    return (
        <div className={css`${flexClass}; align-items: center; width: 50px;`}>
            <div 
            className={css`
                height: 14px;
                width: 14px;
                ${centerContentClass};
                border-radius: 4px;
                background-color: ${SECONDARY_COLOR};
            `}>
                <Image src={`/icons/stat_${type}.svg`} height={10} width={10} alt={`stat-${type}`}/>
            </div>
            <span style={{fontSize: 14, marginLeft: 4, fontWeight: "lighter"}}>{value}</span>
        </div>
    )
}

const PokemonMoveItemShimmer = () => {
    return (
        <div className={flexClass}>
            <div className={shimmerStyle+" "+imageWrapperStyle}>
            </div>
            <div className={statStyle}>
                <div className={shimmerStyle+" "+textShimmerStyle}/>
                <div className={shimmerStyle+" "+textShimmerStyle}/>
            </div>
        </div>
    )
}

function PokemonMoveItem({name}:{name:string}) {
    const {data, loading} = useQuery(GET_MOVE_DETAIL, {
        variables: {
            name
        }
    })

    return (
        <div style={{marginBottom: 12}}>
            {
            loading ?
            <PokemonMoveItemShimmer/> :
                data?.move?.response && 
                    <div className={flexClass}>
                        <div 
                        className={css`
                            ${centerContentClass};
                            border-radius: 8px;
                            height: 50px;
                            width: 50px;
                            background: ${pokemonTypes[data.move.response.type.name].color}
                        `}>
                            <Image 
                                src={pokemonTypes[data.move.response.type["name"]]?.icon} height={28} width={28} alt={`${data.move.response.type.name}-type`}/>
                        </div>
                        <div 
                        className={statStyle}>
                            <span 
                            className={css`white-space: nowrap; text-transform: capitalize;`}>{convertSnakeCase(data.move.response.name)}</span>
                            <div className={flexClass}>
                                <StatWrapper type="pwr" value={data.move.response.power ?? 0}/>
                                <StatWrapper type="acc" value={data.move.response.accuracy ?? 0}/>
                                <StatWrapper type="pp" value={data.move.response.pp ?? 0}/>
                            </div>
                        </div>
                    </div>
            }
        </div>
    )
}

const PokemonMovesWrapper = React.memo(function PokemonMovesWrapper({moves}:{moves: PokemonMoves[]}) {
    const {type} = useScreenType();

    return (
        <div 
            data-testid="list-pokemon-wrapper"
        >
            <div 
            data-testid="list-pokemon-wrapper-title"
            className={marginBottom10Class}>
                <span className={textLGClass}>Moves</span>
            </div>
            <div
            data-testid="list-pokemon-wrapper-list"
                className={type==="desktop"? css`${subTitleClass}; display: grid; grid-template-columns: 1fr 1fr 1fr`: ""}
            >
                {moves.map((item,idx) => {
                    if(idx > 11) {
                        return null // Only 12 moves
                    }
                    return <PokemonMoveItem key={item.move.name} name={item.move.name} />
                })}
            </div>
        </div>
    )
})
export default PokemonMovesWrapper;