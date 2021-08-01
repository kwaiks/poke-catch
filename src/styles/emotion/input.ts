import { css } from "@emotion/css";
import { MAIN_COLOR } from "config/constant";

export const inputStyle = css`
    padding: 8px;
    width: 100%;
    font-size: 14px;
    outline: none;
    border-radius: 4px;
    border: 1px solid #cacaca;
    &:focus {
        border-color: ${MAIN_COLOR};
    }
`;