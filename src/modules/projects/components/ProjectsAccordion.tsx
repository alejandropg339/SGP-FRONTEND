import { useTranslation } from "react-i18next";
import { ProjectsAccordionProps } from "../interfaces/projectsAccordionProps.interface";

const ProjectsAccordion = (props: ProjectsAccordionProps) => {
    const { t } = useTranslation("global");

    return (
        <div className="accordion" id={String(props.project.id)}>
            <div className="accordion-item">
                <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#${String(props.index)}`} aria-expanded="false" aria-controls={String(props.index)}>
                        {props.project.titulo ?? ''} - {props.project.nota ?? 'Pendinte'}
                    </button>
                </h2>
                <div id={String(props.index)} className="accordion-collapse collapse" data-bs-parent={`#${props.project.titulo}`}>
                    <div className="accordion-body">
                        <ul className="list-group list-group-flush">
                            { props.project.id && <li className="list-group-item sgp-lb-h5"><span className="sgp-fw-600">{t("projects.id")}</span>{props.project.id ?? ''}</li> }
                            { props.project.titulo && <li className="list-group-item sgp-lb-h5"><span className="sgp-fw-600">{t("projects.title")}</span>{props.project.titulo ?? ''}</li> }
                            { props.project.estado && <li className="list-group-item sgp-lb-h5"><span className="sgp-fw-600">{t("projects.status")}</span>{props.project.estado ?? ''}</li> }
                            { props.project.descripcion && <li className="list-group-item sgp-lb-h5"><span className="sgp-fw-600">{t("projects.description")}</span>{props.project.descripcion ?? ''}</li> }
                            { props.project.macro_proyecto && <li className="list-group-item sgp-lb-h5"><span className="sgp-fw-600">{t("projects.macroProject")}</span>{props.project.macro_proyecto ?? ''}</li> }
                            { props.project.fecha_inicio && <li className="list-group-item sgp-lb-h5"><span className="sgp-fw-600">{t("projects.initialDate")}</span>{String(props.project.fecha_inicio) ?? ''}</li> }
                            { props.project.fecha_fin && <li className="list-group-item sgp-lb-h5"><span className="sgp-fw-600">{t("projects.finalDate")}</span>{String(props.project.fecha_fin) ?? ''}</li> }
                            { props.project.semillero && <li className="list-group-item sgp-lb-h5"><span className="sgp-fw-600">{t("projects.hotbed")}</span>{props.project.semillero ?? ''}</li> }
                            { props.project.retroalimentacion_final && <li className="list-group-item sgp-lb-h5"><span className="sgp-fw-600">{t("projects.feedback")}</span>{props.project.retroalimentacion_final ?? ''}</li> }
                            { props.project.ciudad && <li className="list-group-item sgp-lb-h5"><span className="sgp-fw-600">{t("projects.city")}</span>{props.project.ciudad ?? ''}</li> }
                            { props.project.metodologia && <li className="list-group-item sgp-lb-h5"><span className="sgp-fw-600">{t("projects.methodology")}</span>{props.project.metodologia ?? ''}</li> }
                            { props.project.conclusiones && <li className="list-group-item sgp-lb-h5"><span className="sgp-fw-600">{t("projects.conclusions")}</span>{props.project.conclusiones ?? ''}</li> }
                            { props.project.justificacion && <li className="list-group-item sgp-lb-h5"><span className="sgp-fw-600">{t("projects.justifications")}</span>{props.project.justificacion ?? ''}</li> }
                            { props.project.nota && <li className="list-group-item sgp-lb-h5"><span className="sgp-fw-600">{t("projects.note")}</span>{props.project.nota ?? ''}</li> }
                            { props.project.tipo_proyecto && <li className="list-group-item sgp-lb-h5"><span className="sgp-fw-600">{t("projects.projectType")}</span>{props.project.tipo_proyecto ?? ''}</li> }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProjectsAccordion