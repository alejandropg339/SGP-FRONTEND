import { useTranslation } from 'react-i18next';
import { CustomInput } from '../../../commons/components/fromInputs/CustomInput.component';
import { Formik, useField, Form } from 'formik';
import { initialValuesLoginForm, loginFormValidations } from '../config/LoginForm.config';
import { LoginFormInterface } from '../interfaces/LoginForm.interface';
import { Link } from 'react-router-dom';
import { useLogin } from '../hooks/useLogin';

const Login = () => {
  const { t } = useTranslation("global");
  const query = useLogin();

  const submit = (formValues: LoginFormInterface) => {
    query.mutation.mutate(formValues)
  }

  return (
    <>
      <div className="container-fluid p-0 sgp-login">
        <section className="sgp-full-size sgp-background-gradient">
          <div className="py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100" >
              <div className="col-12 col-md-8 col-lg-6 col-xl-5" >
                <div className="card sgp-bg-gray text-white sgp-card">
                  <div className="card-body p-5 text-center">
                    <div className="mb-md-5 mt-md-4 pb-5">
                      <h2 className="fw-bold mb-2 text-uppercase sgp-lb--h1">{t("login.title")}</h2>
                      <p className="text-white-50 mb-5">{t("login.description")}</p>
                      <Formik
                        initialValues={initialValuesLoginForm}
                        validationSchema={loginFormValidations}
                        onSubmit={submit}
                        validateOnMount={true}
                      >
                        {(formikProps) => (
                          <Form>
                            <div className="mb-4">
                              <CustomInput label={t("login.email") ?? ""} type='email' name='email' useField={useField} onChange={formikProps.handleChange} />
                            </div>
                            <div className="mb-4">
                              <CustomInput label={t("login.password") ?? ""} type='password' name='password' useField={useField} onChange={formikProps.handleChange} />
                            </div>

                            <button className="btn btn-outline-light btn-lg px-5" type="submit" disabled={!formikProps.isValid}>{t("login.goIn")}</button>

                          </Form>
                        )}
                      </Formik>
                    </div>
                    <div>
                      <p className="mb-0">{t("login.withoutAccount")} <Link to="/enrollment" className="text-white-50 fw-bold sgp-text-orange">  {t("login.register")} </Link></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default Login;

