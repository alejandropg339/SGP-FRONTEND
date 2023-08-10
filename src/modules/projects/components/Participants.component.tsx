import { useNavigate } from "react-router-dom"
import { handleActionModal } from "../../../commons/helpers/modalManagement"
import { ParticipantsResponse } from "../interfaces/participant.interface"
import { UpdateProjectResponse } from "../interfaces/projects.interface"
import { UseMutateFunction } from "@tanstack/react-query"

export const Participants = ({ idProject, participants, isLoading, handleDelete, canEdit }: { idProject: string, participants: ParticipantsResponse | undefined, isLoading: boolean, handleDelete: UseMutateFunction<UpdateProjectResponse, any, [string, string], unknown>, canEdit: boolean | undefined }) => {
    const navigate = useNavigate()
    const deleteParticipant = (userId: string) => {
        handleActionModal('warning', '¿Estás seguro de eliminar este participante?', 'Esta acción no se puede deshacer', true, true, 'Eliminar', 'Cancelar', () => { handleDelete([idProject, userId]) })
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
                    {isLoading &&
                        <div className="text-center">
                            <div className="spinner-border sgp-spinner" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    }
                    {!isLoading && <ul className="list-group list-group-flush">
                        {participants && participants.data.map((participant, index) => (
                            <li className="list-group-item sgp-lb-h5 ps-2 d-flex justify-content-between" key={index}>
                                <p>{participant?.nombres} {participant?.apellidos}</p>
                                {canEdit && <button className="btn sgp-btn sgp-btn--secondary" onClick={() => deleteParticipant(participant.cedula)}><i className='bx bx-trash-alt' ></i></button>}
                            </li>
                        ))
                        }
                    </ul>}
                    {canEdit &&
                        <div className="d-flex mb-2 mt-3">
                            <button className="btn sgp-btn sgp-btn--primary me-2 d-flex justify-content-center align-items-center ms-2" onClick={() => navigate(`/projects/add-participant/${idProject}`)}><i className='bx bx-plus-circle me-1'></i>Añadir participante</button>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
