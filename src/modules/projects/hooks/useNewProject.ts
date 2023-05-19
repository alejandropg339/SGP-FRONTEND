import { useMutation } from '@tanstack/react-query';
import { RepositoryFactory } from '../../../repositories/repositoryFactory';
import { CreateProjectRequest } from '../interfaces/projects.interface';
import { useEffect } from 'react';
import { handleModal } from '../../../commons/helpers/modalManagagemnt';
import { useErrorManagement } from '../../../commons/hooks/UseErrorMagament';
import { useNavigate } from 'react-router-dom';
import { useGlobal } from '../../../store/global.store';
import { CommonRoutesEnum } from '../../../enums/commonRoutes.enum';

const createProject = async (project: CreateProjectRequest) => await RepositoryFactory.RepositoryApiAuth.projects.createProject(project); 
export const useNewProject = () => {
    const errorManagement = useErrorManagement();
    const navigate = useNavigate();
    const { setLoading } = useGlobal();

    const {mutate, isLoading} = useMutation({
        mutationFn: createProject,
        onSuccess: () => {

            handleModal('success', 'Proceso exitoso!', 'El usuario se ha actualizado correctamente', true);

            navigate(CommonRoutesEnum.Users)
        }, onError: (error: any) => {
            if (error?.status === '0' && error?.msg) {
                handleModal('error', 'Oh no!', error.msg);
            } else {
                errorManagement(error)
            }
        },
    });

    useEffect(() => {
        setLoading(isLoading)
    },[isLoading])
    
    return {
        mutate
    }
}