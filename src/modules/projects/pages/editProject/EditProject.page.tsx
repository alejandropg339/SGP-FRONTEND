import { useTranslation } from "react-i18next";
import { CreateProjectForm } from "../../interfaces/createProjectForm.interface";
import { useProject } from "../../hooks/useProject";
import { requestTransform } from "../../utils/requestProject";
import { ProjectFrom } from "../../components/ProjectFrom.component";
import { LayoutFormProjects } from "../../layout/LayoutFormProjects";
import { useParams } from "react-router-dom";
import useProjectStore from "../../stores/useProjectStore";
import { useEffect } from "react";

const EditProject = () => {
  const { t } = useTranslation('global');
  const { mutateUpdate, initialValues, loadingProject } = useProject();
  const { action } = useParams()
  const { projectFormData } = useProjectStore();

  const submit = async (formValues: CreateProjectForm) => {
    mutateUpdate([requestTransform(formValues), action ?? '']);
  }

  useEffect(() => {
    console.log(projectFormData)
  },[projectFormData])

  return (
    <LayoutFormProjects
      title="Actualizar proyecto"
      description="Por favor completa el formulario para Actualizar proyecto"
    >
      {((!loadingProject && initialValues.title)) && <ProjectFrom initialValues={initialValues} submit={submit} action={action as string} />}
    </LayoutFormProjects>
  )
}

export default EditProject;