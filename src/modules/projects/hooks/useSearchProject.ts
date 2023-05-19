import { useQuery } from "@tanstack/react-query";
import { RepositoryFactory } from "../../../repositories/repositoryFactory";
import { useEffect, useState } from "react";
import { useGlobal } from "../../../store/global.store";
import { useErrorManagement } from "../../../commons/hooks/UseErrorMagament";
import { ProjectsResponseData } from "../interfaces/projects.interface";

const getUsers = async () => {
    return await RepositoryFactory.RepositoryApiAuth.projects.getProjects();
}

export const useSearchUser = () => {

    const [querySearch, setQuery] = useState('');
    const [results, setResults] = useState<ProjectsResponseData[]>([]);
    const [initialResults, setInitialResults] = useState<ProjectsResponseData[]>([]);
    const errorManagement = useErrorManagement();
    const { setLoading } = useGlobal();

    const { isLoading, refetch } =  useQuery({
        queryKey: ['projects'],
        queryFn: getUsers,
        onSuccess: async (res) => {
            setResults(res?.data ?? []);
            setInitialResults(res?.data ?? []);
        },
        onError: async (error) => {
            console.error(error)
            errorManagement(error);
        },
        cacheTime: 10000 * 60
    });

    useEffect(() => {
        if (querySearch.length > 0) {
            const filteredUsers = results?.filter(user => user.titulo.toLowerCase().includes(querySearch.toLowerCase()));
            if (filteredUsers.length > 0) {
                setResults(filteredUsers ?? initialResults);
            }
        } else {
            setResults(initialResults);
        }
    }, [querySearch]);

    useEffect(() => {
        setLoading(isLoading)
    },[isLoading])

    return {
        results,
        setQuery,
        refetch
    }
}