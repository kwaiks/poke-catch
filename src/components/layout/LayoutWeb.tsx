import { css } from "@emotion/css"

const desktopContentWrapper = css`
    padding: 20px 10vw;

`

export default function LayoutWeb({children}) {
    return <div 
    className={desktopContentWrapper}>
        {children}
    </div>
}