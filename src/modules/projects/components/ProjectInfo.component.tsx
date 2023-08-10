import { ProjectsResponseData } from "../interfaces/projects.interface"

export const ProjectInfo = ({ project }: { project: Partial<ProjectsResponseData> }) => {
    return (
        <article className="payment-info mt-4">
            <div className="d-flex align-items-md-center flex-column flex-md-row flex-wrap">
                {project.tipo_proyecto &&
                    <div
                        className="plan-info__item me-5 mb-3">
                        <p className="sgp-lb sgp-lb--sm sgp-text-gray-50 mb-3">
                            Tipo de proyecto
                        </p>
                        <p className="sgp-lb sgp-lb--md sgp-text-gray-95 mb-0">
                            {project?.tipo_proyecto ?? 'N/A'}
                        </p>
                    </div>
                }
                {project.metodologia &&
                    <div className="plan-info__item me-5 mb-3">
                        <p className="sgp-lb sgp-lb--sm sgp-text-gray-50 mb-3">
                            metodología
                        </p>
                        <p className="sgp-lb sgp-lb--md sgp-text-gray-95 mb-0">
                            {project?.metodologia ?? 'N/A'}
                        </p>
                    </div>
                }

                {project.ciudad &&
                    <div className="plan-info__item me-5 mb-3">
                        <p className="sgp-lb sgp-lb--sm sgp-text-gray-50 mb-3">
                            Ciudad
                        </p>
                        <p className="sgp-lb sgp-lb--md sgp-text-gray-95 mb-0">
                            {project?.ciudad ?? 'N/A'}
                        </p>
                    </div>
                }

                {project.programa &&
                    <div className="plan-info__item me-5 mb-3">
                        <p className="sgp-lb sgp-lb--sm sgp-text-gray-50 mb-3">
                            Programa
                        </p>
                        <p className="sgp-lb sgp-lb--md sgp-text-gray-95 mb-0">
                            {project?.programa ?? 'N/A'}
                        </p>
                    </div>
                }

                {project.fecha_inicio &&
                    <div
                        className="plan-info__item me-5 mb-3">
                        <p className="sgp-lb sgp-lb--sm sgp-text-gray-50 mb-3">
                            Fecha de inicio
                        </p>
                        <p className="sgp-lb sgp-lb--md sgp-text-gray-95 mb-0">
                            {String(project?.fecha_inicio ?? '')}
                        </p>
                    </div>
                }

                {project.fecha_fin &&
                    <div
                        className="plan-info__item me-5 mb-3">
                        <p className="sgp-lb sgp-lb--sm sgp-text-gray-50 mb-3">
                            Fecha de finalización
                        </p>
                        <p className="sgp-lb sgp-lb--md sgp-text-gray-95 mb-0">
                            {String(project?.fecha_fin ?? 'N/A')}
                        </p>
                    </div>
                }
                {project.semillero &&
                    <div
                        className="plan-info__item me-5 mb-3">
                        <p className="sgp-lb sgp-lb--sm sgp-text-gray-50 mb-3">
                            Semillero
                        </p>
                        <p className="sgp-lb sgp-lb--md sgp-text-gray-95 mb-0">
                            {project?.semillero ?? 'N/A'}
                        </p>
                    </div>
                }
                {project.macro_proyecto &&
                    <div
                        className="plan-info__item me-5 mb-3">
                        <p className="sgp-lb sgp-lb--sm sgp-text-gray-50 mb-3">
                            Macro proyecto
                        </p>
                        <p className="sgp-lb sgp-lb--md sgp-text-gray-95 mb-0">
                            {project?.macro_proyecto ?? 'N/A'}
                        </p>
                    </div>
                }
            </div>
        </article>
    )
}
