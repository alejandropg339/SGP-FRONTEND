import { Outlet, Link } from "react-router-dom";

const Layout = () => {
    return (
        <>
            <div className="flex-container-start">       
                    <div>
                        <Link to="/reports/facGiSemProy" state={{reportId:"22"}}>Firma</Link>
                    </div>
                    <div>
                        <Link to="/reports/facGi">Administrador</Link>
                    </div>
                    <div>
                        <Link to="/reports/facGiSem">Coordinador Investigacion</Link>
                    </div>
                    <div>
                        <Link to="/reports/facProg">Decano</Link>
                    </div>
                    <div>
                        <Link to="/reports/fac">Director GI</Link>
                    </div>
                    <div>
                        <Link to="/reports/facGiSemTime">Director Investigacion</Link>
                    </div>
                    <div>
                        <Link to="/reports/facGiTime">Director de programa</Link>
                    </div>
                    <div>
                        <Link to="/reports/firma">Docente Investigador</Link>
                    </div>            
            </div>  
            <Outlet />
        </>
    )
};

export default Layout;