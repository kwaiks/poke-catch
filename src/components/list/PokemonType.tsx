import Image from "next/image";
import { pokemonTypes } from "config/pokemonTypes";
import { BaseResponse } from "types/pokemon";
import { css } from "@emotion/css";

const wrapperStyle = css`
    display: flex;
    align-items: center;
    margin-bottom: 4px;
`;

const pokemonTypeImageStyle = (color: string) => css`
    height: 20px;
    width: 20px;
    border-radius: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${color}
`;

const textStyle = css`
    margin-left: 6px;
    font-size: 14px;
`

export default function PokemonTypeWrapper({type}:{type: BaseResponse}) {
    
    return (
        <div className={wrapperStyle}>
            {
                pokemonTypes[type.name] && 
                <>
                <div className={pokemonTypeImageStyle(pokemonTypes[type.name].color)}>
                        <Image 
                        src={pokemonTypes[type["name"]]?.icon} height={14} width={14} alt={`${type.name}-type`}/>
                    </div>
                    <span className={textStyle}>{pokemonTypes[type.name].title}</span>
                </>
            }
        </div>
    )
}