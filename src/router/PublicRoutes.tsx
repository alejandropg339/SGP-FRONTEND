import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children}:{children:React.ReactNode}) => {
    
    const logged = localStorage.getItem('token');
    
    return (!logged)
        ? <>{children}</>
        : <Navigate to="/my-account" />
}

export default PublicRoute;