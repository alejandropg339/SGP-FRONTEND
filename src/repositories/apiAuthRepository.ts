import { AllUsersResponseInterface, UserResponseDataInterface } from '../commons/interfaces/user.interface';
import ApiAuthClient from './clients/apiAuthClient';
import { urlParser } from './endpoints/endpoints';

const url = import.meta.env.VITE_API;

const ApiAuthRepository = {
    users: {
        getUsers(): Promise<AllUsersResponseInterface> {
            return ApiAuthClient.get(urlParser(url).users);
        },
        updateUser(user: Partial<UserResponseDataInterface>): Promise<AllUsersResponseInterface> {
            return user.cedula ? ApiAuthClient.put(urlParser(url).user(user.cedula), user) : Promise.reject({status: '0', msg: 'Number id is required', data: null});
        },
    },
};

export default ApiAuthRepository;
