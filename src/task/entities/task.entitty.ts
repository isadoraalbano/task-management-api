import { Task } from '@prisma/client';

export class TaskEntity implements Task {
    id: number;
    userId: number;
    title: string;
    description: string;
    status: string;
    createdAt: Date;
    finishIn: Date;
}
