import { css } from "@emotion/css";
import { centerContentClass } from "./content";

export const headerImageClass = css`
    ${centerContentClass};
    height: 30vh;
    object-fit: cover;
    background-image: url(\'/images/pokemon-bg.webp\');
`;

export const statLabelClass = css`
    display: inline-block;
    width: 80px;
`;

export const subTitleClass = css`
    border-top: 1px solid #cacaca;
    padding-top: 10px;
`;
