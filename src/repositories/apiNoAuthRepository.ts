import { EnrollmentRequestInterface, EnrollmentResponseInterface } from "../modules/enrollment/interfaces/EnrollmentService.interface";
import { LoginRequestInterface, LoginResponseInterface } from "../modules/login/interfaces/LoginService.interface";
import ApiNoAuthClient from "./clients/apiNoAuthClient";
import { urlParser } from "./endpoints/endpoints";

const url = import.meta.env.VITE_API;

const ApiNoAuthRepository = {
    authentication: {
        login(body: LoginRequestInterface): Promise<LoginResponseInterface> {
            return ApiNoAuthClient.post(urlParser(url).login, body)
        },
        enrollment(body: EnrollmentRequestInterface): Promise<EnrollmentResponseInterface> {
            return ApiNoAuthClient.post(urlParser(url).enrollment, body)
        }
    }
}

export default ApiNoAuthRepository;