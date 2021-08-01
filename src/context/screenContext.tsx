import React from "react";

const ScreenContext = React.createContext({
    type: "desktop"
});

export const ScreenProvider = ({children}) => {
    const [screenType, setScreenType] = React.useState("desktop");

    React.useEffect(()=>{
        const isMobileUserAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(window.navigator.userAgent);
        setScreenType(isMobileUserAgent ? "mobile" : "desktop");
    },[])

    const value = {type: screenType};

    return (
        <ScreenContext.Provider value={value}>
            {children}
        </ScreenContext.Provider>
    )
} 

export const useScreenType = () => {
    const context = React.useContext(ScreenContext);
    return context;
}