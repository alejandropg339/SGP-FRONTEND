import { LayoutFormProjects } from "../../../../commons/layout/LayoutFormProjects";
import { AddParticipantResponse, ParticipantFormInterface } from "../../interfaces/participant.interface";
import { ParticipantFrom } from "../../components/ParticipantForm.component";
import { handleActionModal } from "../../../../commons/helpers/modalManagement";
import {  useNavigate, useParams } from "react-router-dom";
import { RepositoryFactory } from "../../../../repositories/repositoryFactory";
import { useMutation } from "@tanstack/react-query";
import { useGlobal } from "../../../../store/global.store";


type CreateParticipantType = (formValues: ParticipantFormInterface, projectId: string) => Promise<AddParticipantResponse>

const createParticipant: CreateParticipantType = async (formValues: ParticipantFormInterface, projectId: string) => await RepositoryFactory.RepositoryApiAuth.projects.addParticipant(projectId, formValues)

const NewParticipant = () => {

  // FIXME
  const initialValues: ParticipantFormInterface = {
    userId: '',
    role: '',
  }
  const navigate = useNavigate()
  const { idProject = '' } = useParams();
  
  const { setLoading } = useGlobal();
  const submit = async (formValues: ParticipantFormInterface) => {
    mutate([formValues, idProject])
  }

  const { mutate } = useMutation<AddParticipantResponse, any, [ParticipantFormInterface, string]>(([formValues, projectId]) => createParticipant(formValues, projectId), {
    onMutate: () => {
      console.log('isLoading true')
      setLoading(true);
    },
    onSuccess: (data) => {
      console.log(data)
      handleActionModal('success', 'Participante añadido correctamente')
      navigate(`/projects/info/${idProject}`)
    },
    onError: (error) => {
      console.log(error)
      handleActionModal('error', 'Error al añadir participante')
    },
    onSettled: () => {
      setLoading(false);
      console.log('isLoading false')
    }
  })

  return (
    <LayoutFormProjects 
    title="Añadir participante"
    description="Por favor ingresa los datos solicitados para añadir un nuevo participante al proyecto"
    imgSrc="https://tecnosoft.ingusb.com/img/add-user.svg"
    >
      <ParticipantFrom initialValues={initialValues} submit={submit}/>
    </LayoutFormProjects>
  )
}

export default NewParticipant;