import { useTranslation } from "react-i18next";
import { ProjectsAccordionProps } from "../interfaces/projectsAccordionProps.interface";
import { RolesEnum } from "../../../enums/roles.enum";
import { useUserStore } from "../../../store/user.store";
import { useNavigate } from "react-router-dom";
import { CommonRoutesEnum } from "../../../enums/commonRoutes.enum";
import { useProject } from "../hooks/useProject";

const ProjectsAccordion = (props: ProjectsAccordionProps) => {
    const { t } = useTranslation("global");
    const { userInfo } = useUserStore();
    const navigate = useNavigate();
    const { deleteProjectAction, mutateActivateProject } = useProject();

    const edit = () => {
        navigate(`${CommonRoutesEnum.Projects}/edit/${props.project.id}`);
    }
    const info = () => {
        navigate(`${CommonRoutesEnum.Projects}/info/${props.project.id}`);
    }
    return (
        <>
            <div className="accordion-item">
                <h2 className="accordion-header">
                    <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#${String(props.index)}`}
                        aria-expanded="false"
                        aria-controls={String(props.index)}>
                        {props.project.titulo ?? ''} - {props.project.nota ?? 'Pendinte'} &nbsp;&nbsp; {String(props.project.visibilidad) === String(0)
                            && <span className="badge text-bg-danger">{t("projects.inactive")}</span>}
                    </button>
                </h2>
                <div id={String(props.index)} className="accordion-collapse collapse" data-bs-parent={`#${String(props.project.id)}`}>
                    <div className="accordion-body">
                        <ul className="list-group list-group-flush">
                            {props.project.id && <li className="list-group-item sgp-lb-h5"><span className="sgp-fw-600">{t("projects.id")}</span>{props.project.id ?? ''}</li>}
                            {props.project.titulo && <li className="list-group-item sgp-lb-h5"><span className="sgp-fw-600">{t("projects.title")}</span>{props.project.titulo ?? ''}</li>}
                            {props.project.estado && <li className="list-group-item sgp-lb-h5"><span className="sgp-fw-600">{t("projects.status")}</span>{props.project.estado ?? ''}</li>}
                            {props.project.descripcion && <li className="list-group-item sgp-lb-h5"><span className="sgp-fw-600">{t("projects.description")}</span>{props.project.descripcion ?? ''}</li>}
                            {props.project.macro_proyecto && <li className="list-group-item sgp-lb-h5"><span className="sgp-fw-600">{t("projects.macroProject")}</span>{props.project.macro_proyecto ?? ''}</li>}
                            {props.project.fecha_inicio && <li className="list-group-item sgp-lb-h5"><span className="sgp-fw-600">{t("projects.initialDate")}</span>{String(props.project.fecha_inicio) ?? ''}</li>}
                            {props.project.fecha_fin && <li className="list-group-item sgp-lb-h5"><span className="sgp-fw-600">{t("projects.finalDate")}</span>{String(props.project.fecha_fin) ?? ''}</li>}
                            {props.project.semillero && <li className="list-group-item sgp-lb-h5"><span className="sgp-fw-600">{t("projects.hotbed")}</span>{props.project.semillero ?? ''}</li>}
                            {props.project.retroalimentacion_final && <li className="list-group-item sgp-lb-h5"><span className="sgp-fw-600">{t("projects.feedback")}</span>{props.project.retroalimentacion_final ?? ''}</li>}
                            {props.project.ciudad && <li className="list-group-item sgp-lb-h5"><span className="sgp-fw-600">{t("projects.city")}</span>{props.project.ciudad ?? ''}</li>}
                            {props.project.metodologia && <li className="list-group-item sgp-lb-h5"><span className="sgp-fw-600">{t("projects.methodology")}</span>{props.project.metodologia ?? ''}</li>}
                            {props.project.conclusiones && <li className="list-group-item sgp-lb-h5"><span className="sgp-fw-600">{t("projects.conclusions")}</span>{props.project.conclusiones ?? ''}</li>}
                            {props.project.justificacion && <li className="list-group-item sgp-lb-h5"><span className="sgp-fw-600">{t("projects.justifications")}</span>{props.project.justificacion ?? ''}</li>}
                            {props.project.nota && <li className="list-group-item sgp-lb-h5"><span className="sgp-fw-600">{t("projects.note")}</span>{props.project.nota ?? ''}</li>}
                            {props.project.tipo_proyecto && <li className="list-group-item sgp-lb-h5"><span className="sgp-fw-600">{t("projects.projectType")}</span>{props.project.tipo_proyecto ?? ''}</li>}
                        </ul>
                        <div className="d-flex mb-2">
                            {userInfo.role === RolesEnum.Admin &&
                                <>
                                    <button className="btn sgp-btn sgp-btn--secondary me-2 ms-3 d-flex justify-content-center align-items-center" onClick={info}>{t("projects.info")}&nbsp;<i className='bx bx-info-circle sgp-lb sgp-lb--subtitle-movil'></i></button>
                                    <button className="btn sgp-btn sgp-btn--secondary me-2 ms-3 d-flex justify-content-center align-items-center" onClick={edit}>{t("projects.edit")}&nbsp;<i className='bx bx-edit-alt sgp-lb sgp-lb--subtitle-movil'></i></button>
                                    {String(props.project.visibilidad) === '1'
                                        ?
                                        <button className="btn sgp-btn sgp-btn--primary me-2 ms-3 d-flex justify-content-center align-items-center" onClick={() => deleteProjectAction(String(props.project.id))}>{t("projects.delete")}&nbsp;<i className='bx bx-trash sgp-lb sgp-lb--subtitle-movil sgp-text-white'></i></button>
                                        :
                                        <button className="btn sgp-btn sgp-btn--primary me-2 ms-3 d-flex justify-content-center align-items-center" onClick={() => mutateActivateProject(String(props.project.id))}>{t("projects.activate")}</button>}

                                </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProjectsAccordion