import { CreateProjectForm } from "../../interfaces/createProjectForm.interface";
import { useProject } from "../../hooks/useProject";
import { requestTransform } from "../../utils/requestProject";
import { ProjectFrom } from "../../components/ProjectFrom.component";
import { LayoutFormProjects } from "../../../../commons/layout/LayoutFormProjects";
import { Actions } from "../../enums/Actions.enum";
import { useUserStore } from "../../../../store/user.store";

const NewProject = () => {
  const { mutate, initialValues } = useProject();
  const { userInfo: { numberId } } = useUserStore()
  // const { action } = useParams() ;

  const submit = async (formValues: CreateProjectForm) => {
    const values: CreateProjectForm = {
      ...formValues,
      user: numberId
    }
      mutate(requestTransform(values));
  }

  return (
    <LayoutFormProjects 
    title="Crear nuevo proyecto"
    description="Por favor completa el formulario para crear un nuevo proyecto"
    >
      <ProjectFrom initialValues={initialValues} submit={submit} action={Actions.Create}/>
    </LayoutFormProjects>
  )
}

export default NewProject;