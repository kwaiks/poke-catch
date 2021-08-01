import { css } from "@emotion/css";
import BackIcon from "assets/icons/Back";
import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import { centerContentClass } from "styles/emotion/content";
import { navBarStyle } from "styles/emotion/list";

const backButtonWrapperClass = css`
    height: 30px;
    width: 30px;
    border-radius: 99px;
    ${centerContentClass};
`

export default function BackNavbar({safeHeight=200}:{safeHeight?:number}){
    const router = useRouter();
    const [overlap, setOverlap] = useState(false);

    useEffect(()=>{
        const scroll = () => {
            setOverlap(window.pageYOffset >= safeHeight)
        }
        if(window) {
            window.addEventListener("scroll", scroll);
            return () => {
                window.removeEventListener("scroll", scroll);
            }
        }
    },[])

    return (
        <nav data-testid="back-navbar" className={css`${navBarStyle}; background-color: ${overlap? "white" : "transparent"}`}>
            <div 
            data-testid="back-navbar-icon-wrapper"
            onClick={()=>router.back()}
            className={css`${backButtonWrapperClass}; background-color: ${overlap? "transparent" : "#f5f5f5"};`}>
                <BackIcon 
                />
            </div>
        </nav>
    )
}