import { css } from "@emotion/css"
import { RED_COLOR, SECONDARY_COLOR } from "config/constant"
import { buttonStyle } from "styles/emotion/button"
import { centerContentClass, overlayClass } from "styles/emotion/content"

interface Props {
    open: boolean;
    closeModal: (b: boolean) => void;
    onRelease: () => void;
    name: string;
}

export default function ReleaseModal({open, closeModal, onRelease, name}:Props) {
    return (
        <div
            className={css`${centerContentClass}; ${overlayClass}; visibility: ${open ? "visible" :"hidden"};`}>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        padding: "16px",
                        maxWidth: "80vw", width: 400, height: 140, backgroundColor: "white", color: "black"}}
                >
                    <div>
                        Are you sure want to release <b>{name}</b> ?
                    </div>
                    <div className={css`display: grid; grid-template-columns: 1fr 1fr; gap: 10px;`}>
                        <button 
                        onClick={()=>closeModal(false)}
                        type="button"
                            className={css`${buttonStyle}; color: ${SECONDARY_COLOR}; height: 30px`}
                        >Cancel</button>
                        <button 
                        onClick={onRelease}
                        className={css`${buttonStyle}; background-color: ${RED_COLOR}; height: 30px`}
                        type="button">Release</button>
                    </div>
                </div>
        </div>
    )
}