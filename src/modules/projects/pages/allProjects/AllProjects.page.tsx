import { SearchBar } from "../../../../commons/components/searchBar/SearchBar.component";
import ProjectsAccordion from "../../components/ProjectsAccordion";
import { useSearchProject } from "../../hooks/useSearchProject";

const AllProjects = () => {
    const { results, setQuery } = useSearchProject();

    return (
        <div className="container mt-4">
            <div className="row mb-5">
                <div className="col">
                    <SearchBar label="Buscar un proyecto" onInputChange={(e: any) => setQuery(e.target.value)} />
                </div>
            </div>
            <div className="row">
                <div className="col accordion">
                    {results?.map((project, index) => (
                        <ProjectsAccordion project={ project } key={project.id ?? index} index={index} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AllProjects;