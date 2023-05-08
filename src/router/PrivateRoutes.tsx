import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children}:{children:React.ReactNode}): JSX.Element => {
    
    const { pathname, search } = useLocation();
    
    const lastPath = pathname + search;
    localStorage.setItem('lastPath', lastPath );

    const logged = localStorage.getItem('token');
    

    return (logged)
        ? <>{children}</>
        : <Navigate to="/login" />
}

export default PrivateRoute;