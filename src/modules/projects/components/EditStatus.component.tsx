import { Formik, useField, Form } from "formik"
import { useState } from "react"
import { editStatusFormValidations } from "../config/editProjectStatus.config"
import { CustomSelect } from "../../../commons/components/fromInputs/CustomSelect.component"

export const ProjectStatus = ({ title, currentStatus, submitEditStatus }: { title: string, currentStatus: string, submitEditStatus: (status: string) => void }) => {
    const [isEditing, setIsEditing] = useState(false)

    const submit = ({ status }: { status: string }) => {
        submitEditStatus(status)
    }

    return (
        <div className="row mt-3">
            <div className="col-12">
                <button className="btn sgp-btn sgp-btn--ghost sgp-lb sgp-lb--h3 p-0 mb-2" onClick={() => setIsEditing(!isEditing)}><span className="sgp-text-gray-95 sgp-fw-600">{title}</span> <i className='bx bx-edit-alt'></i></button>
                <p className='sgp-lb sgp-lb--md'>
                    {currentStatus}
                </p>
                {isEditing &&
                    <div className="d-flex justify-content-between align-items-center">
                        <Formik
                            initialValues={{ status: currentStatus.toUpperCase() ?? '' }}
                            validationSchema={editStatusFormValidations}
                            onSubmit={submit}
                            validateOnMount={true}
                        >
                            {(formikProps) => (
                                <Form>
                                    <div className="d-flex" style={{maxHeight: '60px'}}>
                                        <div className="mb-4 me-2">
                                            <CustomSelect label={"Estado"} name='status' useField={useField} onChange={formikProps.handleChange} id="selectProjectType">
                                                <option defaultValue={''} hidden>{"Selecciona un estado"}</option>
                                                <option value="PROPUESTA">PROPUESTA</option>
                                                <option value="DESARROLLO">DESARROLLO</option>
                                                <option value="FINALIZADO">FINALIZADO</option>
                                            </CustomSelect>
                                        </div>

                                        <button className="btn sgp-btn sgp-btn--primary btn-lg px-5" type="submit" disabled={!formikProps.isValid}>Guardar</button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                } 
            </div>
        </div>
    )
}
