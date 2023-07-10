import { useMutation, useQuery } from '@tanstack/react-query';
import { RepositoryFactory } from '../../../repositories/repositoryFactory';
import { CreateProjectRequest, UpdateProjectRequest, UpdateProjectResponse } from '../interfaces/projects.interface';
import { useEffect, useState } from 'react';
import { handleActionModal, handleModal } from '../../../commons/helpers/modalManagement';
import { useErrorManagement } from '../../../commons/hooks/UseErrorManagement';
import { useNavigate, useParams } from 'react-router-dom';
import { useGlobal } from '../../../store/global.store';
import { CommonRoutesEnum } from '../../../enums/commonRoutes.enum';
import { CreateProjectForm } from '../interfaces/createProjectForm.interface';
import { responseToForm } from '../utils/requestProject';
import { createProjectInitialValues } from '../config/createProjectFormValidations.config';
import { useSearchProject } from './useSearchProject';
import useProjectStore from '../stores/useProjectStore';

const createProject = async (project: CreateProjectRequest) => await RepositoryFactory.RepositoryApiAuth.projects.createProject(project);
const updateProject = async (project: UpdateProjectRequest, projectId: string) => await RepositoryFactory.RepositoryApiAuth.projects.updateProject(project, projectId);
const findProject = async (projectId: string) => await RepositoryFactory.RepositoryApiAuth.projects.getProject(projectId);
const deleteProject = async (userId: string) => await RepositoryFactory.RepositoryApiAuth.projects.deleteProject(userId);
const activateProject = async (userId: string) => await RepositoryFactory.RepositoryApiAuth.projects.activateProject(userId);

export const useProject = () => {
    const errorManagement = useErrorManagement();
    const navigate = useNavigate();
    const { setLoading } = useGlobal();
    const { refetch } = useSearchProject();
    const [initialValues, setInitialValues] = useState<CreateProjectForm>(createProjectInitialValues);
    const { idProject } = useParams();
    const dispatch = useProjectStore((state) => state.dispatch);
    const { projectsData } = useProjectStore();

    const { mutate, isLoading } = useMutation({
        mutationFn: createProject,
        onSuccess: () => {
            handleModal('success', 'Proceso exitoso!', 'Se ha creado el proyecto!', true);
            navigate(CommonRoutesEnum.SearchProject);
        },
        onError: (error: any) => {
            if (error?.status === '0' && error?.msg) {
                handleModal('error', 'Oh no!', error.msg);
            } else {
                errorManagement(error);
            }
        },
    });

    const { mutate: mutateUpdate, isLoading: isLoadingUpdate } = useMutation<UpdateProjectResponse, any, [UpdateProjectRequest, string]>(([request, projectId]: [UpdateProjectRequest, string]) => updateProject(request, projectId), {
        onSuccess: () => {
            handleModal('success', 'Proceso exitoso!', 'El proyecto ah sido actualizado exitosamente');
            navigate(CommonRoutesEnum.SearchProject);
        },
        onError: (error: any) => {
            if (error?.status === '0' && error?.msg) {
                handleModal('error', 'Oh no!', error.msg);
            } else {
                errorManagement(error);
            }
        },
    });

    const { isLoading: loadingProject } = useQuery({
        queryKey: ['project', idProject],
        queryFn: () => findProject(idProject ??''),
        onSuccess: (data) => {
            console.log('settet', data, idProject)
            dispatch({ type: 'setProjectData', projectsData: data.data })
            setInitialValues(responseToForm(data.data))
        },
        onError: (error: any) => {
            if (error.status === '0') {
                handleModal('error', 'Oops!', 'Algo salió mal, por favor intenta de nuevo más tarde', true, false, false);
                navigate(CommonRoutesEnum.SearchProject);
            } else {
                errorManagement(error);
            }
        },
        // enabled: idProject !== Actions.Create,
    });

    const handleDelete = useMutation({
        mutationFn: deleteProject,
        onSuccess: () => {
            handleModal('success', 'Proyecto eliminado', 'El proyecto se eliminó correctamente', true, false)
            refetch();
        }, onError: (error: any) => {
            if (error?.status === '0' && error?.msg) {
                handleModal('error', 'Oh no!', error.msg);
            } else {
                errorManagement(error)
            }
        }
    })

    const {mutate: mutateActivateProject, isLoading: isLoadingActivateProject} = useMutation({
        mutationFn: activateProject,
        onSuccess: () => {
            handleModal('success', 'Proyecto activado', 'El proyecto se activo correctamente', true, false)
            refetch();
        }, onError: (error: any) => {
            if (error?.status === '0' && error?.msg) {
                handleModal('error', 'Oh no!', error.msg);
            } else {
                errorManagement(error)
            }
        }
    })

    const deleteProjectAction = (userId: string) => {
        handleActionModal('warning', '¿Estás seguro?', 'El proyecto se eliminará de forma permanente', true, true, 'Eliminar', 'Cancelar', () => { handleDelete.mutate(userId)})
    }

    useEffect(() => {
        setLoading(isLoading);
        setLoading(handleDelete.isLoading);
        setLoading(isLoadingActivateProject);
    }, [isLoading, handleDelete.isLoading, isLoadingActivateProject]);

    useEffect(() => {
        setLoading(loadingProject);
    }, [loadingProject]);

    useEffect(() => {
        setLoading(isLoadingUpdate);
    }, [isLoadingUpdate]);

    return {
        mutate,
        mutateUpdate,
        initialValues,
        loadingProject,
        deleteProjectAction,
        mutateActivateProject,
        projectsData,
        idProject
    };
};
