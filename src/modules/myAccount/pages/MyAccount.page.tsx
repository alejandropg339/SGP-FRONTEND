import { Formik, useField, Form } from "formik";
import { useTranslation } from 'react-i18next';
import { CustomInput } from "../../../commons/components/fromInputs/CustomInput.component";
import { MyAccountFormInterface } from "../interfaces/MyAccountForm.interface";
import { MyAccountFormValidations, MyAccountInitialValues } from "../config/MyAccountForm.config";
import './MyAccount.page.scss'

const MyAccount = () => {
  const { t } = useTranslation('global');

  const submit = (formValues: MyAccountFormInterface) => {
    console.log(formValues);
  }

  return (
    <div className="container-fluid p-0 sgp-my-account sgp-bg-gray-50-0">
      <section className="sgp-bg-gray-50-0">
        <div className="py-5 ">
            <div className="row mb-4">
                <div className="col-12 text-center">
                    <img src="src/assets/avatar.svg" alt="avatar" className="sgp-my-account__avatar"/>
                </div>
            </div>
            <div className="row">
                <div className="col-12 text-center">
                    <p className="sgp-lb--h1">Alejandro Padilla - 30000045273</p>
                    <p className="sgp-lb--h3">alejandro.padlla@usbbog.edu.co</p>
                    <p className="sgp-lb--h3">C.C 1010092615</p>
                    <p className="badge rounded-pill sgp-bg-orange-95 sgp-lb--h2">Admin</p>
                </div>
            </div>
          <div className="row d-flex justify-content-center align-items-center " >
            <div className="col-12 col-md-8 col-lg-6 col-xl-5" >
              <div className="card sgp-bg-gray-50 text-white sgp-card">
                <div className="card-body p-5 text-center">
                  <div className="mb-md-5 mt-md-4 pb-5">
                    <h2 className="sgp-lb--h1">Tu Cuenta</h2>
                    {/* TODO: BADGE ROLE */}
                    <p className="text-white-50 mb-5">{t("enrollment.description")}</p>
                    <Formik
                      initialValues={MyAccountInitialValues}
                      validationSchema={MyAccountFormValidations}
                      onSubmit={submit}
                      validateOnMount={true}
                    >
                      {(formikProps) => (
                        <Form>
                          
                          <div className="mb-4">
                            <CustomInput label={t("enrollment.name") ?? ""} type='text' name='name' useField={useField} onChange={formikProps.handleChange} />
                          </div>
                          <div className="mb-4">
                            <CustomInput label={t("enrollment.lastName") ?? ""} type='text' name='lastName' useField={useField} onChange={formikProps.handleChange} />
                          </div>
                          <div className="mb-4">
                            <CustomInput label={t("enrollment.phone") ?? ""} type='text' name='phone' useField={useField} onChange={formikProps.handleChange} />
                          </div>
                          <div className="mb-4">
                            <CustomInput label={t("enrollment.personalEmail") ?? ""} type='email' name='personalEmail' useField={useField} onChange={formikProps.handleChange} />
                          </div>

                          <button className="btn sgp-btn sgp-btn--primary btn-lg px-5" type="submit" disabled={!formikProps.isValid}>Actualizar</button>

                        </Form>
                      )}
                    </Formik>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default MyAccount;