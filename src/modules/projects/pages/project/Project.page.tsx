
import { useNavigate } from 'react-router-dom';
import { CommentsForm } from '../../components/CommentsForm.component';
import { CommentsList } from '../../components/CommentsList.component';
import { ProjectFields } from '../../components/ProjectFields.component';
import { ProjectInfo } from '../../components/ProjectInfo.component';
import { QualificationsForm } from '../../components/QualificationsForm.component';
import { useProject } from '../../hooks/useProject'
import './project.page.scss'
import { Participants } from '../../components/Participants.component';
import { useState } from 'react';
import { handleActionModal } from '../../../../commons/helpers/modalManagement';

const initialStateComments = [
  {
    author: 'Andres Sanchez',
    date: '03/07/2023',
    comment: 'Le quedo una chimba!'
  },
  {
    author: 'Alejandro Padilla',
    date: '03/07/2023',
    comment: 'Genial puedo mejorar algo?'
  },
  {
    author: 'Andres Sanchez',
    date: '03/07/2023',
    comment: 'No nada es una retro chimba tome su 5.0 pa!'
  },
]
const Project = () => {
  const { projectsData: project, idProject } = useProject();

  //FIXME: REMOVE ALL FROM THIS PAGE
  const navigate = useNavigate()
  const [comments, setComments] = useState(initialStateComments)

  const [note, setNote] = useState()
  const [retro, setRetro] = useState()
  const [conclusion, setConclusion] = useState()

  const submit = (formValues: any) => {
    setNote(formValues.qualification)
    setRetro(formValues.retrospective)
    setConclusion(formValues.conclusions)
    handleActionModal('success', 'Calificación añadida', 'La calificación se ha añadido correctamente')
    console.log(formValues)
  }

  const submitComment = (formValues: any) => {
    setComments([...comments, { author: 'Alejandro Padilla', date: '03/07/2023', comment: formValues.comment }])
    console.log(formValues)
  }


  const products = [
    {
      name: 'Diagrama de flujo',
      description: 'Diagrama de flujo de la aplicación',
      url: '/Users/alejandropg339/Downloads/diploma-playwright.pdf',
      comments
    }
  ]

  return (
    <section className='project container mt-5 mb-5'>
      <div className="d-flex justify-content-between">
        <h3 className="sgp-lb sgp-lb--h1">
          {project?.titulo}
        </h3>

        {note &&
          <div className="d-flex flex-column justify-content-center align-items-center">
            <h3 className="sgp-lb sgp-lb--h1 sgp-text-orange-50">
              {note}
            </h3>
            <p className="sgp-lb sgp-lb--sm sgp-text-orange-50">Calificación</p>
          </div>
        }

      </div>

      <div className="mb-5">
        <ProjectInfo project={project} />
      </div>

      {project.descripcion && <ProjectFields title={'Descripción'} description={`${project.descripcion} Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati, reiciendis! Possimus enim aspernatur fugit corporis numquam at mollitia nulla quo provident? Sunt molestias eos ut, a amet animi harum vel. Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse facilis dolores rem, atque aspernatur hic impedit totam id laborum provident harum corporis? Reprehenderit, doloribus deleniti distinctio ad consectetur harum sed.` ?? ''} />}

      {project.descripcion && <ProjectFields title={'Justificación'} description={`${project.justificacion} Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati, reiciendis! Possimus enim aspernatur fugit corporis numquam at mollitia nulla quo provident? Sunt molestias eos ut, a amet animi harum vel. Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse facilis dolores rem, atque aspernatur hic impedit totam id laborum provident harum corporis? Reprehenderit, doloribus deleniti distinctio ad consectetur harum sed.` ?? ''} />}

      {retro && <ProjectFields title={'Conclusiones'} description={conclusion ?? ''} />}

      {conclusion && <ProjectFields title={'Retroalimentación'} description={retro ?? ''} />}


      <div className="row">
        <div className="col accordion">
          <Participants idProject={idProject!} />
        </div>
      </div>

      <hr className='sgp-bg-gray-0 sgp-text-gray-10' />

      <div className="d-flex justify-content-between align-items-center">
        <h3 className="sgp-lb sgp-lb--h3 mt-4">Proudctos</h3>
        <div>
          <button
            className='sgp-btn sgp-btn--primary sgp-btn--sm'
            onClick={() => navigate(`/projects/product/${idProject}`)}
          >
            <i className='bx bx-plus sgp-fw-600'></i> Añadir producto
          </button>
        </div>
      </div>
      <p className="sgp-lb sgp-lb--md">Productos asociados al proyecto: </p>

      <div className="project__card mb-4">
        {products.map(({ name, description, url, comments }, index) => (
          <div key={index}>
            <div className="d-flex justify-content-between align-items-center">

              <h3 className="sgp-lb sgp-lb--subtitle-movil mt-4 sgp-fw-600">{name}</h3>

              <div>
                <a
                  href={url}
                  download
                  className='sgp-btn sgp-btn--primary sgp-lb sgp-lb--md'
                  style={{ textDecoration: 'none' }}
                ><i className='sgp-lb sgp-lb--lg bx bx-download'></i> Descargar
                </a>

                {!note &&
                  <button
                    className='sgp-btn sgp-btn--secondary sgp-lb sgp-lb--md ms-2'
                    style={{ textDecoration: 'none' }}
                    onClick={() => handleActionModal('warning', '¿Estás seguro de eliminar este producto?', 'Esta acción no se puede deshacer', true, true, 'Eliminar', 'Cancelar', () => { console.log('Eliminado') })}
                  ><i className='sgp-lb sgp-lb--lg bx bx-trash'></i> Eliminar
                  </button>
                }

              </div>

            </div><p className="sgp-lb sgp-lb--md">{description}</p><div className="mb-3">

              <CommentsList comments={comments} />

            </div>
          </div>
        ))}
        {!note && <CommentsForm submit={submitComment} />}
      </div>

      {!note &&
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