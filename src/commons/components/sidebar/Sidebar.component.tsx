import { useState } from 'react';
import SidebarItems from './SidebarItems.component';
import './Sidebar.component.scss';

export const Sidebar = () => {
    const [openMenu, setOpenMenu] = useState(false)
    const toggleMenu = () => {
        setOpenMenu(!openMenu)
    }

    const closeMenu = () => {
        openMenu && setOpenMenu(!openMenu)
    }

    return (
        <>
            <div className="sgp-sidebar-mobile sgp-text-white d-block d-md-none position-fixed ms-1">
                <div className="sgp-sidebar-mobile__container-icon ms-3 mt-2">
                    {!openMenu &&
                        <i className='sgp-sidebar__icon bx bx-menu' role='button' onClick={toggleMenu}></i>
                    }
                </div>
                {openMenu &&
                    <SidebarItems closeMenu={closeMenu} openMenu={openMenu} toggleMenu={toggleMenu} className="sgp-sidebar sgp-sidebar--expanded h-100 position-fixed"/>
                }
            </div>

            <SidebarItems closeMenu={closeMenu} openMenu={openMenu} toggleMenu={toggleMenu} className={`sgp-sidebar ${openMenu && 'sgp-sidebar--expanded'} d-none d-md-block h-100 position-fixed`} />
        </>
    )
}
