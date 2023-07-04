import { Form, Formik, useField } from "formik"
import { addQualificationFormValidations, addQualificationInitialValues } from "../config/qualificationsFromValidations.config"
import { CustomInput } from "../../../commons/components/fromInputs/CustomInput.component"

export const QualificationsForm = ({ submit }: { submit: (formValues: any) => void }) => {
  return (
    <Formik
          initialValues={addQualificationInitialValues}
          validationSchema={addQualificationFormValidations}
          validateOnMount={true}
          onSubmit={submit}
        >
          {(formikProps) => (
            <Form>
              <div className="mb-4">
                <CustomInput label="Calificación" type='text' name="qualification" useField={useField} onChange={formikProps.handleChange} />
              </div>

              <div className="mb-4">
                <CustomInput label="Retroalimentación" type='text' name="retrospective" useField={useField} onChange={formikProps.handleChange} />
              </div>

              <div className="mb-4">
                <CustomInput label="Conclusiones" type='text' name="conclusions" useField={useField} onChange={formikProps.handleChange} />
              </div>

              <button type='submit' className='sgp-btn sgp-btn--primary btn sgp-btn--sm' disabled={!formikProps.isValid}>Añadir Calificación</button>
            </Form>
          )}
        </Formik>
  )
}
