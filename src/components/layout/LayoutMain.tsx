import menu from "../../config/menu";
import { useEffect, useState } from "react"
import LayoutMobile from "./LayoutMobile";
import LayoutWeb from "./LayoutWeb";
import { useScreenType } from "context/screenContext";


export default function MainLayout({children}) {
    const {type} = useScreenType()

    return (
        type === "mobile"?
        <LayoutMobile>
            {children}
        </LayoutMobile> :
        <LayoutWeb>
            {children}
        </LayoutWeb>
    )
}