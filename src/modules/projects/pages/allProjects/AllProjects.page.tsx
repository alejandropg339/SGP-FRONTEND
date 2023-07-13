import { SearchBar } from "../../../../commons/components/searchBar/SearchBar.component";
import ProjectsAccordion from "../../components/ProjectsAccordion";
import { useSearchProject } from "../../hooks/useSearchProject";

const AllProjects = () => {
    const { results, setQuery, sortResults, sortActiveProjects, sortInactiveProjects } = useSearchProject();

    return (
        <div className="container mt-4">
            <div className="row mb-5">
                <div className="col">
                    <SearchBar label="Buscar un proyecto" onInputChange={(e: any) => setQuery(e.target.value)} />
                </div>
            </div>
            <div className="d-flex w-100 mb-3">
                <button className="btn sgp-btn sgp-btn--secondary me-2" onClick={sortResults}><i className='bx bx-filter-alt'></i>A-Z</button>
                <button className="btn sgp-btn sgp-btn--secondary me-2" onClick={sortActiveProjects}><i className='bx bx-filter-alt'></i>Activos</button>
                <button className="btn sgp-btn sgp-btn--secondary me-2" onClick={sortInactiveProjects}><i className='bx bx-filter-alt'></i>Inactivos</button>
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