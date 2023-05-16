import { Formik, useField, Form } from "formik";
import { useTranslation } from 'react-i18next';
import { CustomInput } from "../../../commons/components/fromInputs/CustomInput.component";
import { UserEditFormInterface } from "../Interfaces/UserEditForm.interface";
import { EditUserFormValidations } from "../config/EditUserForm.config";
import { useUserStore } from "../../../store/user.store";
import { useEditUser } from "../hooks/useEditUser";
import { UserResponseDataInterface } from "../../../commons/interfaces/user.interface";

const EditUser = () => {
  const { t } = useTranslation('global');
  const { userToEditInfo, userInfo } = useUserStore();
  const { handleEditUser } = useEditUser();

  const submit = (formValues: UserEditFormInterface) => {
    const newUserInfo: Partial<UserResponseDataInterface> = {
      ...userToEditInfo,
      nombres: formValues.name,
      apellidos: formValues.lastName,
      telefono: formValues.phone,
      correo_personal: formValues.personalEmail
    }

    handleEditUser.mutate(newUserInfo)
  }

  const EditUserInitialValues: UserEditFormInterface = {
    name: userToEditInfo.nombres ?? '',
    lastName: userToEditInfo.apellidos ?? '',
    phone: userToEditInfo.telefono ?? '',
    personalEmail: userToEditInfo.correo_personal ?? '',
  }

  return (
    <div className="container-fluid p-0 sgp-my-account">
      <section className="sgp-bg-light-white">
        <div className="py-5 ">
          <div className="row mb-4">
            <div className="col-12 text-center">
              <img src="src/assets/edit-user.svg" alt="avatar" className="sgp-my-account__avatar" />
            </div>
          </div>
          <div className="row">
            <div className="col-12 text-center">
              <p className="sgp-lb--h1 mb-1">{userToEditInfo.nombres} {userToEditInfo.apellidos} - {userToEditInfo.cod_universitario}</p>
              <p className="sgp-lb--h4 mb-0">{userToEditInfo.correo_est}</p>
              <p className="sgp-lb--h4 mb-1">C.C {userToEditInfo.cedula}</p>
              <p className="badge rounded-pill sgp-bg-orange-95 sgp-lb--h5 sgp-lower-text">{userInfo.role}</p>
            </div>
          </div>
          <div className="row d-flex justify-content-center align-items-center" >
            <div className="col-12 col-md-8 col-lg-6 col-xl-5" >
              <div className="card sgp-bg-gray-20 text-white sgp-card">
                <div className="card-body p-5 text-center">
                  <div className="mb-md-5 mt-md-4 pb-5">
                    <h2 className="sgp-lb--h1">{t("user.userInfo")}</h2>
                    <p className="text-white-50 mb-5 sgp-text-white">{t("user.userEditDescription")}</p>
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

export default EditUser;