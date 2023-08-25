import { LayoutFormProjects } from "../../../../commons/layout/LayoutFormProjects";
import { handleActionModal } from "../../../../commons/helpers/modalManagement";
import { RolesForm } from "../../components/RolesForm.component";
import { RolesFormInterface } from "../../interfaces/RolesForm.iterface";
import { useNavigate } from "react-router-dom";
import { CommonRoutesEnum } from "../../../../enums/commonRoutes.enum";
import { RepositoryFactory } from "../../../../repositories/repositoryFactory";
import { useMutation } from "@tanstack/react-query";
import { useGlobal } from "../../../../store/global.store";
import { CreateRoleResponseInterface } from "../../../../commons/interfaces/roles.interface";

const createNewRole = async (formValues: RolesFormInterface) => await RepositoryFactory.RepositoryApiAuth.roles.createRole(formValues);

const Roles = () => {
  const { setLoading } = useGlobal();

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

  const submit = async (formValues: RolesFormInterface) => {
    console.log(formValues)
    handleCreateRole([formValues])
  }

  const { mutate: handleCreateRole } = useMutation<CreateRoleResponseInterface, any, [RolesFormInterface]>(([roles]) => createNewRole(roles), {
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: () => {
      handleActionModal('success', 'Rol creado!', 'El rol fue creado exitosamente!.')
      navigate(CommonRoutesEnum.Home)
    },
    onError: () => {
      handleActionModal('error', 'Error!', 'Hemos tenido un error a la hora de crear el rol por favor intentalo de nuevo y si el error persiste contacta a soporte.')

    },
    onSettled: () => {
      setLoading(false);
    }
  })

  return (
    <LayoutFormProjects 
    title="Añadir rol"
    description="Al crear un rol es posible seleccionar los privilegios que tendrán los usuarios en cada uno de los módulos del sistema, a continuación encontrará una descripción de cada uno de los privilegios que se podrán dar por cada módulo:"
    imgSrc="https://tecnosoft.ingusb.com/img/add-user.svg"
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