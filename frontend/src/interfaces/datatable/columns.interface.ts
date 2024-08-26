export interface ColumnsOptions<T> {
    actionOptions?: ColumnActionOptions<T>;
}

export interface ColumnActionOptions<T> {
    triggerText?: string;
    enabled: boolean;
    actions: string[];
    onActionClick: (action: string, row: T) => void | Promise<void>;
}