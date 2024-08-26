import {DefaultLayout} from "@/layouts/DefaultLayout.tsx";
import {observer} from "mobx-react-lite";
import {useEffect, useState} from "react";
import CustomersClient from "@/api/customers.client.ts";
import {Customer} from "@/interfaces/customer.interface.ts";
import {useToast} from "@/components/ui/use-toast.ts";
import {DataTable} from "@/components/shared/tables/DataTable.tsx";
import {columns} from "@/components/shared/tables/columns/Customers.tsx";
import {BaseResponse} from "@/interfaces/api/api.interface.ts";
import {GetCustomersResponse} from "@/interfaces/api/customers.interface.ts";
import {CustomersTableActions} from "@/enums/customers/table-actions.enum.ts";
import CustomerFormDialog from "@/components/shared/customers/CustomerFormDiagalog.tsx";
import {Button} from "@/components/ui/button.tsx";

const CustomersPage = observer(() => {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(true);
    const [isFormDialogOpen, setIsFormDialogOpen] = useState<boolean>(false);
    const {toast} = useToast();

    const fetchCustomers = async () => {
        try {
            const response: BaseResponse<GetCustomersResponse> = await CustomersClient.getAll();
            setCustomers(response.data);
        } catch (error) {
            toast({
                title: "Error",
                description: (error as any).message || "An error occurred.",
                variant: "destructive"
            });
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    const onCreateClick = () => {
        setIsFormDialogOpen(true);
        setSelectedCustomer(undefined);
    }

    const onActionClick = async (action: string, row: Customer): Promise<void> => {
        switch (action as CustomersTableActions) {
            case CustomersTableActions.DELETE:
                try {
                    await CustomersClient.delete(row.id);
                    toast({
                        title: "Success",
                        description: `Customer #${row.id} deleted successfully.`,
                    });
                    await fetchCustomers();
                } catch (error) {
                    toast({
                        title: "Error",
                        description: (error as any).message || "An error occurred.",
                        variant: "destructive"
                    });
                }
                break;
            case CustomersTableActions.EDIT:
                setSelectedCustomer(row);
                setIsFormDialogOpen(true);
                break;
        }
    }

    const onDialogClose = (): void => {
        setSelectedCustomer(undefined);
        setIsFormDialogOpen(false);
    }

    const onSuccessDialogSubmit = async (customer: Customer): Promise<void> => {
        setCustomers((prevCustomers) => {
            if (prevCustomers.find(c => c.id === customer.id)) {
                return prevCustomers.map(c => c.id === customer.id ? customer : c);
            } else {
                return [...prevCustomers, customer];
            }
        });
        toast({
            title: "Success",
            description: `Operation has been completed successfully.`,
        });
    }

    return (
        <DefaultLayout>
            <div className="flex flex-col gap-2">
                <div className="flex justify-between">
                    <h1>Customers</h1>
                    <Button size="sm" onClick={onCreateClick}>Create</Button>
                </div>
                {
                    loading ? <p>Loading...</p> :
                        <DataTable columns={columns({
                            actionOptions: {
                                enabled: true,
                                actions: Object.values(CustomersTableActions),
                                onActionClick
                            }
                        })} data={customers}></DataTable>
                }
            </div>
            <CustomerFormDialog isOpen={isFormDialogOpen}
                                onClose={onDialogClose}
                                customer={selectedCustomer}
                                onCreated={onSuccessDialogSubmit}
                                onUpdated={onSuccessDialogSubmit}
            ></CustomerFormDialog>
        </DefaultLayout>
    );
});

export default CustomersPage;