import {Customer} from "@/interfaces/customer.interface.ts";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";

export interface CustomerCardProps {
    customer: Customer;
    onEdit?: () => void | Promise<void>;
    onDelete?: () => void | Promise<void>;
}

const CustomerCard = (props: CustomerCardProps) => {
    return (
        <Card>
            <CardHeader>
                <div className="flex justify-between">
                    <CardTitle>
                        Customer #{props.customer?.id} Details
                    </CardTitle>
                    <div className="flex gap-2">
                        <Button onClick={props.onEdit}>Edit</Button>
                        <Button variant="destructive" onClick={props.onDelete}>Delete</Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-2">
                    <div>
                        <strong>Name:</strong> {props.customer?.name}
                    </div>
                    <div>
                        <strong>Address:</strong> {props.customer?.address}
                    </div>
                    <div>
                        <strong>Phone:</strong> {props.customer?.phone}
                    </div>
                    <div>
                        <strong>Email:</strong> {props.customer?.email}
                    </div>
                    <div>
                        <strong>Created At:</strong> {props.customer?.createdAt}
                    </div>
                    <div>
                        <strong>Updated At:</strong> {props.customer?.updatedAt}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

export default CustomerCard;