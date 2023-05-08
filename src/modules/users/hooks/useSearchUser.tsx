import { useEffect, useState } from 'react';
import { RepositoryApiAuth } from '../../../repositories/repositoryFactory';
import { UserResponseDataInterface } from '../../../commons/interfaces/user.interface';

const getUsers = async () => {
    try {
        return await RepositoryApiAuth.users.getUsers();
    } catch (error) {
        console.log(error);
    }
}

export const useSearchUser = () => {

    const [querySearch, setQuery] = useState('');
    const [results, setResults] = useState<UserResponseDataInterface[]>([]);
    const [initialResults, setInitialResults] = useState<UserResponseDataInterface[]>([]);
    
    useEffect(() => {

        if(querySearch.length > 0){
            const filteredUsers = results?.filter(user => user.nombres.toLowerCase().includes(querySearch.toLowerCase()));
            if(filteredUsers.length > 0){
                setResults(filteredUsers ?? initialResults);                
            }
        }else {
            setResults(initialResults);
        }
    }, [querySearch]);

    useEffect(() => {
        const init = async () => {
            const results = await getUsers();
            setResults(results?.data ?? []);
            setInitialResults(results?.data ?? []);
        }
        init();
    }, [])

    return {
        results,
        setQuery
    }
}