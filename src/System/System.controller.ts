import { Body, Controller, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { CreateSystemDto } from "./Dto/CreateSystremDto";
import { SystemService } from "./System.service";


@Controller('System')

export class SystemController 
{
    constructor(private systemService : SystemService){}

    @Post()
    @UsePipes(new ValidationPipe())
    async CreateSystem(@Body() createSystemDto: CreateSystemDto)
    {
        return await this.systemService.CreateSystem(createSystemDto);
    }
}