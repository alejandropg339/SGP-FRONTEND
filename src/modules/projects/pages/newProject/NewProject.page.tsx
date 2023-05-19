import { useTranslation } from "react-i18next";
import { Formik, useField, Form } from "formik";
import { CustomInput } from "../../../../commons/components/fromInputs/CustomInput.component";
import { CustomSelect } from "../../../../commons/components/fromInputs/CustomSelect.component";
import { CreateProjectForm } from "../../interfaces/createProjecForm.interface";
import { createProjectFormValidations, createProjectInitialValues } from "../../config/createProjectFormValidations.config";
import { useProjectTypes } from "../../hooks/useProjecTypes";
import { citiesOptions } from "../../../../commons/helpers/citiesOptions";
import { CustomTextArea } from "../../../../commons/components/fromInputs/CustomTextArea.component";
import { useNewProject } from "../../hooks/useNewProject";
import { CreateProjectRequest } from "../../interfaces/projects.interface";

const NewProject = () => {
  const { t } = useTranslation('global');
  const { projectTypes } = useProjectTypes();
  const { mutate } = useNewProject();

  const submit = async (formValues: CreateProjectForm) => {
    const request: CreateProjectRequest = {
        titulo: formValues.title,
        descripcion: formValues.description,
        tipo_proyecto: formValues.projectType,
        metodologia: formValues.methodology,
        justificacion: formValues.justification,
        ciudad: formValues.city,
    } 
    mutate(request);
  }

  return (
    <div className="container-fluid p-0 sgp-my-account">
      <section className="sgp-bg-light-white">
        <div className="py-5 ">
          <div className="row mb-4">
            <div className="col-12 text-center">
              <img src="../src/assets/add-project.svg" alt="avatar" className="sgp-my-account__avatar" />
            </div>
          </div>
          <div className="row d-flex justify-content-center align-items-center" >
            <div className="col-12 col-md-8 col-lg-6 col-xl-5" >
              <div className="card sgp-bg-gray-20 text-white sgp-card">
                <div className="card-body p-5 text-center">
                  <div className="mb-md-5 mt-md-4 pb-5">
                    <h2 className="sgp-lb--h1">{t("editUser.userInfo")}</h2>
                    <p className="text-white-50 mb-5 sgp-text-white">{t("editUser.userEditDescription")}</p>
                    <Formik
                      initialValues={createProjectInitialValues}
                      validationSchema={createProjectFormValidations}
                      onSubmit={submit}
                      validateOnMount={true}
                    >
                      {(formikProps) => (
                        <Form>
                          <div className="mb-4">
                            <CustomInput label={t("createProjectModule.title") ?? ""} type='text' name='title' useField={useField} onChange={formikProps.handleChange} />
                          </div>

                          <div className="mb-4">
                            <CustomInput label={t("createProjectModule.description") ?? ""} type='text' name='description' useField={useField} onChange={formikProps.handleChange} />
                          </div>

                          <div className="mb-4">
                            <CustomTextArea label={t("createProjectModule.methodology") ?? ""} type='text' name='methodology' useField={useField} onChange={formikProps.handleChange} />
                          </div>

                          <div className="mb-4">
                            <CustomTextArea label={t("createProjectModule.justification") ?? ""} type='text' name='justification' useField={useField} onChange={formikProps.handleChange} />
                          </div>

                          <div className="mb-4">
                            <CustomSelect label={t("createProjectModule.city") ?? ""} name='city' useField={useField} onChange={formikProps.handleChange} id="selectProjectType">
                            <option defaultValue={''}>{t("createProjectModule.selectCity") ?? ""}</option>
                              {citiesOptions.map((city) => (
                                <option value={city.toLocaleUpperCase()} key={city}>{ city }</option>
                              ))}
                            </CustomSelect>
                          </div>
                          
                          <div className="mb-4">
                            <CustomSelect label={t("createProjectModule.projectType") ?? ""} name='projectType' useField={useField} onChange={formikProps.handleChange} id="selectProjectType">
                            <option defaultValue={''}>{t("createProjectModule.selectAProjectType") ?? ""}</option>
                              {projectTypes.map((project, index) => (
                                <option value={project.nombre.toLocaleUpperCase()} key={index}>{project.nombre}</option>
                              ))}
                            </CustomSelect>
                          </div>
                          <button className="btn sgp-btn sgp-btn--primary btn-lg px-5" type="submit" disabled={!formikProps.isValid}>{t("createProjectModule.createProjectAction")}</button>

                        </Form>
                      )}
                    </Formik>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default NewProject;