import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import BottomNavigation from 'components/navigation/BottomNavigation';
import DesktopNavBar from 'components/navigation/DesktopNavBar';
import LogoNavbar from 'components/navigation/LogoNavbar';
import menu from 'config/menu';
import { create } from 'react-test-renderer';
import BackNavbar from '../../../src/components/navigation/BackNavbar';

const useRouter = jest.spyOn(require('next/router'), 'useRouter')

describe(("Navigation"), () => {
    useRouter.mockImplementation(() => ({}))

    describe(("Back Navbar"), () => {
        it("should render", () => {
            render(<BackNavbar/>)
    
            expect(screen.getByTestId("back-navbar")).toBeVisible();
            expect(screen.getByTestId("back-navbar-icon-wrapper")).toBeVisible();
            expect(screen.getByTestId("back-icon")).toBeVisible();
        });

        it("should match snapshot", () => {
            const wrapper = create(<BackNavbar/>).toJSON();

            expect(wrapper).toMatchSnapshot()
        })
    })

    describe(("Bottom Navigation"), () => {

        it("should render", () => {
            render(<BottomNavigation/>)
            const nav = screen.getByTestId("bottom-nav");
            expect(nav).toBeVisible();
        });

        menu.forEach((item) => {
            it("should render nav item", () => {
                render(<BottomNavigation/>)
                expect(screen.getByTestId(`nav-item-${item.title}`)).toBeVisible();
            })
        })

        it("should match snapshot", () => {
            const wrapper = create(<BottomNavigation/>).toJSON();

            expect(wrapper).toMatchSnapshot()
        })
    })

    describe(("Desktop Navbar"), () => {

        it("should render", () => {
            render(<DesktopNavBar/>);
            expect(screen.getByTestId("desktop-nav")).toBeVisible();
            expect(screen.getByTestId("nav-logo")).toBeVisible();
        });

        it("navigation match menus count", () => {
            render(<DesktopNavBar/>)
            const nav = screen.getByTestId("desktop-nav");
            expect(nav.childElementCount).toEqual(menu.length);
        })

        menu.forEach((item) => {
            it("should render nav item", () => {
                render(<DesktopNavBar/>)
                expect(screen.getByTestId(`nav-item-${item.title}`)).toBeVisible();
            })
        })

        it("should match snapshot", () => {
            const wrapper = create(<DesktopNavBar/>).toJSON();

            expect(wrapper).toMatchSnapshot()
        })
    })

    describe("Mobile Logo Navbar", () => {
        it("should render", ()=>{
            render(<LogoNavbar/>)
            expect(screen.getByTestId("logo-navbar")).toBeVisible();
            expect(screen.getByTestId("nav-logo")).toBeVisible()
        })

        it("should match snapshot", () => {
            const wrapper = create(<LogoNavbar/>).toJSON();

            expect(wrapper).toMatchSnapshot()
        })
    })

})
