import { css, keyframes } from "@emotion/css"
import { useScreenType } from "context/screenContext";
import { shimmerStyle } from "styles/emotion/shimmer";
import { listItemStyle, listWrapperClass, listWrapperStyle } from "../../styles/emotion/list";

const imageStyle = css`
    height: 80px;
    width: 80px;
`;

const textStyle = css`
    height: 16px;
    width: 100%;
    margin-top: 12px;
`;

export default function ShimmerList() {
    const {type} = useScreenType();
    
    return (
        <div 
        data-testid="shimmer-list-wrapper"
        className={listWrapperClass[type]}>
                {
                    [1,2,3,4,5,6,7,8].map((i) => (
                        <div key={i}
                            data-testid="shimmer-item"
                            className={listItemStyle}
                        >
                            <div 
                            data-testid="shimmer-image"
                            className={`${shimmerStyle} ${imageStyle}`}></div>
                            <div 
                            data-testid="shimmer-title"
                            className={`${shimmerStyle} ${textStyle}`}></div>
                            <div 
                            data-testid="shimmer-subtitle"
                            className={`${shimmerStyle} ${textStyle}`}></div>
                        </div>
                    ))
                }
        </div>
    )
}