import { StateCreator, create } from 'zustand';
import { ProjectsResponseData } from '../interfaces/projects.interface';
import { devtools } from 'zustand/middleware';
import { CreateProjectForm } from '../interfaces/createProjectForm.interface';

type State = {
    projectsData: Partial<ProjectsResponseData>;
    projectFormData: Partial<CreateProjectForm>;
    dispatch: (action: Action) => void;
};

type Actions = {
    setProjectData: () => void;
    getProjectFormData: () => ProjectsResponseData;
};

type Action = {
    type: keyof Actions;
    projectsData?: Partial<ProjectsResponseData>;
};

const projectReducer = (state: State, action: Action) => {
    switch (action.type) {
        case 'setProjectData':
            return { projectsData: action.projectsData };
        case 'getProjectFormData':
            return {  };
        default:
            return state;
    }
};

const useCountStore = create<State>(
    devtools((set) => ({
        projectsData: {},
        projectFormData: {},
        dispatch: (action: Action) => set((state) => projectReducer(state, action)),
    })) as StateCreator<State, [], any>
);

export default useCountStore;
