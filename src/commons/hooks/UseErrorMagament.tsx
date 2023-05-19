import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useSessionStore } from '../../store/session.store';
import { SessionStateEnum } from '../../enums/sessionStates.enum';
import { handleModal } from '../helpers/modalManagagemnt';

export const useErrorManagement = () => {
    const navigate = useNavigate();
    const sessionStore = useSessionStore();
    const errorManagement = (error: any) => {
        console.log('ERROR', error);

        if(error.status && error.status === '-1') {
            handleModal('error', 'Sesión expirada', 'Su sesión ha expirado, por favor vuelva a iniciar sesión.');
            sessionStore.setSession(SessionStateEnum.Expired)
            localStorage.removeItem('token');
            navigate('/login');
        }else {
            handleModal('error', 'Oh no!', 'Algo salio mal si el problema persiste contacta a soporte!');
            console.error(error);
        }

    }
    
    return errorManagement;
}