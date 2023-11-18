import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { TaskStatus } from "./task-status.enum";
import { IsEnum } from "class-validator";

@Entity()
export class Task{
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column()
    tittle:string;

    @Column()
    description:string;

    @Column()
    @IsEnum(TaskStatus)
    status: TaskStatus;
}
