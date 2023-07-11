import { Form, Formik, useField } from 'formik'
import { CustomInput } from '../../../commons/components/fromInputs/CustomInput.component'
import { CustomSelect } from '../../../commons/components/fromInputs/CustomSelect.component'
import { useTranslation } from 'react-i18next'
import { ParticipantFormInterface } from '../interfaces/participant.interface'
import { newParticipantFormValidations } from '../config/addParticipantFormValidations.config'

interface ParticipantFormProps {
    initialValues: ParticipantFormInterface;
    submit: (formValues: ParticipantFormInterface) => Promise<void>,
}
export const ParticipantFrom: React.FC<ParticipantFormProps> = ({ initialValues, submit }) => {
    const { t } = useTranslation('global');
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
                        <CustomInput label={"Ingresa la cedula del participante"} type='text' name='id' useField={useField} onChange={formikProps.handleChange} />
                    </div>

                    <div className="mb-4">
                        <CustomSelect label={"Rol"} name='role' useField={useField} onChange={formikProps.handleChange} id="selectProjectType">
                            <option defaultValue={''}>{"Selecciona el rol dentro de proyecto"}</option>
                                <option value={"INVESTIGADOR"}>Investigador</option>
                                <option value={"DOCENTE"}>Docente</option>
                        </CustomSelect>
                    </div>

                    <button className="btn sgp-btn sgp-btn--primary btn-lg px-5" type="submit" disabled={!formikProps.isValid}>{"Agregar"}</button>

                </Form>
            )}
        </Formik>
    )
}

