import { css } from "@emotion/css";
import BottomNavigation from "components/navigation/BottomNavigation";

const contentStyle = css`
    padding: 16px;
    width: 100vw;
`;

export default function LayoutMobile({children}) {
    return (
        <div style={{height: "100%", position: "relative", maxHeight: "100%"}}>
            <div className={contentStyle}>
                {children}
            </div>
            <BottomNavigation/>
        </div>
    )
}