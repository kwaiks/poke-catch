import { css } from "@emotion/css";

export const listWrapperStyle = css`
    padding: 10px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
`;

export const listWrapperClass = {
    desktop: css`${listWrapperStyle}; grid-template-columns: 1fr 1fr 1fr 1fr;`,
    mobile: listWrapperStyle
}

export const listItemStyle = css`
    display: flex;
    cursor: pointer;
    flex-direction: column;
    align-items: center;
    min-height: 160px;
    width: 100%;
    border-radius: 4px;
    background-color: white;
    padding: 8px;
    text-align: center;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;

export const navBarStyle = css`
    height: 50px;
    width: 100%;
    top: 0;
    left: 0;
    position: fixed;
    z-index: 10;
    padding-left: 16px;
    padding-right: 16px;
    text-align: center;
    font-weight: bold;
    display: flex;
    align-items: center;
`;