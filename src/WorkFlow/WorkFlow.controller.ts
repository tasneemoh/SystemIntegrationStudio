import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { WorkFlowService } from "./WorkFlow.service";
import { CreateWorkFlowDto } from "./Dto/CreateWorkFlowDto";


@Controller('WorkFlow')

export class WorkFlowController 
{
    constructor(private workFlowService: WorkFlowService){}

    @Post()
    @UsePipes(new ValidationPipe())
    async CreateWorkFlow(@Body() createWorkFlowDto: CreateWorkFlowDto)
    {
        return await this.workFlowService.CreateWorkFlow(createWorkFlowDto);
    }

    @Get()
    async getWorkFlows()
    {
        return await this.workFlowService.getWorkFlows();
    }
}