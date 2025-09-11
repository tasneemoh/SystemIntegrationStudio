import { Body, Controller, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { EnvironmentService } from "./Environment.service";
import { CreateEnvironmentDto } from "./Dto/CreateEnvironmentDto";


@Controller('Environment')

export class EnvironmentController 
{
    constructor(private EnvironmentService: EnvironmentService ){}

    @Post()
    @UsePipes(new ValidationPipe())
    async CreateEnvironment(@Body()createEnvironmentDto: CreateEnvironmentDto)
    {
        return await this.EnvironmentService.CreateEnvironment(createEnvironmentDto);
    }
}