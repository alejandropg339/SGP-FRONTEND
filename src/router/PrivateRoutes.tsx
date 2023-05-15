import { Navigate, useLocation } from 'react-router-dom';
import { useSessionStore } from '../store/session.store';
import { SessionStateEnum } from '../enums/sessionStates.enum';

const PrivateRoute = ({ children }:{ children:React.ReactNode }): JSX.Element => {
    
    const { pathname, search } = useLocation();
    const sessionStore = useSessionStore();
    
    const lastPath = pathname + search;
    localStorage.setItem('lastPath', lastPath );        

    return (sessionStore.session === SessionStateEnum.Active)
        ? <>{children}</>
        : <Navigate to="/login" />
}

export default PrivateRoute;