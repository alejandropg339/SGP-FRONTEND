import { RolesResponseInterface, UserRoleResponseInterface } from '../commons/interfaces/roles.interface';
import { AllUsersResponseInterface, UserDeleteResponseInterface, UserResponseDataInterface } from '../commons/interfaces/user.interface';
import ApiAuthClient from './clients/apiAuthClient';
import { urlParser } from './endpoints/endpoints';

const url = import.meta.env.VITE_API;

const ApiAuthRepository = {
    users: {
        getUsers(): Promise<AllUsersResponseInterface> {
            return ApiAuthClient.get(urlParser(url).users);
        },
        updateUser(user: Partial<UserResponseDataInterface>): Promise<RolesResponseInterface> {
            return user.cedula ? ApiAuthClient.put(urlParser(url).user(user.cedula), user) : Promise.reject({status: '0', msg: 'Number id is required', data: null});
        },
        getRoles(): Promise<RolesResponseInterface> {
            return ApiAuthClient.get(urlParser(url).roles)
        },
        getUserRole(userId: string): Promise<UserRoleResponseInterface> {
            return ApiAuthClient.get(urlParser(url).userRole(userId))
        },
        deleteUser(userId: string): Promise<UserDeleteResponseInterface> {
            return ApiAuthClient.delete(urlParser(url).user(userId))
        }
    },
};

export default ApiAuthRepository;
