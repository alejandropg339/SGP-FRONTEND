import { SearchBar } from "../../../commons/components/searchBar/SearchBar.component";
import UserAccordion from "../components/UserAccordion.component";
import { useSearchUser } from "../hooks/useSearchUser";

const Users = () => {
    const { results, setQuery } = useSearchUser();

    return (
        <div className="container mt-4">
            <div className="row mb-5">
                <div className="col">
                    <SearchBar label="Buscar usuario" onInputChange={(e: any) => setQuery(e.target.value)} />
                </div>
            </div>
            <div className="row">
                <div className="col accordion">
                    {results?.map((user, index) => (
                        <UserAccordion user={user} key={user.cedula ?? index} index={index} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Users;