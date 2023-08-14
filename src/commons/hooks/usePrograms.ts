import { useQuery } from '@tanstack/react-query';
import { RepositoryFactory } from '../../repositories/repositoryFactory';
import { useEffect, useState } from 'react';
import { handleModal } from '../helpers/modalManagement';
import { useNavigate } from 'react-router-dom';
import { CommonRoutesEnum } from '../../enums/commonRoutes.enum';
import { useErrorManagement } from './useErrorManagement';
import { useGlobal } from '../../store/global.store';
import { ProgramsDataInterface } from '../interfaces/programs.interface';

const getPrograms = async () => await RepositoryFactory.RepositoryApiAuth.programs.getPrograms();
export const usePrograms = () => {
    const [programs, setPrograms] = useState<ProgramsDataInterface[]>([]);
    const { setLoading } = useGlobal();
    const errorManagement = useErrorManagement();
    const navigate = useNavigate();

    const { isLoading } = useQuery({
        queryKey: ['programs'],
        queryFn: getPrograms,
        onSuccess: (data) => setPrograms(data.data),
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
        programs
    }
};
