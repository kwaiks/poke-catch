import { css } from "@emotion/css";

const separatorStyle=css`
    width: 100%;
    height: 8px;
    background-color: #eeeeee;
`

export default function Separator() {
    return (
        <div className={separatorStyle}/>
    )
}