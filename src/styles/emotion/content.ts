import { css } from "@emotion/css";

export const paddedContentClass = css`
    padding: 16px;
`;

export const marginTop50Class = css`
    margin-top: 50px;
`;

export const marginTopSafeArea = {
    desktop: css`margin-top: 80px`,
    mobile: marginTop50Class
}


export const contentWrapperStyle = css`
    height: calc(100vh - 180px);
    margin-bottom: 20px;
    overflow-y: scroll;
    margin-top: 10px;
`;

export const safeBottomClass = css`
    margin-bottom: 40px;
`;

export const marginBottom10Class = css`
    margin-bottom: 10px;
`

export const centerContentClass = css`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const centerContentColumnClass = css`
    ${centerContentClass};
    flex-direction: column;
`;

export const flexClass = css`
    display: flex;
`;

export const fixedBottomClass = css`
    position: fixed;
    height: 50px;
    width: 100%;
    background: white;
    bottom: 0;
    left: 0;
`;

export const flexGrowClass = css`
    flex-grow: 1;
`;

export const overlayClass = css`
    top: 0;
    left: 0;
    background-color: rgba(0,0,0,0.75);
    z-index: 50;
    color: white;
    overflow: hidden;
    position: fixed;
    height: 100%;
    width: 100%;
`;
