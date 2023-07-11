import { useTranslation } from "react-i18next";
import { LayoutFormProjects } from "../../layout/LayoutFormProjects";
import { ParticipantFormInterface } from "../../interfaces/participant.interface";
import { ParticipantFrom } from "../../components/ParticipantForm.component";
import { handleActionModal } from "../../../../commons/helpers/modalManagement";
import {  useNavigate, useParams } from "react-router-dom";

const NewParticipant = () => {
  const { t } = useTranslation('global');

  // FIXME
  const initialValues: ParticipantFormInterface = {
    id: '',
    role: '',
  }
  const navigate = useNavigate()
  const { idProject } = useParams();

  const submit = async (formValues: ParticipantFormInterface) => {
    handleActionModal('success', 'Participante añadido correctamente')
    navigate(`/projects/info/${idProject}`)
    console.log(formValues)
  }

  return (
    <LayoutFormProjects 
    title="Añadir participante"
    description="Por favor ingresa los datos solicitados para añadir un nuevo participante al proyecto"
    imgSrc="add-user.svg"
    >
      <ParticipantFrom initialValues={initialValues} submit={submit}/>
    </LayoutFormProjects>
  )
}

export default NewParticipant;