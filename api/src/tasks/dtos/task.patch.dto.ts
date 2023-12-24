import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { TaskPostDto } from "./task.post.dto";

export class TaskPatchDto extends TaskPostDto {}
