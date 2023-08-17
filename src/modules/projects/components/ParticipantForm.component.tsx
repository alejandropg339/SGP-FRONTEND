import { Form, Formik, useField } from 'formik'
import { CustomInput } from '../../../commons/components/fromInputs/CustomInput.component'
import { CustomSelect } from '../../../commons/components/fromInputs/CustomSelect.component'
import { ParticipantFormInterface } from '../interfaces/participant.interface'
import { newParticipantFormValidations } from '../config/addParticipantFormValidations.config'
import { ParticipantsRoles } from '../../../enums/participantsRoles.enum'

interface ParticipantFormProps {
    initialValues: ParticipantFormInterface;
    submit: (formValues: ParticipantFormInterface) => Promise<void>,
}
export const ParticipantFrom: React.FC<ParticipantFormProps> = ({ initialValues, submit }) => {
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={newParticipantFormValidations}
            onSubmit={submit}
            validateOnMount={true}
        >
            {(formikProps) => (
                <Form>
                    <div className="mb-4">
                        <CustomInput label={"Ingresa la cedula del participante"} type='text' name='userId' useField={useField} onChange={formikProps.handleChange} />
                    </div>
                    <div className="mb-4">
                        <CustomSelect label={"Rol"} name='role' useField={useField} onChange={formikProps.handleChange} id="selectProjectType">
                            <option defaultValue={''}>{"Selecciona el rol dentro de proyecto"}</option>
                                <option value={ParticipantsRoles.Researcher}>Investigador</option>
                                <option value={ParticipantsRoles.TeacherResearcher}>Docente Investigador</option>
                        </CustomSelect>
                    </div>

                    <button className="btn sgp-btn sgp-btn--primary btn-lg px-5" type="submit" disabled={!formikProps.isValid}>{"Agregar"}</button>

                </Form>
            )}
        </Formik>
    )
}

