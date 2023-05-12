import { Navigate } from 'react-router-dom';
import { useSessionStore } from '../store/session.store';
import { SessionStateEnum } from '../enums/sessionStates.enum';

const PublicRoute = ({ children }:{ children:React.ReactNode }) => {
    const sessionStore = useSessionStore();
    const logged = localStorage.getItem('token');
    const lastPath = localStorage.getItem('lastPath');

    console.log('LOGED', logged)
    console.log('SESSION STORE', sessionStore.session)
    console.log('VALIDATION', !logged && sessionStore.session === SessionStateEnum.Expired)
    
    return (!logged && sessionStore.session === SessionStateEnum.Expired)
        ? <>{children}</>
        : <Navigate to={lastPath ?? '/users'} />
}

export default PublicRoute;