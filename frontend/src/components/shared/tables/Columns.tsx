import {ColumnDef} from "@tanstack/react-table";
import {ColumnActionOptions, ColumnsOptions} from "@/interfaces/datatable/columns.interface.ts";
import {MoreHorizontal} from "lucide-react"
import {Button} from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function generateColumns<T>(baseColumns: ColumnDef<T>[], options?: ColumnsOptions<T>): ColumnDef<T>[] {
    if (options?.actionOptions?.enabled) {
        baseColumns.push(prepareActionOptions<T>(options.actionOptions));
    }
    return baseColumns;
}


function prepareActionOptions<T>(options: ColumnActionOptions<T>): ColumnDef<T> {
    const triggerText: string = options.triggerText || "Open";
    return {
        id: "actions",
        header: "Actions",
        cell: ({row}) => {
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">{triggerText}</span>
                            <MoreHorizontal className="h-4 w-4"/>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator/>
                        {options.actions.map((action, index) => (
                            <DropdownMenuItem key={index}
                                              onClick={async () => await options.onActionClick(action, row.original as T)}>
                                {action}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        }
    };
}