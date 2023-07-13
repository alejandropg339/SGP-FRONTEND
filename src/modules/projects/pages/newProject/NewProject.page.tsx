import { useTranslation } from "react-i18next";
import { CreateProjectForm } from "../../interfaces/createProjectForm.interface";
import { useProject } from "../../hooks/useProject";
import { requestTransform } from "../../utils/requestProject";
import { ProjectFrom } from "../../components/ProjectFrom.component";
import { LayoutFormProjects } from "../../../../commons/layout/LayoutFormProjects";
import { Actions } from "../../enums/Actions.enum";

const NewProject = () => {
  const { t } = useTranslation('global');
  const { mutate, initialValues } = useProject();
  // const { action } = useParams() ;

  const submit = async (formValues: CreateProjectForm) => {
      mutate(requestTransform(formValues));
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