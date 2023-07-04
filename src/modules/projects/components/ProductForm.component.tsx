import { Form, Formik, useField } from "formik"
import { CustomInput } from "../../../commons/components/fromInputs/CustomInput.component"
import { newProductFormValidations, newProductInitialValues } from "../config/newProductFormValidations.config"

export const ProductForm = ({ submit }: { submit: (formValues: any) => void }) => {
    return (
        <Formik
            initialValues={newProductInitialValues}
            validationSchema={newProductFormValidations}
            validateOnMount={true}
            onSubmit={submit}
        >
            {(formikProps) => (
                <Form>
                    <div className="mb-4">
                        <CustomInput label="Nombre del proyecto" type='text' name="name" useField={useField} onChange={formikProps.handleChange} />
                    </div>

                    <div className="mb-4">
                        <CustomInput label="Descripción" type='text' name="description" useField={useField} onChange={formikProps.handleChange} />
                    </div>

                    <div className="mb-4">
                        <CustomInput label="Producto" type='file' name="file" useField={useField} onChange={formikProps.handleChange} />
                    </div>

                    <button type='submit' className='sgp-btn sgp-btn--primary btn sgp-btn--sm' disabled={!formikProps.isValid}>Añadir Calificación</button>
                </Form>
            )}
        </Formik>
    )
}
