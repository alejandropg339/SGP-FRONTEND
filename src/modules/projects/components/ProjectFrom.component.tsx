import { Form, Formik, useField } from "formik"
import { CustomInput } from "../../../commons/components/fromInputs/CustomInput.component"
import { CustomTextArea } from "../../../commons/components/fromInputs/CustomTextArea.component"
import { CustomSelect } from "../../../commons/components/fromInputs/CustomSelect.component"
import { useTranslation } from "react-i18next"
import { citiesOptions } from "../../../commons/helpers/citiesOptions"
import { useProjectTypes } from "../hooks/useProjecTypes"
import { CreateProjectForm } from "../interfaces/createProjectForm.interface"
import { createProjectFormValidations, createProjectInitialValues } from "../config/createProjectFormValidations.config"
import { Actions } from "../enums/Actions.enum"
import { projectStatus } from "../utils/proyectStatus"
import { transformDate } from "../utils/dateFormat"
import { usePrograms } from "../../../commons/hooks/usePrograms"

interface ProjectFormProps {
    initialValues: CreateProjectForm;
    action: string
    submit: (formValues: CreateProjectForm) => Promise<void>,
    isEdit?: boolean
}
export const ProjectFrom: React.FC<ProjectFormProps> = ({ initialValues = createProjectInitialValues, action, submit, isEdit }) => {
    const { t } = useTranslation('global');
    const { projectTypes } = useProjectTypes();
    const { programs } = usePrograms();
    const currentDate = transformDate(new Date())
    return (
        <>
        {initialValues && 
        <Formik
            initialValues={initialValues}
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
                                <option value={city.toLocaleUpperCase()} key={city}>{city}</option>
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

                    <div className="mb-4">
                        <CustomSelect label="Programa" name='program' useField={useField} onChange={formikProps.handleChange} id="selectProjectType">
                            <option defaultValue={''} hidden>Selecciona un Programa</option>
                            {programs.map((program, index) => (
                                <option value={Number(program.id)} key={index}>{program.nombre}</option>
                            ))}
                        </CustomSelect>
                    </div>

                    {action !== Actions.Create && <div className="mb-4">
                        <CustomSelect label={t("createProjectModule.statusProject") ?? ""} name='projectStatus' useField={useField} onChange={formikProps.handleChange} id="selectProjectType">
                            <option defaultValue={''}>{t("createProjectModule.selectAProjectType") ?? ""}</option>
                            {projectStatus.map((project, index) => (
                                <option value={project.toLocaleUpperCase()} key={index}>{project}</option>
                            ))}
                        </CustomSelect>
                    </div>
                    }

                    {isEdit &&
                        <>
                            <div className="mb-4">
                                <CustomInput label="fecha de inicio" type='date' name='initialDate' useField={useField} onChange={formikProps.handleChange} min={currentDate}/>
                            </div>

                            <div className="mb-4">
                                <CustomInput label="fecha de fin" type='date' name='finalDate' useField={useField} onChange={formikProps.handleChange} />
                            </div>
                        </>
                    }

                    <button className="btn sgp-btn sgp-btn--primary btn-lg px-5" type="submit" disabled={!formikProps.isValid}>{isEdit ? 'Editar' : t("createProjectModule.createProjectAction")}</button>

                </Form>
            )}
        </Formik>}
        </>
    )
}

