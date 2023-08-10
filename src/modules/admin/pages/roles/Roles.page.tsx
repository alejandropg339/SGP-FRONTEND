import { useTranslation } from "react-i18next";
import { LayoutFormProjects } from "../../../../commons/layout/LayoutFormProjects";
import { handleActionModal } from "../../../../commons/helpers/modalManagement";
import { RolesForm } from "../../components/RolesForm.component";
import { RolesFormInterface } from "../../interfaces/RolesForm.iterface";
import { useNavigate } from "react-router-dom";
import { CommonRoutesEnum } from "../../../../enums/commonRoutes.enum";

const Roles = () => {
  const { t } = useTranslation('global');

  const initialValues: RolesFormInterface = {
    roleName: '',
    usersRole:  '',
    programsRole:  '',
    facultiesRole:  '',
    eventsRole:  '',
    projectsRole:  '',
    hotbedRole:  '',
    reportsRole:  '',
    rolesRole:  '',
  }
  const navigate = useNavigate()
//   const { idProject } = useParams();

  const submit = async (formValues: RolesFormInterface) => {
    console.log(formValues)
    handleActionModal('success', 'Rol añadido correctamente')
    navigate(CommonRoutesEnum.Users)
    // console.log(formValues)
  }

  return (
    <LayoutFormProjects 
    title="Añadir rol"
    description="Al crear un rol es posible seleccionar los privilegios que tendrán los usuarios en cada uno de los módulos del sistema, a continuación encontrará una descripción de cada uno de los privilegios que se podrán dar por cada módulo:"
    imgSrc="add-user.svg"
    >
      <p className="text-white-50 mb-5 sgp-text-white mb-2">
        <strong className="sgp-text-orange-50">Escritura: </strong>El usuario tendra la posiblidad de crear, editar y eliminar información dentro del módulo.
      </p>
      <p className="text-white-50 mb-5 sgp-text-white mb-2">
        <strong className="sgp-text-orange-50">Lectura: </strong>El usuario solo podra ver la información que este publica y unicamente podrá editar y modificar los proyectos, eventos o semilleros en los que sea uno de los participantes.
      </p>
      <p className="text-white-50 mb-5 sgp-text-white mb-2">
        <strong className="sgp-text-orange-50">Restringido: </strong>El usuario NO tendra acceso de lectura y escritura en ningua de los modulos.
      </p>
      <RolesForm initialValues={initialValues} submit={submit}/>
    </LayoutFormProjects>
  )
}

export default Roles;