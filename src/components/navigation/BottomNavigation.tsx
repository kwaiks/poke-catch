import { css } from "@emotion/css";
import { MAIN_COLOR } from "config/constant";
import menu from "config/menu";
import Link from "next/link";
import { useRouter } from "next/router";
import { fixedBottomClass } from "styles/emotion/content";

const footerStyle = css`
    ${fixedBottomClass}
    display: flex;
`;

const footerItemStyle = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    font-size: 10px;
    padding: 6px 0;
    width: 100%;
`;

export default function BottomNavigation(){
    const router = useRouter()

    return (
        <div 
        data-testid="bottom-nav"
        className={footerStyle} id="footer">
            {
                menu.map(({Icon, title, path}:any, idx)=>
                    <Link key={path} href={path} passHref>
                        <div 
                        data-testid={`nav-item-${title}`}
                        key={idx}
                        className={footerItemStyle}>
                            <Icon color={router.pathname === path ? MAIN_COLOR : "#000"}/>
                            <span>{title}</span>
                        </div>
                    </Link>
                )}
        </div>
    )
}