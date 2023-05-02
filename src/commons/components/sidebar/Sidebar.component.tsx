import { Link } from "react-router-dom"

export const Sidebar = () => {
    return (
        <>
            <nav className="navbar sticky-top sgp-bg-gray-soft">
                <div className="container-fluid">
                    <button className="btn sgp-bg-gray sgp-text-white ps-2" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling"><i className='bx bx-menu sgp-lb--h1' ></i></button>
                    <div className="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" tabIndex={-1} id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title" id="offcanvasScrollingLabel">Offcanvas with body scrolling</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body">
                            <p>Try scrolling the rest of the page to see this option in action.</p>
                            <ul>
                                <li><Link to="login">Login</Link></li>
                                <li><Link to="enrollment">Enrollment</Link></li>
                                <li><Link to="my-account">MyAccount</Link></li>
                                <li><Link to="users">Users</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}
