import { Link } from 'react-router-dom';
import './Sidebar.component.scss';
import { useState } from 'react';
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
            <nav className={`sgp-sidebar ${openMenu && 'sgp-sidebar--expanded'}`}>
                <div className={`d-flex w-100 sgp-text-white mt-2 ${openMenu ? 'justify-content-end' : 'justify-content-center'}`}>
                    {
                        openMenu ?
                        <i className='sgp-sidebar__icon bx bx-x'  role='button' onClick={toggleMenu}></i>
                        :
                        <i className='sgp-sidebar__icon bx bx-menu' role='button' onClick={toggleMenu}></i>
                    }
                </div>
                <ul>
                    <li>
                        <Link to="login" onClick={closeMenu}>
                            <i className='sgp-sidebar__icon bx bx-home'></i>
                            <span className="sgp-sidebar__nav-text">
                                login
                            </span>
                        </Link>

                    </li>
                    <li>
                        <Link to="enrollment" onClick={closeMenu}>
                            <i className='sgp-sidebar__icon bx bx-home'></i>
                            <span className="sgp-sidebar__nav-text">
                                Enrollment
                            </span>
                        </Link>

                    </li>
                    <li>
                        <Link to="my-account" onClick={closeMenu}>
                            <i className='sgp-sidebar__icon bx bx-home'></i>
                            <span className="sgp-sidebar__nav-text">
                                My Account
                            </span>
                        </Link>

                    </li>
                    <li>
                        <Link to="users" onClick={closeMenu}>
                            <i className='sgp-sidebar__icon bx bx-home'></i>
                            <span className="sgp-sidebar__nav-text">
                                Usuarios
                            </span>
                        </Link>

                    </li>
                    
                </ul>

                <ul className="sgp-logout">
                    <li>
                        <a href="#">
                        <i className='sgp-sidebar__icon bx bx-log-out'></i>
                            <span className="sgp-sidebar__nav-text">
                                Logout
                            </span>
                        </a>
                    </li>
                </ul>
            </nav>
        </>
    )
}
