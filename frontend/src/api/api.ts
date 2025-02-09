import axios, {AxiosInstance, AxiosResponse} from 'axios';
import {AuthResponse, LoginRequest, SignUpRequest} from "../types/Auth.ts";

const apiClient: AxiosInstance = axios.create({
    baseURL: 'http://localhost:8080/music-spot/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const api = {
    authenticate(data: LoginRequest): Promise<AxiosResponse<AuthResponse>> {
        return apiClient.post('/auth/authenticate', data);
    },
    signUp(data: SignUpRequest): Promise<AxiosResponse<AuthResponse>> {
        return apiClient.post('/auth/signUp', data);
    },
};