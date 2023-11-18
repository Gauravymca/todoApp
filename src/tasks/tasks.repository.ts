import { Repository } from "typeorm";
import { Task } from "./tasks.entity";
import { Injectable } from "@nestjs/common";
import { createTaskDto } from "./dto/create-task.dto";
import { TaskStatus } from "./task-status.enum";

@Injectable()
export class TasksRepository extends Repository<Task>{
    async createTask(createTaskDto: createTaskDto):Promise<Task>{
        const {tittle, description} = createTaskDto;
        const task:Task = this.create({
            tittle: tittle,
            description: description,
            status: TaskStatus.OPEN,
        });
        await this.save(task);
        return task;
    }
} 

