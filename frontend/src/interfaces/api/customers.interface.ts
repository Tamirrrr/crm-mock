import {Customer} from "@/interfaces/customer.interface.ts";

export interface CreateCustomerRequest {
    email: string;
    name: string;
    address: string;
    phone: string;
}

export interface CreateCustomerResponse extends Customer {

}

export type UpdateCustomerRequest = Partial<CreateCustomerRequest>;

export interface UpdateCustomerResponse extends Customer {

}

export type GetCustomersResponse = Customer[];

export type GetCustomerResponse = Customer;