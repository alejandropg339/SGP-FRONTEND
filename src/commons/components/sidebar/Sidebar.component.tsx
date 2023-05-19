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
            <div className="sgp-sidebar-mobile sgp-text-white d-block d-md-none position-fixed ms-1">
                {!openMenu &&
                    <div className="sgp-sidebar-mobile__container-icon ms-3 mt-2">
                        <i className='sgp-sidebar__icon bx bx-menu' role='button' onClick={toggleMenu}></i>
                    </div>
                }
                {openMenu &&
                    <nav className={`sgp-sidebar sgp-sidebar--expanded h-100 position-fixed`}>
                        <div className={`d-flex w-100 sgp-text-white mt-2 ${openMenu ? 'justify-content-end' : 'justify-content-center'}`}>
                            <i className='sgp-sidebar__icon bx bx-x' role='button' onClick={toggleMenu}></i>
                        </div>
                        <div>
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
                        </div>
                    </nav>
                }
            </div>

            <nav className={`sgp-sidebar ${openMenu && 'sgp-sidebar--expanded'} d-none d-md-block h-100 position-fixed`}>
                <div className={`d-flex w-100 sgp-text-white mt-2 ${openMenu ? 'justify-content-end' : 'justify-content-center'}`}>
                    {
                        openMenu ?
                            <i className='sgp-sidebar__icon bx bx-x' role='button' onClick={toggleMenu}></i>
                            :
                            <i className='sgp-sidebar__icon bx bx-menu' role='button' onClick={toggleMenu}></i>
                    }
                </div>
                <div>
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

                        <li role='button'>
                            <>
                                {openMenu &&
                                <>
                                    <i className={`sgp-sidebar__icon bx bx-book-reader sgp-text-gray-10`}></i>
                                    <span className={`sgp-sidebar__nav-text sgp-text-gray-10`}>
                                        Proyectos <span><i className='bx bx-chevron-down'></i></span>
                                    </span>
                                </> 
                                }
                            </>
                            <ul>
                                <li className={`${openMenu && 'ps-1'}`}>
                                    <NavLink to="projects/create" onClick={closeMenu}>
                                        {({ isActive }) => (
                                            <>
                                                <i className={`sgp-sidebar__icon ${isActive && 'sgp-sidebar__icon--active'} bx bx-book-add`}></i>
                                                <span className={`sgp-sidebar__nav-text ${isActive && 'sgp-sidebar__nav-text--active'}`}>
                                                    Nuevo Proyecto
                                                </span>
                                            </>
                                        )}

                                    </NavLink>
                                </li>
                                <li className={`${openMenu && 'ps-1'}`}>
                                    <NavLink to="projects/search" onClick={closeMenu}>
                                        {({ isActive }) => (
                                            <>
                                                <i className={`sgp-sidebar__icon ${isActive && 'sgp-sidebar__icon--active'} bx bx-file-find`}></i>
                                                <span className={`sgp-sidebar__nav-text ${isActive && 'sgp-sidebar__nav-text--active'}`}>
                                                    Proyectos
                                                </span>
                                            </>
                                        )}

                                    </NavLink>
                                </li>
                            </ul>
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
                </div>
            </nav>
        </>
    )
}
