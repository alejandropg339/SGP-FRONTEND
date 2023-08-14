
import { useNavigate } from 'react-router-dom';
import { CommentsForm } from '../../components/CommentsForm.component';
import { CommentsList } from '../../components/CommentsList.component';
import { ProjectFields } from '../../components/ProjectFields.component';
import { ProjectInfo } from '../../components/ProjectInfo.component';
import { QualificationsForm } from '../../components/QualificationsForm.component';
import { useProject } from '../../hooks/useProject'
import './project.page.scss'
import { Participants } from '../../components/Participants.component';
import { handleActionModal, handleModal } from '../../../../commons/helpers/modalManagement';
import { ProjectStatus } from '../../components/EditStatus.component';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useGlobal } from '../../../../store/global.store';
import { RepositoryFactory } from '../../../../repositories/repositoryFactory';
import { UpdateProjectResponse } from '../../interfaces/projects.interface';
import { AddQualificationFormInterface } from '../../interfaces/addQualificationForm.interface';
import { CommonRoutesEnum } from '../../../../enums/commonRoutes.enum';
import { useUserStore } from '../../../../store/user.store';
import { useMemo, useState } from 'react';
import { Participant } from '../../interfaces/participant.interface';
import { ParticipantsRoles } from '../../../../enums/participantsRoles.enum';

const updateStatus = async (status: string, projectId: string) => await RepositoryFactory.RepositoryApiAuth.projects.updateProjectStatus(status, projectId)
const addQualification = async (request: AddQualificationFormInterface, projectId: string) => await RepositoryFactory.RepositoryApiAuth.projects.addQualification(projectId, request)

const getProducts = async (projectId: string) => await RepositoryFactory.RepositoryApiAuth.projects.getAllProjectProducts(projectId)

const addComment = async (productId: string, comment: string, userId: string) => await RepositoryFactory.RepositoryApiAuth.projects.addProductComment(productId, comment, userId);

const getParticipants = async (projectId: string) => await RepositoryFactory.RepositoryApiAuth.projects.getAllParticipants(projectId);

const deleteParticipant = async (projectId: string, userId: string) => await RepositoryFactory.RepositoryApiAuth.projects.deleteParticipant(projectId, { usuario: userId });

const deleteProduct = async (productId: string) => await RepositoryFactory.RepositoryApiAuth.projects.deleteProduct(productId);

