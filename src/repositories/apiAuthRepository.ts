import { LoginRequestInterface, LoginResponseInterface } from '../login/interfaces/LoginService.interface';
import ApiNoAuthClient from './clients/apiNoAuthClient';
import { urlParser } from './endpoints/endpoints';

const url = import.meta.env.VITE_API;

const ApiNoAuthRepository = {
    authentication: {
        login(body: LoginRequestInterface): Promise<LoginResponseInterface> {
            return ApiNoAuthClient.post(urlParser(url).login, body)
        }
    }
}

export default ApiNoAuthRepository;