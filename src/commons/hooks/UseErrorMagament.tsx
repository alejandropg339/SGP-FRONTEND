import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export const useErrorManagement = () => {
    const navigate = useNavigate();

    const errorManagement = (error: any) => {
        
        console.log('ERROR', error);

        if(error.status && error.status === '-1') {
            Swal.fire({
                icon: 'error',
                title: 'Sesión expirada',
                text: 'Su sesión ha expirado, por favor vuelva a iniciar sesión.'
            })
            navigate('/login');
        }else {
            console.error(error);
        }

    }
    
    return errorManagement;
}