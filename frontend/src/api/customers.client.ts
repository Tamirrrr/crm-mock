import ApiClient from "@/api/api.client.ts";
import {BaseResponse} from "@/interfaces/api/api.interface.ts";
import {
    CreateCustomerRequest,
    CreateCustomerResponse,
    GetCustomerResponse,
    GetCustomersResponse,
    UpdateCustomerRequest,
    UpdateCustomerResponse
} from "@/interfaces/api/customers.interface.ts";

export default new class CustomersClient {
    async create(request: CreateCustomerRequest): Promise<BaseResponse<CreateCustomerResponse>> {
        return await ApiClient
            .post('/customers', request) as BaseResponse<CreateCustomerResponse>;
    }

    async getAll(): Promise<BaseResponse<GetCustomersResponse>> {
        return await ApiClient
            .get('/customers') as BaseResponse<GetCustomersResponse>;
    }

    async get(customerId: number): Promise<BaseResponse<GetCustomerResponse>> {
        return await ApiClient
            .get(`/customers/${customerId}`) as BaseResponse<GetCustomerResponse>;
    }

    async update(customerId: number, request: UpdateCustomerRequest): Promise<BaseResponse<UpdateCustomerResponse>> {
        return await ApiClient
            .put(`/customers/${customerId}`, request) as BaseResponse<UpdateCustomerResponse>;
    }

    async delete(customerId: number): Promise<void> {
        return await ApiClient
            .delete(`/customers/${customerId}`);
    }
}