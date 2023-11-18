import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { createTaskDto } from 'src/tasks/dto/create-task.dto';
import { filterTaskDto } from 'src/tasks/dto/filter-task.dto';
import { TasksRepository } from './tasks.repository';
import { Task } from './tasks.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TasksService {

    constructor(
        @InjectRepository(Task)
        private tasksRepository:TasksRepository,
    ){}

    async getAllTasks(filterTaskDto:filterTaskDto):Promise<Task[]>{
        const {search,status} = filterTaskDto;
        const query = this.tasksRepository.createQueryBuilder('task');


        if(status){
            query.andWhere('task.status = :status', {status});
        }

        if(search){
            query.andWhere('task.tittle LIKE :search OR task.description LIKE :search',{search:`%${search}%`});
        }

        const tasks = await query.getMany();
        return tasks;
    }

    // getAllTasks():Task[] {
    //     return this.tasks;
    // }

    async createTask(createTaskDto: createTaskDto): Promise<Task>{
        const {tittle, description} = createTaskDto;
        const task:Task = this.tasksRepository.create({
            tittle: tittle,
            description: description,
            status: TaskStatus.OPEN,
        });
        await this.tasksRepository.save(task);
        return task;
    }
    
    // createTask(createTaskDto : createTaskDto):Task {
    //     const {tittle, description} = createTaskDto;
    //     const task:Task = {
    //         id: uuid(),
    //         tittle,
    //         description,
    //         status: TaskStatus.OPEN,
    //     }
    //     this.tasks.push(task);
    //     return task;
    // }

    async getTaskById(id: string): Promise<Task>{
        const found = await this.tasksRepository.findOneBy({id:id});

        if(!found){
            throw new NotFoundException(`Task not found with id:${id}`);
        }

        return found;
    }

    // getFilteredTasks(filteredTask: filterTaskDto){
    //     const {status, search} = filteredTask;
    //     let tasks: Task[] = this.getAllTasks();
    //     if(status){
    //         tasks = this.tasks.filter((task)=>task.status===status);
    //     }
    //     if(search){
    //         tasks = this.tasks.filter((task)=>{
    //             return (task.tittle.includes(search)|| task.description.includes(search))
    //         })
    //     }
    //     return tasks;

    // }

    async deleteTaskById(id: string):Promise<void>{
        const result = await this.tasksRepository.delete(id);
        if(result.affected===0){
            throw new NotFoundException(`Task not found with id:${Object.values(id)}`);
        }
    }

    // deleteTaskById(id: string){
    //     const task = this.getAllTaskById(id);;
    //     this.tasks= this.tasks.filter((task)=>task.id!==id);
    //     return task;
    // }

    async updateTaskById(id:string,status:TaskStatus):Promise<Task>{
        const task = await this.getTaskById(id);
        task.status = status;
        await this.tasksRepository.save(task);
        return task;
    }

    // updateTaskById(id:string, status:TaskStatus){
    //     const task = this.getAllTaskById(id);
    //     task.status= status;
    //     return task;
    // }

}
