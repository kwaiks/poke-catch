import { css } from "@emotion/css"
import { SECONDARY_COLOR, MAIN_COLOR } from "config/constant"
import { navBarStyle } from "styles/emotion/list";
import Image from "next/image";

const mainNavBarStyle = css`
    color: white;
    background-color: ${MAIN_COLOR};
    justify-content: center;
`

export default function LogoNavbar({label}:{label?: string}){
    return (
        <nav 
        data-testid="logo-navbar"
        className={`${navBarStyle} ${mainNavBarStyle}`}>
            {
                label?
                <span>{label}</span> : 
                <picture>
                    <Image 
                    data-testid="nav-logo"
                    width={120}
                    objectFit="contain"
                    src="/images/pokemon_logo.webp"
                        height={40} alt="Pokemon Logo"/>
                </picture>
            }
        </nav>
    )
}