export const urlParser = (endpoint: string) => {
    return {
        login: `${endpoint}/user/login`,
        enrollment: `${endpoint}/user`,
        user:(userId: string) =>  `${endpoint}/user/${userId}`,
        users: `${endpoint}/user/all`
    }
}