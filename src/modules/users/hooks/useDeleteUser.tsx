import { useMutation } from "@tanstack/react-query";
import { handleActionModal, handleModal } from "../../../commons/helpers/modalManagement";
import { RepositoryFactory } from "../../../repositories/repositoryFactory";
import { useEffect } from "react";
import { useGlobal } from "../../../store/global.store";
import { useErrorManagement } from "../../../commons/hooks/UseErrorManagement";
import { useSearchUser } from "./useSearchUser";



const deleteUser = async (user: string) => {
    return await RepositoryFactory.RepositoryApiAuth.users.deleteUser(user);
}
const activateUser = async (user: string) => {
    return await RepositoryFactory.RepositoryApiAuth.users.activateUser(user);
}

export const useToggleVisibilityUser = () => {
    const { setLoading } = useGlobal();
    const errorManagement = useErrorManagement();
    const { refetch: refetchUsers } = useSearchUser();


    const handleDelete = useMutation({
        mutationFn: deleteUser,
        onSuccess: () => {
            handleModal('success', 'Usuario eliminado', 'El usuario se eliminó correctamente', true, false)
            refetchUsers();
        }, onError: (error: any) => {
            if (error?.status === '0' && error?.msg) {
                handleModal('error', 'Oh no!', error.msg);
            } else {
                errorManagement(error)
            }
        }
    })
    const handleActivate = useMutation({
        mutationFn: activateUser,
        onSuccess: () => {
            handleModal('success', 'Usuario Activado', 'El usuario se activo correctamente', true, false)
            refetchUsers();
        }, onError: (error: any) => {
            if (error?.status === '0' && error?.msg) {
                handleModal('error', 'Oh no!', error.msg);
            } else {
                errorManagement(error)
            }
        }
    })

    const deleteUserAction = (userId: string) => {
        handleActionModal('warning', '¿Estás seguro?', 'El usuario se eliminará de forma permanente', true, true, 'Eliminar', 'Cancelar', async () => { handleDelete.mutate(userId)})
    }

    const activateUserDispatcher = (userId: string) => {
        handleActionModal('warning', '¿Estás seguro?', 'El una vez aceptado el usario quedará activo nuevamente.', true, true, 'Activar', 'Cancelar', async () => { handleActivate.mutate(userId)})
    }

    useEffect(() => {
        setLoading(handleActivate.isLoading)
        setLoading(handleDelete.isLoading)
    },[handleDelete.isLoading, handleActivate.isLoading])
    
    return {
        handleDelete,
        deleteUserAction,
        activateUserDispatcher
    }
}