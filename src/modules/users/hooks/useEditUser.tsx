import { useNavigate, useParams } from "react-router-dom";
import { UserResponseDataInterface } from "../../../commons/interfaces/user.interface";
import { useUserStore } from "../../../store/user.store";
import { CommonRoutesEnum } from "../../../enums/commonRoutes.enum";
import { RepositoryFactory } from "../../../repositories/repositoryFactory";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useErrorManagement } from "../../../commons/hooks/UseErrorMagament";
import { useEffect, useState } from "react";
import { useGlobal } from "../../../store/global.store";
import { handleModal } from "../../../commons/helpers/modalManagagemnt";
import { RolesDataInterface } from "../../../commons/interfaces/roles.interface";

const editUserService = async (user: Partial<UserResponseDataInterface>) =>{
    return await RepositoryFactory.RepositoryApiAuth.users.updateUser(user);
}

const getRoles = async () => {
    return await RepositoryFactory.RepositoryApiAuth.users.getRoles()
}
const getUserRoles = async (userId: string) => {
    return await RepositoryFactory.RepositoryApiAuth.users.getUserRole(userId)
}

export const useEditUser = () => {
    const userStore = useUserStore();
    const navigate = useNavigate();
    const { setLoading } = useGlobal()
    const errorManagement = useErrorManagement();
    const { userId } = useParams();
    const [roles, setRoles] = useState<RolesDataInterface[]>([])
    const [userRole, setUserRole] = useState<string>()

    const handleEditUser = useMutation({
        mutationFn: editUserService,
        onSuccess: () => {

            handleModal('success', 'Proceso exitoso!', 'El usuario se ha actualizado correctamente');

            navigate(CommonRoutesEnum.Users)
        }, onError: (error: any) => {
            if (error?.status === '0' && error?.msg) {
                handleModal('error', 'Oh no!', error.msg);
            } else {
                errorManagement(error)
            }
        },
    });

    const getRolesService = useQuery({
        queryKey: ['roles'],
        queryFn: getRoles,
        onSuccess: (data) => {
            setRoles(data?.data ?? []);
        },
        onError: (error: any) => {
            if (error?.status === '0' && error?.msg) {
                handleModal('error', 'Oh no!', error.msg);
            } else {
                errorManagement(error)
            }
        }
    })

    const getUserRole = useQuery({
        queryKey: ['userRole', userId],
        queryFn: () => userId ? getUserRoles(userId) : Promise.resolve(null),
        onSuccess: (data) => {
            setUserRole(data?.data?.rol)
            console.log(data)
        },
        onError: (error: any) => {
            if (error?.status === '0' && error?.msg) {
                handleModal('error', 'Oh no!', error.msg);
            } else {
                errorManagement(error)
            }
        }
    })

    const keepEditUser = (user: Partial<UserResponseDataInterface>) => {
        userStore.setUserToEdit(user);
        navigate(`${CommonRoutesEnum.EditUser}/${user.cedula}`);
    }

    useEffect(() => {
        setLoading(handleEditUser.isLoading)
    },[handleEditUser.isLoading])

    useEffect(() => {
        setLoading(getRolesService.isLoading)
    },[getRolesService.isLoading])

    useEffect(() => {
        setLoading(getUserRole.isLoading)
    },[getUserRole.isLoading])


    return {
        keepEditUser,
        handleEditUser,
        roles,
        userRole
    };
}