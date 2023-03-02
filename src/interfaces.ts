export interface TaskItem {
    name: string;
    due_date: string;
    details: string;
    status: boolean;
}

export interface List {
    id: string;
    name: string;
    description: string;
    tasks: TaskItem[];
}

