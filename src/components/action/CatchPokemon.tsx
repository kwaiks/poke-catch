import { css } from "@emotion/css"
import CloseIcon from "assets/icons/Close"
import { MAIN_COLOR, SECONDARY_COLOR } from "config/constant"
import { usePokemon } from "context/pokemonContext"
import Link from "next/link"
import { ChangeEvent, useEffect, useState } from "react"
import { button40HeightClass } from "styles/emotion/button"
import { centerContentColumnClass, overlayClass } from "styles/emotion/content"
import { inputStyle } from "styles/emotion/input"
import { catchResultTextClass } from "styles/emotion/text"
import { width70VWClass } from "styles/emotion/width"

const FailedWrapper = () => {
    return (
    <div>
        <span 
        className={css`${catchResultTextClass}; color: #f44336`}>Failed</span>
    </div> 
    )
}

const SuccessWrapper = () => {
    const {ownedPokemon, selectedPokemon, setOwnedPokemon} = usePokemon();
    const [nickname, setNickname] = useState("");
    const [inputError, setInputError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleNickChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNickname(e.target.value);
        setInputError(null);
    }

    const savePokemon = () => {
        if(nickname === "") {
            setInputError("Nickname couldn't be empty");
            return
        }
        const exist = ownedPokemon.find((pk) => pk.nickname === nickname);
        if(exist){
            setInputError("You already have pokemon with this nickname");
            return 
        }
        const newPokemon = [...ownedPokemon, {...selectedPokemon, nickname}];
        Notification.requestPermission().then(()=>new Notification(`${nickname} (${selectedPokemon.name}) now become your companion.`))
        setOwnedPokemon(newPokemon);
        setSuccess(true);
    }

    return (
    <div className={css`${width70VWClass}; margin-top: 10px;`}>
        {
            !success ?
            <>
                <div>
                    <span className={css`${catchResultTextClass}; color: #4caf50`}>Success</span>
                </div> 
                <span>Type your Pokemon&apos;s Nickname</span>
                <div
                    className={css`margin-top: 8px;`}
                >
                    <input 
                        name="nickname"
                        value={nickname}
                        onChange={handleNickChange}
                        className={inputStyle}/>
                    <span 
                    className={css`display:inline-block; color: #f44336; font-size: 12px;`}>{inputError}</span>
                </div>
                <button type="button" 
                    onClick={savePokemon}
                    className={css`
                        ${button40HeightClass}; 
                        margin-top: 10px;
                        background-color: ${MAIN_COLOR};
                    `}>
                        PUT IN POKEBALL
                </button>
            </> :
            <Link href="/my-pokemon" passHref>
                <button 
                className={css`${button40HeightClass}; background-color: ${MAIN_COLOR};`}
                type="button">
                        MY POKEBALL
                </button>
            </Link>
        }
    </div>)
}

export default function CatchPokemon({open, setOpen}) {
    const [catchState, setCatchState] = useState("load");

    useEffect(()=>{
        if(catchState === "load" && open){
            setTimeout(()=>{
                const rng = Math.random();
                if(rng > 0.5) {
                    setCatchState("success");
                }else{
                    setCatchState("failed")
                }
            },4000)
        }
    },[catchState,open])

    const handleClose = () => {
        setCatchState("load");
        setOpen(false)
    }

    return (
        <div
            className={css`${overlayClass}; visibility: ${open ? "visible" :"hidden"}; display: ${open? "block" : "hidden"}`}>
            <div className={css`height: 100%; position: relative`}
            >
                <div 
                className={css`position: absolute; right: 12px; top: 12px`}
                onClick={handleClose}>
                    <CloseIcon color="white" size={30}/>
                </div>
                <div 
                className={css`${centerContentColumnClass}; height: 100%;`}>
                {open && 
                <div className="pokeball">
                    <div className="pokeball__button"></div>
                </div>
                }
                <div 
                className={css`${centerContentColumnClass}; ${width70VWClass}; text-align: center;`}>
                    {
                        catchState !== "load" && 
                        <>
                            {catchState === "success" ? 
                            <SuccessWrapper/> :
                            <FailedWrapper/>}
                            <button type="button" 
                            onClick={handleClose}
                            className={css`${button40HeightClass}; background-color: ${SECONDARY_COLOR}; margin-top: 10px;`}>
                                CLOSE
                            </button>
                        </>
                    }
                </div>
                </div>
            </div>

        </div>
    )
}