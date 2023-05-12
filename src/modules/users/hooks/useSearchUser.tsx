import { useEffect, useState } from 'react';
import { RepositoryApiAuth } from '../../../repositories/repositoryFactory';
import { UserResponseDataInterface } from '../../../commons/interfaces/user.interface';
import { useQuery } from '@tanstack/react-query';
import { useErrorManagement } from '../../../commons/hooks/UseErrorMagament';

const getUsers = async () => {
    return await RepositoryApiAuth.users.getUsers();
}

export const useSearchUser = () => {

    const [querySearch, setQuery] = useState('');
    const [results, setResults] = useState<UserResponseDataInterface[]>([]);
    const [initialResults, setInitialResults] = useState<UserResponseDataInterface[]>([]);
    const errorManagement = useErrorManagement();

    useQuery({
        queryKey: ['users'],
        queryFn: getUsers,
        onSuccess: async (res) => {
            console.log(res)
            setResults(res?.data ?? []);
            setInitialResults(res?.data ?? []);
        },
        onError: async (error) => {
            console.error(error)
            errorManagement(error);
        },
        cacheTime: 1000 * 60
    });

    useEffect(() => {
        if (querySearch.length > 0) {
            const filteredUsers = results?.filter(user => user.nombres.toLowerCase().includes(querySearch.toLowerCase()) || user.nombres.toLowerCase().includes(querySearch.toLowerCase()) || String(user.cod_universitario).includes(querySearch));
            if (filteredUsers.length > 0) {
                setResults(filteredUsers ?? initialResults);
            }
        } else {
            setResults(initialResults);
        }
    }, [querySearch]);

    return {
        results,
        setQuery
    }
}