import {Customer} from "@/interfaces/customer.interface.ts";
import {ColumnDef} from "@tanstack/react-table";
import {generateColumns} from "@/components/shared/tables/Columns.tsx";
import {ColumnsOptions} from "@/interfaces/datatable/columns.interface.ts";

export function columns(options?: ColumnsOptions<Customer>): ColumnDef<Customer>[] {
    const baseColumns: ColumnDef<Customer>[] = [
        {
            accessorKey: "id",
            header: "ID",
        },
        {
            accessorKey: "name",
            header: "Name",
        },
        {
            accessorKey: "address",
            header: "Address",
        },
        {
            accessorKey: "phone",
            header: "Phone",
        },
        {
            accessorKey: "email",
            header: "Email",
        },
        {
            accessorKey: "createdAt",
            header: "Created At",
        },
        {
            accessorKey: "updatedAt",
            header: "Updated At",
        },
    ]
    return generateColumns<Customer>(baseColumns, options);
}