const Project = () => {
  const { projectsData: project, idProject, refetchProjectData } = useProject();
  const { setLoading } = useGlobal();
  const [participantsList, setParticipantsList] = useState<Participant[] | undefined>()
  const userStore = useUserStore();

  const canEdit = useMemo(() => {
    return participantsList?.some((participant) => participant.usuario === userStore.userInfo.numberId)
  }, [participantsList, userStore.userInfo.numberId])

  const canQualify = useMemo(() => {
    return participantsList?.some((participant) => participant.usuario === userStore.userInfo.numberId && participant.rol === ParticipantsRoles.TeacherResearcher)
  }, [participantsList, userStore.userInfo.numberId])


  const navigate = useNavigate()

  const submit = (formValues: AddQualificationFormInterface) => {
    handleActionModal('info', 'Estas seguro?', 'Una vez agregada la calificación podrás modificarla en cualquier momento pero no añadir comentarios a los entregables ni eliminarlos.', true, true, 'Calificar', 'Cancelar', () => { handleSubmitNote([formValues, idProject!]) })
  }

  const submitComment = (formValues: { comment: string, productId: string }) => {
    refetchProducts();
    handleAddComment([formValues.productId, { comment: formValues.comment, userId: userStore.userInfo.numberId }])
  }

  const submitStatus = (status: string) => {
    handleUpdateStatus([{ status }, idProject!])
  }

  const { mutate: handleAddComment } = useMutation<UpdateProjectResponse, any, [string, { comment: string, userId: string | undefined }]>(([productId, request]) => addComment(productId, request.comment, request.userId!), {
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: () => {
      refetchProjectData()
    },
    onError: () => {
      handleActionModal('error', 'Error', 'Ocurrio un error al añadir el comentario, por favor intenta de nuevo más tarde')
    },
    onSettled: () => {
      setLoading(false);
    }
  })

  const { mutate: handleUpdateStatus } = useMutation<UpdateProjectResponse, any, [{ status: string }, string]>(([formValues, projectId]) => updateStatus(formValues.status, projectId), {
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: () => {
      refetchProjectData()
      handleActionModal('success', 'Estado Actualizado correctamente.')
    },
    onError: () => {
      handleActionModal('error', 'Error al actualizar el estado del proyecto.')
    },
    onSettled: () => {
      setLoading(false);
    }
  })

  const { mutate: handleSubmitNote } = useMutation<UpdateProjectResponse, any, [AddQualificationFormInterface, string]>(([formValues, projectId]) => addQualification(formValues, projectId), {
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: () => {
      refetchProjectData()
      handleActionModal('success', 'Calificación añadida!', 'La calificación se ha añadido correctamente.')
    },
    onError: () => {
      handleActionModal('error', 'Error!', 'Hemos tenido un error a la hora de añadir la calificación si el problema persiste contactar a soporte')

    },
    onSettled: () => {
      setLoading(false);
    }
  })

  const { data: products, isLoading: isLoadingProducts, refetch: refetchProducts } = useQuery({
    queryKey: ['produc', idProject],
    queryFn: () => getProducts(idProject ?? ''),
    onError: (_) => {
      handleModal('error', 'Oops!', 'Algo salió mal, por favor intenta de nuevo más tarde', true, false, false);
      navigate(CommonRoutesEnum.SearchProject);
    },
    onSettled: () => {
      setLoading(false);
    }

  });

  const { data: participants, isLoading: isLoadingParticipants, refetch: refetchUsers } = useQuery({
    queryKey: ['participants', idProject],
    queryFn: () => getParticipants(idProject ?? ''),
    onSuccess: (data) => {
      setParticipantsList(data.data)
    },
    onError: (_) => {
      handleModal('error', 'Oops!', 'Algo salió mal, por favor intenta de nuevo más tarde', true, false, false);
      navigate(CommonRoutesEnum.SearchProject);
    },
    onSettled: () => {
      setLoading(false);
    }

  });

  const { mutate: handleDeleteParticipant } = useMutation<UpdateProjectResponse, any, [string, string]>(([projectId, userId]) => deleteParticipant(projectId, userId), {
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: () => {
      refetchUsers()
      handleActionModal('success', 'Participante eliminado!', 'El participante fue eliminado correctamente.')
    },
    onError: () => {
      handleActionModal('error', 'Error!', 'Hemos tenido un error a la hora de eliminar un participante.')

    },
    onSettled: () => {
      setLoading(false);
    }
  })

  const { mutate: handleDeleteProduct } = useMutation<UpdateProjectResponse, any, [string]>(([projectId]) => deleteProduct(projectId), {
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: () => {
      refetchProducts()
      handleActionModal('success', 'Producto eliminado!', 'El participante fue eliminado correctamente.')
    },
    onError: () => {
      handleActionModal('error', 'Error!', 'Hemos tenido un error a la hora de eliminar el producto.')

    },
    onSettled: () => {
      setLoading(false);
    }
  })

  const editProject = () => {
    canEdit && navigate(`${CommonRoutesEnum.Projects}/edit/${idProject}`)
  }

  return (
    <section className='project container mt-5 mb-5'>
      <div className="d-flex justify-content-between">
        <button className="btn sgp-btn sgp-btn--ghost sgp-lb sgp-lb--h1 p-0 mb-2" onClick={editProject}><span className="sgp-text-gray-95 sgp-fw-600">{project?.titulo}</span> {canEdit && <i className='bx bx-edit-alt'></i>}</button>

        {project.nota &&
          <div className="d-flex flex-column justify-content-center align-items-center">
            <h3 className="sgp-lb sgp-lb--h1 sgp-text-orange-50">
              {project.nota}
            </h3>
            <p className="sgp-lb sgp-lb--sm sgp-text-orange-50">Calificación</p>
          </div>
        }

      </div>

      <div className="mb-5">
        <ProjectInfo project={project} />
      </div>

      {project.descripcion && <ProjectStatus title={'Estado'} currentStatus={`${project.estado}` ?? ''} submitEditStatus={submitStatus} canEdit={canEdit} />}

      {project.descripcion && <ProjectFields title={'Descripción'} description={`${project.descripcion}` ?? ''} />}

      {project.descripcion && <ProjectFields title={'Justificación'} description={`${project.justificacion}` ?? ''} />}

      {project.conclusiones && <ProjectFields title={'Conclusiones'} description={project.conclusiones ?? ''} />}

      {project.retroalimentacion_final && <ProjectFields title={'Retroalimentación'} description={project.retroalimentacion_final ?? ''} />}


      <div className="row">
        <div className="col accordion">
          <Participants idProject={idProject!} participants={participants} isLoading={isLoadingParticipants} handleDelete={handleDeleteParticipant} canEdit={canQualify}/>
        </div>
      </div>

      <hr className='sgp-bg-gray-0 sgp-text-gray-10' />

      <div className="d-flex justify-content-between align-items-center">
        <h3 className="sgp-lb sgp-lb--h3 mt-4">Productos</h3>
        {canEdit &&
          <div>
            <button
              className='sgp-btn sgp-btn--primary sgp-btn--sm'
              onClick={() => navigate(`/projects/product/${idProject}`)}
            >
              <i className='bx bx-plus sgp-fw-600'></i> Añadir producto
            </button>
          </div>
        }
      </div>

      {
        products && products.data.length > 0 && !isLoadingProducts &&
        <p className="sgp-lb sgp-lb--md">Productos asociados al proyecto: </p>
      }

      {isLoadingProducts &&
        <div className="text-center">
          <div className="spinner-border sgp-spinner" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      }

      {products && products.data.length > 0 && !isLoadingProducts &&
        <>
          {products.data.map(({ titulo_producto, tipo_producto, url_repo, id, comentarios }, index) => (
            <div key={index} className="project__card mb-4">
              <div className="d-flex justify-content-between align-items-center">

                <h3 className="sgp-lb sgp-lb--subtitle-movil mt-4 sgp-fw-600">{titulo_producto}</h3>

                <div>
                  <a
                    href={url_repo}
                    download="filename"
                    className='sgp-btn sgp-btn--primary sgp-lb sgp-lb--md'
                    style={{ textDecoration: 'none' }}
                  ><i className='sgp-lb sgp-lb--lg bx bx-download'></i> Descargar
                  </a>

                  {!project.nota && canEdit &&
                    <button
                      className='sgp-btn sgp-btn--secondary sgp-lb sgp-lb--md ms-2'
                      style={{ textDecoration: 'none' }}
                      onClick={() => handleActionModal('warning', '¿Estás seguro de eliminar este producto?', 'Esta acción no se puede deshacer', true, true, 'Eliminar', 'Cancelar', () => { handleDeleteProduct([String(id)]) })}
                    ><i className='sgp-lb sgp-lb--lg bx bx-trash'></i> Eliminar
                    </button>
                  }

                </div>

              </div>

              <p className="sgp-lb sgp-lb--md">{tipo_producto}</p>

              <div className="mb-3">
                <CommentsList comments={comentarios ?? []} />
              </div>

              {!project.nota && canEdit &&  <CommentsForm submit={submitComment} productId={String(id)} />}
            </div>
          ))}
        </>
      }

      { canQualify && 
        <>
          <hr className='sgp-bg-gray-0 sgp-text-gray-10' />

          <h3 className="sgp-lb sgp-lb--h3 mt-4">Añadir calificaión</h3>
          <p className='sgp-lb sgp-lb--md'>Recuerda una vez añadas la calificaión el proyecto cambiará a un estado finalizado.</p>

          <div className="project__card">
            <QualificationsForm submit={submit} />
          </div>
        </>
      }

    </section>
  )
}

export default Project