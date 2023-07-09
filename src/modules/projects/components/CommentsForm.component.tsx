import { Form, Formik, useField } from "formik"
import { CustomTextArea } from "../../../commons/components/fromInputs/CustomTextArea.component"

export const CommentsForm = ({ inputName, submit }: { inputName: string, submit: (formValues: any) => void }) => {
  return (
    <Formik
          initialValues={{}}
          onSubmit={submit}
        >
          {(formikProps) => (
            <Form>
              <div className="mb-4">
                <CustomTextArea label="Comentarios" type='text' name={inputName} useField={useField} onChange={formikProps.handleChange} />
              </div>
              <button type='submit' className='sgp-btn sgp-btn--primary btn sgp-btn--sm'>Añadir comentario</button>
            </Form>
          )}
        </Formik>
  )
}
