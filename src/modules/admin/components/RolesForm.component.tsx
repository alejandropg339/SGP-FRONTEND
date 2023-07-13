
import { Form, Formik, useField } from 'formik'
import { CustomInput } from '../../../commons/components/fromInputs/CustomInput.component'
import { CustomSelect } from '../../../commons/components/fromInputs/CustomSelect.component'
import { RolesFormInterface } from '../interfaces/RolesForm.iterface';
import { rolesFormValidation } from '../config/rolesFormValidtion.config';

interface RolesFormProps {
    initialValues: RolesFormInterface;
    submit: (formValues: RolesFormInterface) => Promise<void>,
}
export const RolesForm = ({ initialValues, submit }: RolesFormProps) => {
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={rolesFormValidation}
            onSubmit={submit}
            validateOnMount={true}
        >
            {(formikProps) => (
                <Form>
                    <div className="mb-4">
                        <CustomInput label={"Nombre del rol"} type='text' name='id' useField={useField} onChange={formikProps.handleChange} />
                    </div>

                    <div className="mb-4">
                        <CustomSelect label={"Modulo de usuarios"} name='usersRole' useField={useField} onChange={formikProps.handleChange} id="selectProjectType">
                            <option defaultValue={''}>{"Selecciona el rol dentro de proyecto"}</option>
                                <option value={"ESCRITURA"}>ESCRITURA</option>
                                <option value={"LECTURA"}>LECTURA</option>
                                <option value={"RESTRINGIDO"}>RESTRINGIDO</option>
                        </CustomSelect>
                    </div>


                    <div className="mb-4">
                        <CustomSelect label={"Modulo de programas"} name='programsRole' useField={useField} onChange={formikProps.handleChange} id="selectProjectType">
                            <option defaultValue={''}>{"Selecciona el rol dentro de proyecto"}</option>
                                <option value={"ESCRITURA"}>ESCRITURA</option>
                                <option value={"LECTURA"}>LECTURA</option>
                                <option value={"RESTRINGIDO"}>RESTRINGIDO</option>
                        </CustomSelect>
                    </div>

                    <div className="mb-4">
                        <CustomSelect label={"Modulo de facultades"} name='facultiesRole' useField={useField} onChange={formikProps.handleChange} id="selectProjectType">
                            <option defaultValue={''}>{"Selecciona el rol dentro de proyecto"}</option>
                                <option value={"ESCRITURA"}>ESCRITURA</option>
                                <option value={"LECTURA"}>LECTURA</option>
                                <option value={"RESTRINGIDO"}>RESTRINGIDO</option>
                        </CustomSelect>
                    </div>

                    <div className="mb-4">
                        <CustomSelect label={"Modulo de eventos"} name='eventsRole' useField={useField} onChange={formikProps.handleChange} id="selectProjectType">
                            <option defaultValue={''}>{"Selecciona el rol dentro de proyecto"}</option>
                                <option value={"ESCRITURA"}>ESCRITURA</option>
                                <option value={"LECTURA"}>LECTURA</option>
                                <option value={"RESTRINGIDO"}>RESTRINGIDO</option>
                        </CustomSelect>
                    </div>

                    <div className="mb-4">
                        <CustomSelect label={"Modulo de proyectos"} name='projectsRole' useField={useField} onChange={formikProps.handleChange} id="selectProjectType">
                            <option defaultValue={''}>{"Selecciona el rol dentro de proyecto"}</option>
                                <option value={"ESCRITURA"}>ESCRITURA</option>
                                <option value={"LECTURA"}>LECTURA</option>
                                <option value={"RESTRINGIDO"}>RESTRINGIDO</option>
                        </CustomSelect>
                    </div>

                    <div className="mb-4">
                        <CustomSelect label={"Modulo de semilleros"} name='hotbedRole' useField={useField} onChange={formikProps.handleChange} id="selectProjectType">
                            <option defaultValue={''}>{"Selecciona el rol dentro de proyecto"}</option>
                                <option value={"ESCRITURA"}>ESCRITURA</option>
                                <option value={"LECTURA"}>LECTURA</option>
                                <option value={"RESTRINGIDO"}>RESTRINGIDO</option>
                        </CustomSelect>
                    </div>

                    <div className="mb-4">
                        <CustomSelect label={"Modulo de reportes"} name='reportsRole' useField={useField} onChange={formikProps.handleChange} id="selectProjectType">
                            <option defaultValue={''}>{"Selecciona el rol dentro de proyecto"}</option>
                                <option value={"ESCRITURA"}>ESCRITURA</option>
                                <option value={"LECTURA"}>LECTURA</option>
                                <option value={"RESTRINGIDO"}>RESTRINGIDO</option>
                        </CustomSelect>
                    </div>

                    <div className="mb-4">
                        <CustomSelect label={"Modulo de roles"} name='rolesRole' useField={useField} onChange={formikProps.handleChange} id="selectProjectType">
                            <option defaultValue={''}>{"Selecciona el rol dentro de proyecto"}</option>
                                <option value={"ESCRITURA"}>ESCRITURA</option>
                                <option value={"LECTURA"}>LECTURA</option>
                                <option value={"RESTRINGIDO"}>RESTRINGIDO</option>
                        </CustomSelect>
                    </div>

                    <button className="btn sgp-btn sgp-btn--primary btn-lg px-5" type="submit" disabled={!formikProps.isValid}>{"Agregar"}</button>

                </Form>
            )}
        </Formik>
    )
}

