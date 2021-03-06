import { css, keyframes } from "@emotion/css";

const shimmerKeyframe = keyframes`
    0% {
        background-position: -468px 0;
    }

    100% {
        background-position: 468px 0; 
    }
`

export const shimmerStyle = css`
    background: #f6f7f8;
    background-image: linear-gradient(to right, #f6f7f8 0%, #edeef1 20%, #f6f7f8 40%, #f6f7f8 100%);
    background-repeat: no-repeat;
    background-size: 800px 104px; 
    display: inline-block;
    position: relative; 
    
    -webkit-animation-duration: 1.5s;
    -webkit-animation-fill-mode: forwards; 
    -webkit-animation-iteration-count: infinite;
    -webkit-animation-name: ${shimmerKeyframe};
    -webkit-animation-timing-function: linear;
`;