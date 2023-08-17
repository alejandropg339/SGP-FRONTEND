import { UpdateMyAccountRequest } from '../commons/interfaces/myAccount.interface';
import { CreateRoleRequestInterface, CreateRoleResponseInterface, RolesResponseInterface, UserRoleResponseInterface } from '../commons/interfaces/roles.interface';
import { AllUsersResponseInterface, UserDeleteResponseInterface, UserResponseDataInterface } from '../commons/interfaces/user.interface';
import ApiAuthClient from './clients/apiAuthClient';
import { urlParser } from './endpoints/endpoints';
import { ActivateProjectResponse, CreateProjectRequest, CreateProjectResponse, DeleteProjectResponse, ProjectResponse, ProjectsResponse, UpdateProjectRequest, UpdateProjectResponse } from '../modules/projects/interfaces/projects.interface';
import { ProjectTypesInterface } from '../modules/projects/interfaces/projectTypes.interface';
import { AddParticipantResponse, DeleteParticipantsResponse, ParticipantFormInterface, ParticipantsResponse } from '../modules/projects/interfaces/participant.interface';
import { AddQualificationFormInterface } from '../modules/projects/interfaces/addQualificationForm.interface';
import { DeleteProductResponseInterface, NewProductFormInterface, NewProductResponseInterface } from '../modules/projects/interfaces/product.interface';
import { ProductsResponseInterface } from '../modules/projects/interfaces/products.interface';
import { AddCommentResponseInterface, ProductComments } from '../modules/projects/interfaces/addComment.interface';
import { ProgramsResponse } from '../commons/interfaces/programs.interface';
import { RolesFormInterface } from '../modules/admin/interfaces/RolesForm.iterface';

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
        updateProject(request: UpdateProjectRequest, projectId: string): Promise<UpdateProjectResponse> {
            return ApiAuthClient.put(urlParser(url).projectId(projectId), request)
        },
        updateProjectStatus(status: string , projectId: string): Promise<UpdateProjectResponse> {
            const requestTransformed = {
                estado: status
            }
            return ApiAuthClient.put(urlParser(url).projectUpdateStatus(projectId), requestTransformed)
        },
        getProjectTypes(): Promise<ProjectTypesInterface> {
            return ApiAuthClient.get(urlParser(url).projectTypes)
        },
        getProjects(): Promise<ProjectsResponse> {
            return ApiAuthClient.get(urlParser(url).project)
        },
        getProject(projectId: string): Promise<ProjectResponse> {
            return ApiAuthClient.get(urlParser(url).projectId(projectId))
        },
        deleteProject(projectId: string): Promise<DeleteProjectResponse> {
            return ApiAuthClient.delete(urlParser(url).projectId(projectId))
        },
        activateProject(projectId: string): Promise<ActivateProjectResponse> {
            return ApiAuthClient.put(urlParser(url).projectActivate(projectId))
        },
        addParticipant(projectId: string, request: ParticipantFormInterface): Promise<AddParticipantResponse> {
            const requestParsed = {
                usuario: request.userId,
                rol: request.role

            }
            return ApiAuthClient.post(urlParser(url).projectParticipant(projectId), requestParsed)
        },
        addQualification(projectId: string, request: AddQualificationFormInterface): Promise<AddParticipantResponse> {
            const requestTransformed = {
                retroalimentacion_final: request.retrospective,
                conclusiones: request.conclusions,
                nota: request.qualification
            }
            return ApiAuthClient.put(urlParser(url).projectApprove(projectId), requestTransformed)
        },
        addProjectProduct(projectId: string, request: NewProductFormInterface): Promise<NewProductResponseInterface> {
            const requestTransformed = new FormData();
            requestTransformed.append('titulo_producto', request.name);
            requestTransformed.append('tipo_producto', request.productType);
            if(request.file) {
                requestTransformed.append('file', request.file);
            } else {
                requestTransformed.append('url_repo', request.link);
            }
            return ApiAuthClient.post(urlParser(url).projectProduct(projectId), requestTransformed, { headers: { 'Content-Type': 'multipart/form-data' }})
        },
        
        getAllProjectProducts(projectId: string): Promise<ProductsResponseInterface> {
            return ApiAuthClient.get(urlParser(url).projectProducts(projectId))
        },

        addProductComment(productId: string, comment: string, userId: string): Promise<AddCommentResponseInterface> {
            return ApiAuthClient.post(urlParser(url).productComment(productId), { comentario: comment, usuario_id: userId })
        },
        getAllParticipants(projectId: string): Promise<ParticipantsResponse> {
            return ApiAuthClient.get(urlParser(url).participants(projectId))
        },
        deleteParticipant(projectId: string, request: {usuario: string}): Promise<DeleteParticipantsResponse> {
            return ApiAuthClient.delete(urlParser(url).participants(projectId), { data: request })
        },
        deleteProduct(productId: string): Promise<DeleteProductResponseInterface> {
            return ApiAuthClient.delete(urlParser(url).projectProduct(productId))
        },
        getProductComments(productId: string): Promise<ProductComments> {
            return ApiAuthClient.post(urlParser(url).productComment(productId))
        },
    },
    programs: {
        getPrograms(): Promise<ProgramsResponse> {
            return ApiAuthClient.get(urlParser(url).programs)
        }
    },
    roles: {
        createRole(formValues: RolesFormInterface): Promise<CreateRoleResponseInterface> {
            const request: CreateRoleRequestInterface = {
                tipo_usuario: formValues.roleName.toUpperCase(),
                USUARIOS: formValues.usersRole,
                PROGRAMAS: formValues.programsRole,
                FACULTADES: formValues.facultiesRole,
                EVENTOS: formValues.eventsRole,
                PROYECTOS: formValues.projectsRole,
                SEMILLEROS: formValues.hotbedRole,
                REPORTES: formValues.reportsRole,
                ROLES: formValues.rolesRole,
            }
            return ApiAuthClient.post(urlParser(url).newRole, request)
        }
    }
};

export default ApiAuthRepository;
