
import { useNavigate } from 'react-router-dom';
import { CommentsForm } from '../../components/CommentsForm.component';
import { CommentsList } from '../../components/CommentsList.component';
import { ProjectFields } from '../../components/ProjectFields.component';
import { ProjectInfo } from '../../components/ProjectInfo.component';
import { QualificationsForm } from '../../components/QualificationsForm.component';
import { useProject } from '../../hooks/useProject'
import './project.page.scss'
const Project = () => {
  const { projectsData: project, idProject } = useProject();
  const navigate = useNavigate()
  const submit = (formValues: any) => {
    console.log(formValues)
  }

  const comments = [
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
        <div className="d-flex flex-column justify-content-center align-items-center">
          <h3 className="sgp-lb sgp-lb--h1 sgp-text-orange-50">
            5.0
          </h3>
          <p className="sgp-lb sgp-lb--sm sgp-text-orange-50">Calificación</p>
        </div>
      </div>

      <div className="mb-5">
        <ProjectInfo project={project} />
      </div>

      {project.descripcion && <ProjectFields title={'Descripción'} description={project.descripcion ?? ''} />}
      {project.descripcion && <ProjectFields title={'Justificación'} description={project.justificacion ?? ''} />}
      {project.descripcion && <ProjectFields title={'Conculsions'} description={project.conclusiones ?? ''} />}
      {project.descripcion && <ProjectFields title={'Retrospective'} description={project.retroalimentacion_final ?? ''} />}

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

      {products.map(({ name, description, url, comments }, index) => (
        <div className="project__card mb-4">
          <div className="d-flex justify-content-between align-items-center">

            <h3 className="sgp-lb sgp-lb--subtitle-movil mt-4 sgp-fw-600">{name}</h3>

            <a
              href={url}
              download
              className='sgp-btn sgp-btn--primary sgp-lb sgp-lb--md'
              style={{ textDecoration: 'none' }}
            ><i className='sgp-lb sgp-lb--lg bx bx-download'></i> Descargar
            </a>

          </div>

          <p className="sgp-lb sgp-lb--md">{description}</p>

          <div className="mb-3">

            <CommentsList comments={comments} />

          </div>

          <CommentsForm inputName={`comment-${index}`} submit={submit} />

        </div>

      ))}

      <hr className='sgp-bg-gray-0 sgp-text-gray-10' />

      <h3 className="sgp-lb sgp-lb--h3 mt-4">Añadir calificaión</h3>
      <p className='sgp-lb sgp-lb--md'>Recuerda una vez añadas la calificaión el proyecto cambiará a un estado finalizado.</p>

      <div className="project__card">
        <QualificationsForm submit={submit} />
      </div>


    </section>
  )
}

export default Project