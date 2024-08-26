import {DefaultLayout} from "@/layouts/DefaultLayout.tsx";
import {useNavigate, useParams} from "react-router-dom";
import {Customer} from "@/interfaces/customer.interface.ts";
import {useEffect, useState} from "react";
import {useToast} from "@/components/ui/use-toast.ts";
import CustomersClient from "@/api/customers.client.ts";
import CustomerCard from "@/components/shared/customers/CustomerCard.tsx";
import CustomerFormDialog from "@/components/shared/customers/CustomerFormDiagalog.tsx";

const CustomerPage = () => {
    const navigate = useNavigate();
    const {toast} = useToast();
    const {customerId} = useParams<{ customerId: string }>();
    const [loading, setLoading] = useState(true);
    const [customer, setCustomer] = useState<Customer | null>(null);
    const [isFormDialogOpen, setIsFormDialogOpen] = useState<boolean>(false);

    const handleFetchError = (error: any) => {
        toast({
            title: 'Error',
            description: error.message || 'An error occurred',
            variant: 'destructive',
        });
        navigate('/customers');
    }

    useEffect(() => {
        try {
            if (!customerId) {
                throw new Error('Invalid Path');
            }

            CustomersClient.get(+customerId).then((response) => {
                setCustomer(response.data);
                setLoading(false);
            }).catch((error) => {
                handleFetchError(error);
            })
        } catch (error) {
            handleFetchError(error);
        }
    }, []);

    const onDialogClose = () => {
        setIsFormDialogOpen(false);
    }

    const onEditClick = (): void => {
        setIsFormDialogOpen(true);
    }

    const onDeleteClick = async (): Promise<void> => {
        try {
            await CustomersClient.delete(customer?.id);
            toast({
                title: 'Success',
                description: 'Customer has been deleted successfully'
            });
            navigate('/customers');
        } catch (error) {
            toast({
                title: 'Error',
                description: `Failed to delete customer: ${(error as any).message}`
            })
        }
    }

    const onCustomerUpdated = (customer: Customer): void => {
        setCustomer(customer);
        toast({
            title: 'Success',
            description: `Customer details have been updated successfully.`
        });
    }

    return (
        <DefaultLayout>
            <div className="flex flex-col gap-2">
                {
                    loading ? (
                        <h2>Loading...</h2>
                    ) : <CustomerCard customer={customer as Customer} onEdit={onEditClick} onDelete={onDeleteClick}></CustomerCard>
                }
            </div>
            <CustomerFormDialog isOpen={isFormDialogOpen}
                                onClose={onDialogClose}
                                customer={customer as Customer}
                                onUpdated={onCustomerUpdated}
            ></CustomerFormDialog>
        </DefaultLayout>
    )
}

export default CustomerPage;