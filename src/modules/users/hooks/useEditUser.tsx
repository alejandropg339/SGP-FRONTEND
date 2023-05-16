import { useNavigate } from "react-router-dom";
import { UserResponseDataInterface } from "../../../commons/interfaces/user.interface";
import { useUserStore } from "../../../store/user.store";
import { CommonRoutesEnum } from "../../../enums/commonRoutes.enum";
import { RepositoryFactory } from "../../../repositories/repositoryFactory";
import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useErrorManagement } from "../../../commons/hooks/UseErrorMagament";
import { useEffect } from "react";
import { useGlobal } from "../../../store/global.store";
import { handleModal } from "../../../commons/helpers/modalManagagemnt";

const editUserService = async (user: Partial<UserResponseDataInterface>) =>{
    return await RepositoryFactory.RepositoryApiAuth.users.updateUser(user);
}

export const useEditUser = () => {
    const userStore = useUserStore();
    const navigate = useNavigate();
    const { setLoading } = useGlobal()
    const errorManagement = useErrorManagement();

    const handleEditUser = useMutation({
        mutationFn: editUserService,
        onSuccess: () => {

            handleModal('success', 'Proceso exitoso!', 'El usuario se ha actualizado correctamente');

            navigate(CommonRoutesEnum.Users)
        }, onError: (error: any) => {
            if (error.status === '0' && error.msg) {
                handleModal('error', 'Oh no!', error.msg);
            } else {
                errorManagement(error)
            }
        },
    });

    const keepEditUser = (user: Partial<UserResponseDataInterface>) => {
        userStore.setUserToEdit(user);
        console.log(userStore.userToEditInfo)
        navigate(CommonRoutesEnum.EditUser);
    }

    useEffect(() => {
        setLoading(handleEditUser.isLoading)
    },[handleEditUser.isLoading])

    return {
        keepEditUser,
        handleEditUser
    };
}