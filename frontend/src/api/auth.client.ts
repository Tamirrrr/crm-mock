import ApiClient from "@/api/api.client.ts";
import {
    LoginRequest,
    LoginResponse,
    RegisterRequest,
    RegisterResponse,
    UserInformationResponse
} from "@/interfaces/api/auth.interface.ts";
import {BaseResponse} from "@/interfaces/api/api.interface.ts";

export default new class AuthClient {
    async login(request: LoginRequest): Promise<BaseResponse<LoginResponse>> {
        return await ApiClient
            .post('/auth/login', request) as BaseResponse<LoginResponse>;
    }

    async register(request: RegisterRequest): Promise<BaseResponse<RegisterResponse>> {
        return await ApiClient
            .post('/auth/register', request) as BaseResponse<RegisterResponse>;
    }

    async information(): Promise<BaseResponse<UserInformationResponse>> {
        return await ApiClient
            .get('/auth/information') as BaseResponse<UserInformationResponse>;
    }
}