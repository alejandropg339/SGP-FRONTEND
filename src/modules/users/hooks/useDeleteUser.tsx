import { useMutation } from "@tanstack/react-query";
import { handleActionModal, handleModal } from "../../../commons/helpers/modalManagagemnt";
import { RepositoryFactory } from "../../../repositories/repositoryFactory";
import { useEffect } from "react";
import { useGlobal } from "../../../store/global.store";
import { useErrorManagement } from "../../../commons/hooks/UseErrorMagament";
import { useSearchUser } from "./useSearchUser";



const deleteUser = async (user: string) => {
    return await RepositoryFactory.RepositoryApiAuth.users.deleteUser(user);
}

export const useDeleteUser = () => {
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

    const deleteUserAction = (userId: string) => {
        handleActionModal('warning', '¿Estás seguro?', 'El usuario se eliminará de forma permanente', true, true, 'Eliminar', 'Cancelar', async () => { handleDelete.mutate(userId)})
    }

    useEffect(() => {
        setLoading(handleDelete.isLoading)
    },[handleDelete.isLoading])
    
    return {
        handleDelete,
        deleteUserAction
    }
}