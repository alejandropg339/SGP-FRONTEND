import { NavLink } from 'react-router-dom';
import './Sidebar.component.scss';
import { useState } from 'react';
import { CommonRoutesEnum } from '../../../enums/commonRoutes.enum';
import { useSessionStore } from '../../../store/session.store';
export const Sidebar = () => {
    const [openMenu, setOpenMenu] = useState(false)
    const sessionStore = useSessionStore();
    const toggleMenu = () => {
        setOpenMenu(!openMenu)
    }

    const closeMenu = () => {
        openMenu && setOpenMenu(!openMenu)
    }

    return (
        <>
            <nav className={`sgp-sidebar ${openMenu && 'sgp-sidebar--expanded'}`}>
                <div className={`d-flex w-100 sgp-text-white mt-2 ${openMenu ? 'justify-content-end' : 'justify-content-center'}`}>
                    {
                        openMenu ?
                            <i className='sgp-sidebar__icon bx bx-x' role='button' onClick={toggleMenu}></i>
                            :
                            <i className='sgp-sidebar__icon bx bx-menu' role='button' onClick={toggleMenu}></i>
                    }
                </div>
                <ul>
                    <li>
                        <NavLink to="my-account" onClick={closeMenu}>
                            {({ isActive }) => (
                                <>
                                    <i className={`sgp-sidebar__icon ${isActive && 'sgp-sidebar__icon--active'} bx bx-user`}></i>
                                    <span className={`sgp-sidebar__nav-text ${isActive && 'sgp-sidebar__nav-text--active'}`}>
                                    My Account
                                    </span> 
                                </>
                            )}
                        </NavLink>

                    </li>
                    <li>
                        <NavLink to="users" onClick={closeMenu}>
                            {({ isActive }) => (
                                <>
                                    <i className={`sgp-sidebar__icon ${isActive && 'sgp-sidebar__icon--active'} bx bxs-user-detail`}></i>
                                    <span className={`sgp-sidebar__nav-text ${isActive && 'sgp-sidebar__nav-text--active'}`}>
                                        Usuarios
                                    </span> 
                                </>
                            )}

                        </NavLink>

                    </li>

                </ul>

                <ul className="sgp-logout">
                    <li>
                        <NavLink to={CommonRoutesEnum.Login} onClick={() => sessionStore.logout()}>
                            <i className='sgp-sidebar__icon bx bx-log-out'></i>
                            <span className="sgp-sidebar__nav-text">
                                Logout
                            </span>
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </>
    )
}
