import axios, { AxiosRequestHeaders } from 'axios';

const ApiAuthClient = axios.create();

ApiAuthClient.interceptors.request.use(
    (config) => {
        config.headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,

        } as AxiosRequestHeaders
        return config;
    }, (error) => {
        return Promise.reject(error);
    }
);

ApiAuthClient.interceptors.response.use(
    (config) => {
        const { status, data = '' } = config.data;
        if(!status || status === '1') {
            return data;
        } else {
            return Promise.reject(data);
        }
    }, (error) => {
        return Promise.reject(error);
    }
);