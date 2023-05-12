import { Formik, useField, Form } from "formik";
import { useTranslation } from 'react-i18next';
import { CustomInput } from "../../../commons/components/fromInputs/CustomInput.component";
import { UserEditFormInterface } from "../Interfaces/UserEditForm.interface";
import { EditUserFormValidations } from "../config/EditUserForm.config";
import { useUserStore } from "../../../store/user.store";

const EditUser = () => {
  const { t } = useTranslation('global');
  const { userToEditInfo, userInfo } = useUserStore();

  const submit = (formValues: UserEditFormInterface) => {
    console.log(formValues);
  }

  const EditUserInitialValues: UserEditFormInterface = {
    name: userToEditInfo.nombres ?? '',
    lastName: userToEditInfo.apellidos ?? '',
    phone: userToEditInfo.telefono ?? '',
    personalEmail: userToEditInfo.correo_personal ?? '',
  }

  return (
    <div className="container-fluid p-0 sgp-my-account">
      <section className="sgp-bg-gray-soft">
        <div className="py-5 ">
          <div className="row mb-4">
            <div className="col-12 text-center">
              <img src="src/assets/avatar.svg" alt="avatar" className="sgp-my-account__avatar" />
            </div>
          </div>
          <div className="row">
            <div className="col-12 text-center">
              <p className="sgp-lb--h1">{userToEditInfo.nombres} {userToEditInfo.apellidos} - {userToEditInfo.cod_universitario}</p>
              <p className="sgp-lb--h3">{userToEditInfo.correo_est}</p>
              <p className="sgp-lb--h3">C.C {userToEditInfo.cedula}</p>
              <p className="badge rounded-pill sgp-bg-orange sgp-lb--h2">{userInfo.role}</p>
            </div>
          </div>
          <div className="row d-flex justify-content-center align-items-center " >
            <div className="col-12 col-md-8 col-lg-6 col-xl-5" >
              <div className="card sgp-bg-gray text-white sgp-card">
                <div className="card-body p-5 text-center">
                  <div className="mb-md-5 mt-md-4 pb-5">
                    <h2 className="sgp-lb--h1">Tu Cuenta</h2>
                    {/* TODO: BADGE ROLE */}
                    <p className="text-white-50 mb-5">{t("enrollment.description")}</p>
                    <Formik
                      initialValues={EditUserInitialValues}
                      validationSchema={EditUserFormValidations}
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

                          <button className="btn btn-outline-light btn-lg px-5" type="submit" disabled={!formikProps.isValid}>Actualizar</button>

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

export default EditUser;