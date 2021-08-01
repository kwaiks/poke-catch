import { useQuery } from "@apollo/client";
import { css } from "@emotion/css";
import { useScreenType } from "context/screenContext";
import { GET_ABILITY_DETAIL } from "gql/queries/pokemon";
import { marginBottom10Class } from "styles/emotion/content";
import { subTitleClass } from "styles/emotion/detail";
import { capitalBoldClass, textLGClass, textSMLightClass } from "styles/emotion/text";
import { EffectEntry, PokemonAbilities } from "types/pokemon";
import { convertSnakeCase } from "utils/stringConvert";


function AbilityItemWraper({name}:{name: string}) {
    const {data, loading} = useQuery(GET_ABILITY_DETAIL,{
        variables: {
            name
        }
    })

    const parseEffect = (effects: EffectEntry[]): string => {
        if(!effects || effects.length === 0) return "";

        const en = effects.find((ef) => ef.language.name === "en");
        return en.effect
    }

    return (
        <div className={marginBottom10Class}>
            <span className={capitalBoldClass}>{data && convertSnakeCase(data.ability.response.name)}</span>
            <div>
                <span className={textSMLightClass}>
                    {data && parseEffect(data.ability.response.effect_entries)}
                </span>
            </div>
        </div>
    )
}

export default function PokemonAbilityWrapper({abilities}:{abilities: PokemonAbilities[]}) {
    const {type} = useScreenType();
    
    return (
        <div >
            <div className={marginBottom10Class}>
                <span className={textLGClass}>Abilities</span>
            </div>
            <div
                className={type==="desktop"? css`${subTitleClass}; display: grid; grid-template-columns: 1fr 1fr; gap: 10px`: ""}
            >
                {abilities.map((item) => {
                    return <AbilityItemWraper key={item.ability.name} name={item.ability.name} />
                })}
            </div>
        </div>
    )
}