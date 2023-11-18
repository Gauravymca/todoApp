import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskStatus } from './task-status.enum';
import { createTaskDto } from 'src/tasks/dto/create-task.dto';
import { filterTaskDto } from 'src/tasks/dto/filter-task.dto';
import { Task } from './tasks.entity';
import { updateTaskStatusDto } from './dto/update-task-status.dto';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) { }

    @Get()
    getAllTasks(@Query() filterTaskDto:filterTaskDto):Promise<Task[]>{
        return this.tasksService.getAllTasks(filterTaskDto);
    }

    // @Get()
    // getAllTasks(@Query() filterKeys: filterTaskDto): Task[] {
    //     if(Object.keys(filterKeys).length===0){
    //         return this.tasksService.getAllTasks();
    //     }
    //     return this.tasksService.getFilteredTasks(filterKeys);
    // }

    @Get('/id/:id')
    getTaskById(@Param('id') id:string):Promise<Task>{
        return this.tasksService.getTaskById(id);
    }

    @Post()
    createTaskById(@Body() createTaskDto:createTaskDto):Promise<Task>{
        return this.tasksService.createTask(createTaskDto);
    }

    // @Post()
    // createTask(@Body() createTaskDto: createTaskDto): Task {
    //     return this.tasksService.createTask(createTaskDto);
    // }

    @Delete('deleteId/:id')
    deleteTaskById(@Param() id:string): Promise<void>{
        return this.tasksService.deleteTaskById(id);
    }

    // @Delete('/deleteId/:id')
    // deleteTaskById(@Param('id') id:string):Task{
    //     return this.tasksService.deleteTaskById(id);
    // }

    @Patch('id/:id/status')
    updateTaskById(@Param('id') id:string,
    @Body() updateTaskStatusDto:updateTaskStatusDto):Promise<Task>{
        const {status} = updateTaskStatusDto;
       return this.tasksService.updateTaskById(id,status);
    }

    // @Patch('/id/:id/status')
    // updateTaskById(@Param('id') id:string,
    // @Body('status') status:TaskStatus){
    //     return this.tasksService.updateTaskById(id,status);
    // }

}
