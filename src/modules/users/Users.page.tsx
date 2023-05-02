import { useEffect, useState } from "react";
import { SearchBar } from "../../commons/components/searchBar/SearchBar.component";
import debounce from 'lodash.debounce';

const Users = () => {
    const users = [{ id: 1, name: 'Juan', lastName: 'Perez' }, { id: 2, name: 'Pedro', lastName: 'Perez' }, { id: 3, name: 'Maria', lastName: 'Perez' }, { id: 4, name: 'Jose', lastName: 'Perez' }];

    const [query, setQuery] = useState('');
    const [results, setResults] = useState(users);

    const fetchData = (query: string, cbDebounce: any) => {
        if (query.length > 0) {
            const filteredUsers = users.filter(user => user.name.toLowerCase().includes(query.toLowerCase()));
            setResults(filteredUsers);
            cbDebounce(filteredUsers);
        }else {
            setResults(users);
            cbDebounce(users)
        }
    }
    const debouncedFetchData = debounce((query: string, cbDebounce: any) => {
        fetchData(query, cbDebounce);
    }, 500);

    useEffect(() => {
        debouncedFetchData(query, (res: any) => {
            setResults(res);
        });
    }, [query]);

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col">
                    <SearchBar label="Buscar usuario" onInputChange={(e: any) => setQuery(e.target.value)} />
                </div>
                <div className="col list-group">
                    <div className="list-group">
                        {results.map((user) => (
                            <p className="list-group-item list-group-item-action active" aria-current="true" key={user.id}>
                                {user.name}
                            </p>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Users;