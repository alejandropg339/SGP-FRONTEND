import { NavLink } from 'react-router-dom';
import { Permissions } from '../../../enums/permissions.enum';
import { CommonRoutesEnum } from '../../../enums/commonRoutes.enum';
import { useSessionStore } from '../../../store/session.store';
import { useUserStore } from '../../../store/user.store';
import { Tooltip } from 'react-tooltip';
import './Sidebar.component.scss';
const SidebarItems = ({ closeMenu, openMenu, toggleMenu, className }: { closeMenu: () => void, openMenu: boolean, toggleMenu: () => void, className: string }) => {
    const sessionStore = useSessionStore();
    const { userInfo: { permisions } } = useUserStore();
    return (
            <nav className={className}>
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
                        <li data-tooltip-id="options-tooltip" data-tooltip-content="Inicio" >
                            <NavLink to="home" onClick={closeMenu}>
                                {({ isActive }) => (
                                    <>
                                        <i className={`sgp-sidebar__icon ${isActive && 'sgp-sidebar__icon--active'} bx bx-home-alt`}></i>
                                        {openMenu &&
                                            <span className={`sgp-sidebar__nav-text ${isActive && 'sgp-sidebar__nav-text--active'}`}>
                                                Inicio
                                            </span>
                                        }
                                    </>
                                )}

                            </NavLink>

                        </li>

                        {permisions?.USUARIOS !== Permissions.Restricted &&

                            <li data-tooltip-id="options-tooltip" data-tooltip-content="Usuarios" >
                                <NavLink to="users" onClick={closeMenu}>
                                    {({ isActive }) => (
                                        <>
                                            <i className={`sgp-sidebar__icon ${isActive && 'sgp-sidebar__icon--active'} bx bx-face`}></i>
                                            {openMenu &&
                                                <span className={`sgp-sidebar__nav-text ${isActive && 'sgp-sidebar__nav-text--active'}`}>
                                                    Usuarios
                                                </span>
                                            }
                                        </>
                                    )}

                                </NavLink>

                            </li>

                        }

                        {permisions?.PROGRAMAS !== Permissions.Restricted &&

                            <li data-tooltip-id="options-tooltip" data-tooltip-content="Programas">
                                <NavLink to="programs" onClick={closeMenu}>
                                    {({ isActive }) => (
                                        <>
                                            <i className={`sgp-sidebar__icon ${isActive && 'sgp-sidebar__icon--active'} bx bx-tv`}></i>
                                            {openMenu &&
                                                <span className={`sgp-sidebar__nav-text ${isActive && 'sgp-sidebar__nav-text--active'}`}>
                                                    Programas
                                                </span>
                                            }
                                        </>
                                    )}

                                </NavLink>

                            </li>
                        }


                        {permisions?.FACULTADES !== Permissions.Restricted &&
                            <li data-tooltip-id="options-tooltip" data-tooltip-content="Facultades">
                                <NavLink to="faculty" onClick={closeMenu}>
                                    {({ isActive }) => (
                                        <>
                                            <i className={`sgp-sidebar__icon ${isActive && 'sgp-sidebar__icon--active'} bx bx-clipboard`}></i>
                                            {openMenu &&
                                                <span className={`sgp-sidebar__nav-text ${isActive && 'sgp-sidebar__nav-text--active'}`}>
                                                    Facultades
                                                </span>
                                            }
                                        </>
                                    )}

                                </NavLink>

                            </li>
                        }

                        {permisions?.EVENTOS !== Permissions.Restricted &&

                            <li data-tooltip-id="options-tooltip" data-tooltip-content="Eventos">
                                <NavLink to="events" onClick={closeMenu}>
                                    {({ isActive }) => (
                                        <>
                                            <i className={`sgp-sidebar__icon ${isActive && 'sgp-sidebar__icon--active'} bx bx-calendar`}></i>
                                            {openMenu &&
                                                <span className={`sgp-sidebar__nav-text ${isActive && 'sgp-sidebar__nav-text--active'}`}>
                                                    Eventos
                                                </span>
                                            }
                                        </>
                                    )}

                                </NavLink>

                            </li>
                        }

                        {permisions?.PROYECTOS !== Permissions.Restricted &&

                            <li role='button'>
                                <>
                                    {openMenu &&
                                        <>
                                            <i className={`sgp-sidebar__icon bx bx-book-reader sgp-text-gray-10`}></i>
                                            <span className={`sgp-sidebar__nav-text sgp-text-gray-10`}>
                                                Proyectos <span><i className='bx bx-chevron-down ms-5'></i></span>
                                            </span>
                                        </>
                                    }
                                </>
                                <ul>
                                    <li className={`${openMenu && 'ps-1'}`} data-tooltip-id="options-tooltip" data-tooltip-content="Nuevo Proyecto">
                                        <NavLink to="projects/create" onClick={closeMenu}>
                                            {({ isActive }) => (
                                                <>
                                                    <i className={`sgp-sidebar__icon ${isActive && 'sgp-sidebar__icon--active'} bx bx-book-add`}></i>
                                                    {openMenu &&
                                                        <span className={`sgp-sidebar__nav-text ${isActive && 'sgp-sidebar__nav-text--active'}`}>
                                                            Nuevo Proyecto
                                                        </span>
                                                    }
                                                </>
                                            )}

                                        </NavLink>
                                    </li>
                                    <li className={`${openMenu && 'ps-1'}`} data-tooltip-id="options-tooltip" data-tooltip-content="Proyectos">
                                        <NavLink to="projects/search" onClick={closeMenu}>
                                            {({ isActive }) => (
                                                <>
                                                    <i className={`sgp-sidebar__icon ${isActive && 'sgp-sidebar__icon--active'} bx bx-file-find`}></i>
                                                    {openMenu &&
                                                        <span className={`sgp-sidebar__nav-text ${isActive && 'sgp-sidebar__nav-text--active'}`}>
                                                            Proyectos
                                                        </span>
                                                    }
                                                </>
                                            )}

                                        </NavLink>
                                    </li>
                                </ul>
                            </li>
                        }

                        {permisions?.SEMILLEROS !== Permissions.Restricted &&

                            <li role='button'>
                                <>
                                    {openMenu &&
                                        <>
                                            <i className={`sgp-sidebar__icon bx bxs-coffee-bean sgp-text-gray-10`}></i>
                                            {openMenu &&
                                                <span className={`sgp-sidebar__nav-text sgp-text-gray-10`}>
                                                    Semilleros <span><i className='bx bx-chevron-down ms-5'></i></span>
                                                </span>
                                            }
                                        </>
                                    }
                                </>
                                <ul>
                                    <li className={`${openMenu && 'ps-1'}`} data-tooltip-id="options-tooltip" data-tooltip-content="Nuevo Semillero">
                                        <NavLink to="hotbed/create" onClick={closeMenu}>
                                            {({ isActive }) => (
                                                <>
                                                    <i className={`sgp-sidebar__icon ${isActive && 'sgp-sidebar__icon--active'} bx bx-sun`}></i>
                                                    {openMenu &&
                                                        <span className={`sgp-sidebar__nav-text ${isActive && 'sgp-sidebar__nav-text--active'}`}>
                                                            Nuevo Semillero
                                                        </span>
                                                    }
                                                </>
                                            )}

                                        </NavLink>
                                    </li>
                                    <li className={`${openMenu && 'ps-1'}`} data-tooltip-id="options-tooltip" data-tooltip-content="Semilleros">
                                        <NavLink to="hotbed/search" onClick={closeMenu}>
                                            {({ isActive }) => (
                                                <>
                                                    <i className={`sgp-sidebar__icon ${isActive && 'sgp-sidebar__icon--active'} bx bx-leaf`}></i>
                                                    {openMenu &&
                                                        <span className={`sgp-sidebar__nav-text ${isActive && 'sgp-sidebar__nav-text--active'}`}>
                                                            Semilleros
                                                        </span>
                                                    }
                                                </>
                                            )}

                                        </NavLink>
                                    </li>
                                </ul>
                                <ul>
                                    <li className={`${openMenu && 'ps-1'}`} data-tooltip-id="options-tooltip" data-tooltip-content="Reportes">
                                        <NavLink to="reports" onClick={closeMenu}>
                                            {({ isActive }) => (
                                                <>
                                                    <i className={`sgp-sidebar__icon ${isActive && 'sgp-sidebar__icon--active'} bx bx-file`}></i>
                                                    {openMenu &&
                                                        <span className={`sgp-sidebar__nav-text ${isActive && 'sgp-sidebar__nav-text--active'}`}>
                                                            Reportes
                                                        </span>
                                                    }
                                                </>
                                            )}

                                        </NavLink>
                                    </li>
                                </ul>
                                <ul>
                                    <li className={`${openMenu && 'ps-1'}`} data-tooltip-id="options-tooltip" data-tooltip-content="Firma">
                                        <NavLink to="sign" onClick={closeMenu}>
                                            {({ isActive }) => (
                                                <>
                                                    <i className={`sgp-sidebar__icon ${isActive && 'sgp-sidebar__icon--active'} bx bx-pen`}></i>
                                                    {openMenu &&
                                                        <span className={`sgp-sidebar__nav-text ${isActive && 'sgp-sidebar__nav-text--active'}`}>
                                                            Firma
                                                        </span>
                                                    }
                                                </>
                                            )}

                                        </NavLink>
                                    </li>
                                </ul>
                            </li>
                        }

                    </ul>

                    <ul className="sgp-logout">
                        {permisions?.ROLES !== Permissions.Restricted &&
                            <li data-tooltip-id="options-tooltip" data-tooltip-content="Roles">
                                <NavLink to={CommonRoutesEnum.Roles} onClick={closeMenu}>
                                    {({ isActive }) => (
                                        <>
                                            <i className={`sgp-sidebar__icon ${isActive && 'sgp-sidebar__icon--active'} bx bx-cog`}></i>
                                            {openMenu &&
                                                <span className={`sgp-sidebar__nav-text ${isActive && 'sgp-sidebar__nav-text--active'}`}>
                                                    Roles
                                                </span>
                                            }
                                        </>
                                    )}
                                </NavLink>
                            </li>
                        }
                        <li data-tooltip-id="options-tooltip" data-tooltip-content="Mi cuenta">
                            <NavLink to="my-account" onClick={closeMenu}>
                                {({ isActive }) => (
                                    <>
                                        <i className={`sgp-sidebar__icon ${isActive && 'sgp-sidebar__icon--active'} bx bx-user`}></i>
                                        {openMenu &&
                                            <span className={`sgp-sidebar__nav-text ${isActive && 'sgp-sidebar__nav-text--active'}`}>
                                                Mi cuenta
                                            </span>
                                        }
                                    </>
                                )}
                            </NavLink>

                        </li>
                        <li data-tooltip-id="options-tooltip" data-tooltip-content="Cerrar sesión">
                            <NavLink to={CommonRoutesEnum.Login} onClick={() => sessionStore.logout()}>
                                <i className='sgp-sidebar__icon bx bx-log-out'></i>
                                {openMenu &&
                                    <span className="sgp-sidebar__nav-text">
                                        Cerrar sesión
                                    </span>
                                }
                            </NavLink>
                        </li>
                    </ul>
                </div>
                {!openMenu && <Tooltip id="options-tooltip" place="right" />}
            </nav>
    )
}

export default SidebarItems;