import { CreateProjectForm } from "../../interfaces/createProjectForm.interface";
import { useProject } from "../../hooks/useProject";
import { requestTransform } from "../../utils/requestProject";
import { ProjectFrom } from "../../components/ProjectFrom.component";
import { LayoutFormProjects } from "../../../../commons/layout/LayoutFormProjects";
import { useParams } from "react-router-dom";
import { createProjectInitialValues } from "../../config/createProjectFormValidations.config";

const EditProject = () => {
  const { mutateUpdate, initialValues = createProjectInitialValues, loadingProject } = useProject();
  const { idProject } = useParams()

  const submit = async (formValues: CreateProjectForm) => {
    mutateUpdate([requestTransform(formValues), idProject ?? '']);
  }


  return (
    <LayoutFormProjects
      title="Actualizar proyecto"
      description="Por favor completa el formulario para Actualizar proyecto"
    >
      {((!loadingProject && initialValues.title)) && <ProjectFrom initialValues={initialValues} submit={submit} action={idProject as string} isEdit/>}
    </LayoutFormProjects>
  )
}

export default EditProject;