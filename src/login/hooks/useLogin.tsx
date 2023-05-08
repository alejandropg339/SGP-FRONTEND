import { useMutation } from '@tanstack/react-query';
import { RepositoryApiNoAuth } from '../../repositories/repositoryFactory';
import { LoginFormInterface } from '../interfaces/LoginForm.interface';
import { useErrorManagement } from '../../commons/hooks/UseErrorMagament';
import { useUserStore } from '../../store/user.store';
import { UserInterface } from '../../commons/interfaces/user.interface';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { CommonRoutesEnum } from '../../enums/commonRoutes.enum';

const doLogin = async (body: LoginFormInterface) => {
    return await RepositoryApiNoAuth.authentication.login({ institutionalEmail: body.email!, password: body.password! })
}

export const useLogin = () => {
    const errorManagement = useErrorManagement();
    const userStore = useUserStore();
    const navigate = useNavigate();
    const mutation = useMutation({
        mutationFn: doLogin,
        onSuccess: (res) => {
            console.log(res)
            localStorage.setItem('token', res?.data?.token ?? '')

            const userData: Partial<UserInterface> = {
                numberId: res.data.cedula,
                name: res.data.nombres,
                hotbedId: res.data.semillero_id,
                institutionalEmail: res.data.correo_est,
                lastName: res.data.apellidos,
                phone: res.data.telefono,
                visibility: res.data.visibilidad,
                uCode: res.data.cod_universitario,
                programId: res.data.programa_id,
            }

            userStore.setUser(userData);
            navigate(CommonRoutesEnum.Users)
        }, onError: (error: any) => {
            if (error.status === '0' && error.msg) {
                Swal.fire({
                    icon: 'error',
                    title: 'Credenciales incorrectas',
                    text: error.msg,
                })
            } else {
                errorManagement(error)
            }
        },
    });

    return {
        mutation
    }
}
