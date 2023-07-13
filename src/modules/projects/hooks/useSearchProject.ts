import { useQuery } from '@tanstack/react-query';
import { RepositoryFactory } from '../../../repositories/repositoryFactory';
import { useEffect, useState } from 'react';
import { useGlobal } from '../../../store/global.store';
import { useErrorManagement } from '../../../commons/hooks/UseErrorManagement';
import { ProjectsResponseData } from '../interfaces/projects.interface';

const getUsers = async () => {
    return await RepositoryFactory.RepositoryApiAuth.projects.getProjects();
};

export const useSearchProject = () => {
    const [querySearch, setQuery] = useState('');
    const [results, setResults] = useState<ProjectsResponseData[]>([]);
    const [initialResults, setInitialResults] = useState<ProjectsResponseData[]>([]);
    const [sortedResults, setSortedResults] = useState<ProjectsResponseData[]>([]);

    const errorManagement = useErrorManagement();
    const { setLoading } = useGlobal();

    const { isLoading, refetch } = useQuery({
        queryKey: ['projects'],
        queryFn: getUsers,
        onSuccess: async (res) => {
            if(results.length === 0){
                setResults(res?.data ?? []);
                setInitialResults(res?.data ?? []);
            }
        },
        onError: async (error) => {
            console.error(error);
            errorManagement(error);
        },
    });

    useEffect(() => {
        if(results.length === 0 || initialResults.length === 0 || sortedResults.length === 0){
            refetch()
        }
    }, [])

    useEffect(() => {
        if (querySearch.length > 0) {
            const filteredUsers = results?.filter((user) => user.titulo.toLowerCase().includes(querySearch.toLowerCase()));
            if (filteredUsers.length > 0) {
                setSortedResults(filteredUsers);
                setResults(filteredUsers);
            }
        } else {
            setSortedResults(initialResults);
            setResults(initialResults);
        }
    }, [querySearch, initialResults]);

    useEffect(() => {
        setLoading(isLoading);
    }, [isLoading]);

    

    const sortResults = () => {
        const sorted = [...sortedResults].sort((a, b) => a.titulo.localeCompare(b.titulo));
        setResults(sorted);
    };

    const sortActiveProjects = () => {
        const sorted = initialResults.filter((project) => project.visibilidad === 1);
        setResults(sorted);
    };

    const sortInactiveProjects = () => {
        const sorted = initialResults.filter((project) => project.visibilidad === 0);
        setResults(sorted);
    };

    return {
        results,
        setQuery,
        refetch,
        sortResults,
        sortActiveProjects,
        sortInactiveProjects,
    };
};
