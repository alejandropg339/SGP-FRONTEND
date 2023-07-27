import { useNavigate } from "react-router-dom"
import { handleActionModal } from "../../../commons/helpers/modalManagement"

export const Participants = ({ idProject }: { idProject: string }) => {
    const navigate = useNavigate()
    const deleteParticipant = () => {
        handleActionModal('warning', '¿Estás seguro de eliminar este participante?', 'Esta acción no se puede deshacer', true, true, 'Eliminar', 'Cancelar', () => {console.log('Eliminado') })
    }
    return (
        <div className="accordion-item">
            <h2 className="accordion-header">
                <button
                    className="accordion-button collapsed ps-2 sgp-lb sgp-lb--h3"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#${String(1)}`}
                    aria-expanded="false"
                    aria-controls={String(1)}>
                    Participantes
                </button>
            </h2>
            <div id={String(1)} className="accordion-collapse collapse" data-bs-parent={`#${String(2)}`}>
                <div className="accordion-body ps-0">
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item sgp-lb-h5 ps-2 d-flex justify-content-between">
                            <p>Alejandro Padilla</p>
                    {/* FIXME: UNCOMMENT THIS LINES */}
                            {/* <button className="btn sgp-btn sgp-btn--secondary" onClick={deleteParticipant}><i className='bx bx-trash-alt' ></i></button> */}
                        </li>
                        <li className="list-group-item sgp-lb-h5 ps-2 d-flex justify-content-between">
                            <p>Jefferson Daza</p>
                    {/* FIXME: UNCOMMENT THIS LINES */}
                            {/* <button className="btn sgp-btn sgp-btn--secondary" onClick={deleteParticipant}><i className='bx bx-trash-alt' ></i></button> */}
                        </li>
                    </ul>
                    {/* FIXME: UNCOMMENT THIS LINES */}
                    {/* <div className="d-flex mb-2 mt-3">
                        <button className="btn sgp-btn sgp-btn--primary me-2 d-flex justify-content-center align-items-center ms-2" onClick={() => navigate(`/projects/add-participant/${idProject}`)}><i className='bx bx-plus-circle me-1'></i>Añadir participante</button>
                    </div> */}
                </div>
            </div>
        </div>
    )
}
