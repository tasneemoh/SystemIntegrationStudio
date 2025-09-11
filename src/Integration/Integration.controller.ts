import { Body, Controller, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { IntegrationService } from "./Integration.service";
import { CreateIntegrationDto } from "./Dto/CreateIntegrationDto";


@Controller('Integration')

export class IntegrationController 
{
    constructor(private IntegrationService: IntegrationService){}

    @Post()
    @UsePipes(new ValidationPipe())
    async AddIntegration(@Body() createIntegrationDto: CreateIntegrationDto)
    {
        return await this.IntegrationService.CreateIntegration(createIntegrationDto);
    }
}