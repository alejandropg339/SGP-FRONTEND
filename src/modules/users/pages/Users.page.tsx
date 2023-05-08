import { SearchBar } from "../../../commons/components/searchBar/SearchBar.component";
import { useSearchUser } from "../hooks/useSearchUser";

const Users = () => {
    const { results, setQuery } = useSearchUser();
        
    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col">
                    <SearchBar label="Buscar usuario" onInputChange={(e: any) => setQuery(e.target.value)} />
                </div>
                <div className="col list-group">
                    <div className="list-group">
                        {results && results.map((user) => (
                            <p className="list-group-item list-group-item-action active" aria-current="true" key={user.cedula}>
                                {user.nombres}
                            </p>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Users;