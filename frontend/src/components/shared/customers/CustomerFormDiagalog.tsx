import React, {useEffect, useMemo, useState} from "react";
import {Customer} from "@/interfaces/customer.interface.ts";
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle,} from "@/components/ui/dialog"
import {Button} from "@/components/ui/button.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Label} from "@/components/ui/label.tsx";
import CustomersClient from "@/api/customers.client.ts";
import {useToast} from "@/components/ui/use-toast.ts";
import {BaseResponse} from "@/interfaces/api/api.interface.ts";
import {CreateCustomerResponse, UpdateCustomerResponse} from "@/interfaces/api/customers.interface.ts";

export interface CustomerFormDialogProps {
    customer?: Customer;
    isOpen?: boolean;
    onUpdated?: (customer: Customer) => void | Promise<void>;
    onCreated?: (customer: Customer) => void | Promise<void>;
    onClose?: () => void;
}

const CustomerFormDialog = (props: CustomerFormDialogProps) => {
    const [form, setForm] = useState<Customer>(props.customer ?
        props.customer : {} as Customer);

    const {toast} = useToast();

    useEffect(() => {
        if (props.customer) {
            setForm(props.customer);
        }
    }, [props.customer]);

    const isEditing: boolean = useMemo<boolean>((): boolean => {
        return !!props.customer;
    }, [props.customer]);

    const title: string = useMemo<string>((): string => {
        return isEditing && props.customer ? `Editing Customer #${props.customer.id}` : "Creating Customer";
    }, [isEditing]);

    const buttonTitle: string = useMemo<string>((): string => {
        return isEditing ? "Save" : "Create";
    }, [isEditing]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {id, value} = e.target;
        setForm((prevForm) => ({
            ...prevForm,
            [id]: value,
        }));
    };

    const handleOpenChange = (open: boolean) => {
        if (!open) {
            if (props.onClose) {
                props.onClose();
            }
        }
    }

    const submitForm = async () => {
        if (isEditing && !props?.customer?.id) {
            toast({
                title: "Error",
                description: "Invalid customer ID. Please try again later.",
                variant: "destructive"
            })
            return;
        }
        try {
            if (isEditing) {
                const response: BaseResponse<UpdateCustomerResponse> = await CustomersClient.update(props.customer.id, {
                    email: form.email,
                    name: form.name,
                    address: form.address,
                    phone: form.phone,
                });
                if (props.onUpdated) {
                    await props.onUpdated(response.data);
                }
            } else {
                const response: BaseResponse<CreateCustomerResponse> = await CustomersClient.create({
                    email: form.email,
                    name: form.name,
                    address: form.address,
                    phone: form.phone,
                });
                if (props.onCreated) {
                    await props.onCreated(response.data);
                }
            }
            handleOpenChange(false);
        } catch (error) {
            toast({
                title: "Error",
                description: (error as any).message || "An error occurred.",
                variant: "destructive"
            });
        }
    }

    return (
        <Dialog open={props.isOpen} onOpenChange={handleOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">
                            Email
                        </Label>
                        <Input id="email" value={form.email} onChange={handleInputChange} className="col-span-3"/>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">
                            Name
                        </Label>
                        <Input id="name" value={form.name} onChange={handleInputChange} className="col-span-3"/>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">
                            Address
                        </Label>
                        <Input id="address" value={form.address} onChange={handleInputChange} className="col-span-3"/>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">
                            Phone
                        </Label>
                        <Input id="phone" value={form.phone} onChange={handleInputChange} className="col-span-3"/>
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={submitForm}>{buttonTitle}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default CustomerFormDialog;