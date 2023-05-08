import { AllUsersResponseInterface } from '../commons/interfaces/user.interface';
import ApiAuthClient from './clients/apiAuthClient';
import { urlParser } from './endpoints/endpoints';

const url = import.meta.env.VITE_API;

const ApiAuthRepository = {
    users: {
        getUsers(): Promise<AllUsersResponseInterface> {
        return ApiAuthClient.get(urlParser(url).users)
        }
    }
}

export default ApiAuthRepository;