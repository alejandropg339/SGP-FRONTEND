import { useMutation } from "@tanstack/react-query"
import { handleModal } from "../../../commons/helpers/modalManagement"
import { useErrorManagement } from "../../../commons/hooks/UseErrorManagement"
import { UpdateMyAccountRequest } from "../../../commons/interfaces/myAccount.interface"
import { RepositoryFactory } from "../../../repositories/repositoryFactory"

const updateMyAccount = async (request: UpdateMyAccountRequest, numberId: string) => {
    return await RepositoryFactory.RepositoryApiAuth.users.updateMyAccount(request, numberId)
}
export const useMyAccount = () =>{
    const errorManagement = useErrorManagement();

    const handleUpdateMyAccount = useMutation<void, any, [UpdateMyAccountRequest, string]>(
        ([request, userId]: [UpdateMyAccountRequest, string]) => updateMyAccount(request, userId),
        {
          onSuccess: () => {
            handleModal('success', 'Proceso exitoso!', 'El usuario se ha actualizado correctamente');
          },
          onError: (error: any) => {
            if (error?.status === '0' && error?.msg) {
              handleModal('error', 'Oh no!', error.msg);
            } else {
              errorManagement(error);
            }
          },
        }
      );

    return {
        handleUpdateMyAccount
    }
}