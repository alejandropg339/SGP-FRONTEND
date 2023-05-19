import { UpdateMyAccountRequest } from '../commons/interfaces/myAccount.interface';
import { RolesResponseInterface, UserRoleResponseInterface } from '../commons/interfaces/roles.interface';
import { AllUsersResponseInterface, UserDeleteResponseInterface, UserResponseDataInterface } from '../commons/interfaces/user.interface';
import ApiAuthClient from './clients/apiAuthClient';
import { urlParser } from './endpoints/endpoints';
import { CreateProjectRequest, CreateProjectResponse, ProjectsResponse } from '../modules/projects/interfaces/projects.interface';
import { ProjectTypesInterface } from '../modules/projects/interfaces/projectTypes.interface';

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
        updateUserRoles(userId: string, role: string): Promise<UserRoleResponseInterface> {
            return ApiAuthClient.put(urlParser(url).userRole(userId), { tipo_usuario: role })
        },
        deleteUser(userId: string): Promise<UserDeleteResponseInterface> {
            return ApiAuthClient.delete(urlParser(url).user(userId))
        },
        activateUser(userId: string): Promise<UserDeleteResponseInterface> {
            return ApiAuthClient.put(urlParser(url).userActivate(userId))
        },
        updateMyAccount(request: UpdateMyAccountRequest, numberId: string): Promise<any> {
            return ApiAuthClient.put(urlParser(url).myAccount(numberId), request)
        }
    },
    projects: {
        createProject(request: CreateProjectRequest): Promise<CreateProjectResponse> {
            return ApiAuthClient.post(urlParser(url).project, request)
        },
        getProjectTypes(): Promise<ProjectTypesInterface> {
            return ApiAuthClient.get(urlParser(url).projectTypes)
        },
        getProjects(): Promise<ProjectsResponse> {
            return ApiAuthClient.get(urlParser(url).project)
        }
    }
};

export default ApiAuthRepository;
