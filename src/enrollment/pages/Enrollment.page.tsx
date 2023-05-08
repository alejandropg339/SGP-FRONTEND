import { Formik, useField, Form } from "formik";
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
import { CustomInput } from "../../commons/components/fromInputs/CustomInput.component";
import { EnrollmentInitialValues, enrollmentFormValidations } from "../config/EnrollmentForm.config";
import { EnrollmentFormInterface } from "../interfaces/EnrollmentForm.interface";
import { CustomSelect } from "../../commons/components/fromInputs/CustomSelect.component";
import { useEnrollment } from "../hooks/useEnrollment";

const Enrollment = () => {
  const { t } = useTranslation('global');
  const query = useEnrollment();

  const submit = (formValues: EnrollmentFormInterface) => {
    query.mutation.mutate(formValues);
  }

  return (
    <div className="container-fluid p-0">
      <section className="sgp-background-gradient">
        <div className="py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100" >
            <div className="col-12 col-md-8 col-lg-6 col-xl-5" >
              <div className="card sgp-bg-gray text-white sgp-card">
                <div className="card-body p-5 text-center">
                  <div className="mb-md-5 mt-md-4 pb-5">
                    <h2 className="fw-bold mb-2 text-uppercase sgp-lb--h1">{t("enrollment.title")}</h2>
                    <p className="text-white-50 mb-5 sgp-lb--large">{t("enrollment.description")}</p>
                    <Formik
                      initialValues={EnrollmentInitialValues}
                      validationSchema={enrollmentFormValidations}
                      onSubmit={submit}
                      validateOnMount={true}
                    >
                      {(formikProps) => (
                        <Form>
                          <div className="mb-4">
                            <CustomInput label={t("enrollment.numberId") ?? ""} type='text' name='numberId' useField={useField} onChange={formikProps.handleChange} />
                          </div>
                          <div className="mb-4">
                            <CustomInput label={t("enrollment.code") ?? ""} type='text' name='code' useField={useField} onChange={formikProps.handleChange} />
                          </div>
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
                            <CustomInput label={t("enrollment.email") ?? ""} type='email' name='email' useField={useField} onChange={formikProps.handleChange} />
                          </div>
                          <div className="mb-4">
                            <CustomInput label={t("enrollment.personalEmail") ?? ""} type='email' name='personalEmail' useField={useField} onChange={formikProps.handleChange} />
                          </div>
                          <div className="mb-4">
                            <CustomInput label={t("enrollment.password") ?? ""} type='password' name='password' useField={useField} onChange={formikProps.handleChange} />
                          </div>
                          <div className="mb-4">
                            <CustomInput label={t("enrollment.confirmPassword") ?? ""} type='password' name='confirmPassword' useField={useField} onChange={formikProps.handleChange} />
                          </div>
                          <div className="mb-4">
                            <CustomSelect id="enrollmentSelect" label={t("enrollment.program")} name="program" useField={useField}>
                              <option selected>Selecciona un programa</option>
                              <option value="1">Ingenieria de sistemas</option>
                              <option value="2">Ingenieria areonautica</option>
                              <option value="3">Ingenieria electronica</option>
                            </CustomSelect>
                          </div>

                          <button className="btn btn-outline-light btn-lg px-5" type="submit" disabled={!formikProps.isValid}>{t("enrollment.complete")}</button>

                        </Form>
                      )}
                    </Formik>
                  </div>
                  <div>
                    <p className="mb-0">{t("enrollment.DouYouHaveAccount")} <Link to="/login" className="text-white-50 fw-bold sgp-text-orange">  {t("enrollment.login")} </Link></p>
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

export default Enrollment;