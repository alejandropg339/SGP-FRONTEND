export const urlParser = (endpoint: string) => {
    return {
        login: `${endpoint}/user/login`,
        enrollment: `${endpoint}/user`,
        users: `${endpoint}/user/all`,
        user:(userId: string) =>  `${endpoint}/user/${userId}`,
    }
}