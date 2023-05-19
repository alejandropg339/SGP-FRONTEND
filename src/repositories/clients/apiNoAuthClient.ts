import axios, { AxiosRequestHeaders } from 'axios';

const ApiNoAuthClient = axios.create();

ApiNoAuthClient.interceptors.request.use(
    (config) => {
        config.headers = {
            'Content-Type': 'application/json',
        } as AxiosRequestHeaders
        return config;
    }, (error) => {
        return Promise.reject(error);
    }
);

ApiNoAuthClient.interceptors.response.use(
    (config) => {
        const { status } = config.data;
        if(!status || config.data.status === '1') {
            return config.data;
        } else {
            return Promise.reject(config.data);
        }
    }, (error) => {
        return Promise.reject(error.response.data);
    }
);

export default ApiNoAuthClient;