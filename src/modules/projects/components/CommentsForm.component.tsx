import { Form, Formik, useField } from "formik"
import { CustomTextArea } from "../../../commons/components/fromInputs/CustomTextArea.component"
import { commentsFormValidation } from "../config/commentsFormValidations.config"
import { useRef } from "react"

export const CommentsForm = ({ submit }: { submit: (formValues: any) => void }) => {
  const formikRef = useRef<any>()
  return (
    <Formik
          initialValues={{}}
          validationSchema={commentsFormValidation}
          validateOnMount={true}
          innerRef={formikRef}
          onSubmit={(values, { resetForm }) =>{
            submit(values);
            resetForm();
            formikRef.current.setFieldValue('comment', '');
          }}
        >
          {(formikProps) => (
            <Form>
              <div className="mb-4">
                <CustomTextArea label="Comentarios" type='text' name="comment" useField={useField} onChange={formikProps.handleChange} />
              </div>
              <button type='submit' className='sgp-btn sgp-btn--primary btn sgp-btn--sm' disabled={!formikProps.isValid}>Añadir comentario</button>
            </Form>
          )} 
        </Formik>
  )
}
