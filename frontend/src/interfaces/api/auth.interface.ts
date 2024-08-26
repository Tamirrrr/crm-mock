import {User} from "@/interfaces/user.interface.ts";

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    accessToken: string;
    refreshToken: string;
    user: User;
}

export interface RegisterRequest {
    email: string;
    password: string;
}

export interface RegisterResponse {
    accessToken: string;
    refreshToken: string;
    user: User;
}

export interface UserInformationResponse {
    user: User;
}