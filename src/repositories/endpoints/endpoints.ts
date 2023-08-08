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
        projectUpdateStatus: (projectId: string) =>  `${endpoint}/project/update-status/${projectId}`,
        projectId: (projectId: string) =>  `${endpoint}/project/${projectId}`,
        projectApprove: (projectId: string) => `${endpoint}/project/approve/${projectId}`,
        projectTypes: `${endpoint}/project/types/all`,
        projectActivate:(projectId: string) =>  `${endpoint}/project/activate/${projectId}`,
        projectParticipant: (projectId: string) => `${endpoint}/participant/${projectId}`,
        projectProduct: (projectId: string) => `${endpoint}/project/product/${projectId}`,
        projectProducts: (projectId: string) => `${endpoint}/project/product/all/${projectId}`,
        productComment: (productId: string) => `${endpoint}/project/product/comment/${productId}`,
        programs: `${endpoint}/program`,
    }
}