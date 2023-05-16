import { handleActionModal } from "../../../commons/helpers/modalManagagemnt"

export const useDeleteUser = () => {
    const deleteUser = () => {
        handleActionModal('warning', '¿Estás seguro?', 'El usuario se eliminará de forma permanente', true, true, 'Eliminar', 'Cancelar', async () => { console.log('Deleted')})
    }
    return {
        deleteUser
    }
}