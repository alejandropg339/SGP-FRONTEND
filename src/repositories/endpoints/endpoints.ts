export const urlParser = (endpoint: string) => {
    return {
        login: `${endpoint}/login`,
        enrollment: `${endpoint}/user`,
        users: `${endpoint}/user`,
        user:(userId: string) =>  `${endpoint}/user/${userId}`,
        userActivate:(userId: string) =>  `${endpoint}/user/activate/${userId}`,
        roles: `${endpoint}/role`,
        userRole:(userId: string) => `${endpoint}/role/${userId}`,
        myAccount: (numberId: string) => `${endpoint}/user/my-account/${numberId}`,
        project: `${endpoint}/project`,
        projectId: (projectId: string) =>  `${endpoint}/project/${projectId}`,
        projectApprove: (projectId: string) => `${endpoint}/project/approve/${projectId}`,
        projectTypes: `${endpoint}/project/types/all`,
    }
}