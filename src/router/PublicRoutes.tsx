import { Navigate } from 'react-router-dom';
import { useSessionStore } from '../store/session.store';
import { SessionStateEnum } from '../enums/sessionStates.enum';

const PublicRoute = ({ children }:{ children:React.ReactNode }) => {
    const sessionStore = useSessionStore();
    const logged = localStorage.getItem('token');
    const lastPath = localStorage.getItem('lastPath');
    
    return (!logged && sessionStore.session === SessionStateEnum.Expired)
        ? <>{children}</>
        : <Navigate to={lastPath ?? '/my-account'} />
}

export default PublicRoute;