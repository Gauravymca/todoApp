import { TaskStatus } from "src/tasks/task-status.enum";

export interface filterTaskDto{
    status?: TaskStatus;
    search?: string;
}
