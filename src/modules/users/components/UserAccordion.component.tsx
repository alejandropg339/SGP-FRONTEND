import { useTranslation } from "react-i18next";
import { UserAccordionProps } from "../Interfaces/UserAccordion.interface";
import { useUserStore } from "../../../store/user.store";
import { useEditUser } from "../hooks/useEditUser";
import { useToggleVisibilityUser } from "../hooks/useDeleteUser";
import { Permissions } from "../../../enums/permissions.enum";

const UserAccordion = (props: UserAccordionProps) => {
    const { t } = useTranslation("global");
    const { userInfo: { permisions } } = useUserStore();
    const { keepEditUser } = useEditUser();
    const { deleteUserAction, activateUserDispatcher } = useToggleVisibilityUser();

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
                        {props.user.nombres ?? ''} {props.user.apellidos ?? ''} - {props.user.cod_universitario ?? ''} &nbsp;&nbsp; {String(props.user.visibilidad) === String(0) 
                        && <span className="badge text-bg-danger">{t("user.inactive")}</span>}
                    </button>
                </h2>
                <div id={String(props.index)} className="accordion-collapse collapse" data-bs-parent={`#${props.user.cedula}`}>
                    <div className="accordion-body">
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item sgp-lb-h5"><span className="sgp-fw-600">{t("user.numberId")}</span>{props.user.cedula ?? ''} </li>
                            <li className="list-group-item sgp-lb-h5"><span className="sgp-fw-600">{t("user.uCode")}</span>{props.user.cod_universitario ?? ''} </li>
                            <li className="list-group-item sgp-lb-h5"><span className="sgp-fw-600">{t("user.name")}</span>{props.user.nombres ?? ''}</li>
                            <li className="list-group-item sgp-lb-h5"><span className="sgp-fw-600">{t("user.lastName")}</span>{props.user.apellidos ?? ''}</li>
                            <li className="list-group-item sgp-lb-h5"><span className="sgp-fw-600">{t("user.phone")}</span>{props.user.telefono ?? ''}</li>
                            <li className="list-group-item sgp-lb-h5"><span className="sgp-fw-600">{t("user.institutionalEmail")}</span>{props.user.correo_est ?? ''}</li>
                            {props.user.correo_personal && <li className="list-group-item sgp-lb-h5"><span className="sgp-fw-600">{t("user.personalEmail")}</span>{props.user.correo_personal ?? ''} </li>}
                        </ul>
                        {permisions?.USUARIOS === Permissions.Write &&
                            <div className="d-flex mb-2">
                                <button className="btn sgp-btn sgp-btn--secondary me-2 ms-3" onClick={() => keepEditUser(props.user)}>{t("user.edit")}</button>
                                {String(props.user.visibilidad) === '1'
                                    ?
                                    <button className="btn sgp-btn sgp-btn--primary" onClick={() => deleteUserAction(props.user.cedula ?? '')}>{t("user.delete")}</button>
                                    :
                                    <button className="btn sgp-btn sgp-btn--primary ms-2" onClick={() => activateUserDispatcher(props.user.cedula ?? '')}>{t("user.activate")}</button>
                                }
                            </div>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserAccordion;