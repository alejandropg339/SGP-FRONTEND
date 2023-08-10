import { Form, Formik, useField } from "formik"
import { CustomInput } from "../../../commons/components/fromInputs/CustomInput.component"
import { newProductFormValidations, newProductInitialValues } from "../config/newProductFormValidations.config"
import { NewProductFormInterface } from "../interfaces/product.interface"
import { useState } from "react"

export const ProductForm = ({ submit }: { submit: (formValues: NewProductFormInterface) => void }) => {

    const [isLink, setIsLink] = useState(false)

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
                        <CustomInput label="Tipo de producto" type='text' name="productType" useField={useField} onChange={formikProps.handleChange} />
                    </div>

                    <div className="d-flex w-100 sgp-bg-white mb-4" style={{ border: '1px solid #d1cfcf', padding: '5px', borderRadius: '8px' }}>
                        <button className={`btn sgp btn w-100 ${isLink ? 'sgp-btn--primary' : 'sgp-btn--ghost'}`} onClick={() => {setIsLink(true); formikProps.resetForm()}}>Link</button>
                        <button className={`btn sgp btn w-100 ${isLink ? 'sgp-btn--ghost' : 'sgp-btn--primary'}`} onClick={() => {setIsLink(false); formikProps.resetForm()}}>Archivo</button>
                    </div>

                    {isLink
                        ?
                        <div className="mb-4">
                            <CustomInput label="Descripción ó Links" type='text' name="link" useField={useField} onChange={formikProps.handleChange} />
                        </div>
                        :
                        <div className="mb-4 form-floating">
                            <div className="form-floating">
                                <input type="file" name="file" onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    if (event.currentTarget.files) {
                                        formikProps.setFieldValue(
                                            "file",
                                             event.currentTarget.files[0]
                                         );
                                    }
                                }} className="form-control" id="inputFile"/>
                                <label htmlFor="inputFile" className="sgp-text-gray-50-medium">Producto</label>
                            </div>
                        </div>
                    }


                    <button type='submit' className='sgp-btn sgp-btn--primary btn sgp-btn--sm' disabled={!formikProps.isValid}>Agregar Producto</button>
                </Form>
            )}
        </Formik>
    )
}
