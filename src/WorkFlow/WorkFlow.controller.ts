import { Body, Controller, Get, Param, Patch, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { WorkFlowService } from "./WorkFlow.service";
import { CreateWorkFlowDto } from "./Dto/CreateWorkFlowDto";
import { UpdateWorkFlowDto } from "./Dto/UpdateWorkFlow";


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

    @Patch(":id")
    async updateWorkFlow(@Param("id") id: string, updateWorkFlowDto: UpdateWorkFlowDto){
        return await this.workFlowService.updateWorkFlow(id, updateWorkFlowDto);
    }
}