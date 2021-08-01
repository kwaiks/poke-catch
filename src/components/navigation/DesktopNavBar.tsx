import { css } from "@emotion/css";
import { navBarStyle } from "styles/emotion/list";
import Image from "next/image";
import { MAIN_COLOR } from "config/constant";
import menu from "config/menu";
import { centerContentClass } from "styles/emotion/content";
import Link from "next/link";

const mainNavBarStyle = css`
    color: white;
    background-color: ${MAIN_COLOR};
    justify-content: space-between;
    padding: 0 10vw;
`;


export default function DesktopNavBar() {
    return (
        <nav 
        data-testid="desktop-nav"
        className={css`${navBarStyle}; ${mainNavBarStyle};`}>
            <Link href="/" passHref>
                <picture>
                    <Image 
                        data-testid="nav-logo"
                        width={120}
                        objectFit="contain"
                        src="/images/pokemon_logo.webp"
                            height={40} alt="Pokemon Logo"/>
                </picture>
            </Link>
            <div className={centerContentClass}>
                {menu.map(({Icon,path,title}) => (
                    <Link
                    key={path} href={path} passHref>
                        <div 
                        data-testid={`nav-item-${title}`}
                        className={css`${centerContentClass}; width: 40px; cursor: pointer`}>
                            <Icon color="white" size={28}/>
                        </div>
                    </Link>
                ))}
            </div>
        </nav>
    )
}