import { css } from "@emotion/css";
import { centerContentClass } from "./content";

export const buttonStyle = css`
    font-weight: bold;
    color: white;
    text-transform: uppercase;
    border: none;
    height: 100%;
    width: 100%;
    cursor: pointer;
    border-radius: 4px;
    ${centerContentClass};
`;

export const button40HeightClass = css`
    ${buttonStyle};
    height: 40px;
`;