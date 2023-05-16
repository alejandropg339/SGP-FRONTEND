export const urlParser = (endpoint: string) => {
    return {
        login: `${endpoint}/user/login`,
        enrollment: `${endpoint}/user`,
        users: `${endpoint}/user/all`,
        user:(userId: string) =>  `${endpoint}/user/${userId}`,
        roles: `${endpoint}/user/rol/all`,
        userRole:(userId: string) => `${endpoint}/user/rol/${userId}`,
    }
}