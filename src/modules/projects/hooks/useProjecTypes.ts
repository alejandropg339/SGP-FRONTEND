import { useQuery } from '@tanstack/react-query';
import { RepositoryFactory } from '../../../repositories/repositoryFactory';
import { useEffect, useState } from 'react';
import { ProjectTypesDataInterface } from '../interfaces/projectTypes.interface';
import { handleModal } from '../../../commons/helpers/modalManagement';
import { useNavigate } from 'react-router-dom';
import { CommonRoutesEnum } from '../../../enums/commonRoutes.enum';
import { useErrorManagement } from '../../../commons/hooks/useErrorManagement';
import { useGlobal } from '../../../store/global.store';

const getProjects = async () => await RepositoryFactory.RepositoryApiAuth.projects.getProjectTypes();
export const useProjectTypes = () => {
    const [projectTypes, setProjectTypes] = useState<ProjectTypesDataInterface[]>([]);
    const { setLoading } = useGlobal();
    const errorManagement = useErrorManagement();
    const navigate = useNavigate();

    const { isLoading } = useQuery({
        queryKey: ['projectTypes'],
        queryFn: getProjects,
        onSuccess: (data) => setProjectTypes(data.data),
        onError: (error: any) => {
            if (error.code.status === '0') {
                handleModal('error', 'Oops!', 'Algo salió mal, por favor intenta de nuevo más tarde', true, false, false);
                navigate(CommonRoutesEnum.Home);
            } else {
                errorManagement(error);
            }
        },
    });

    useEffect(() => {
        setLoading(isLoading)
    }, [isLoading]);

    return {
        projectTypes
    }
};
