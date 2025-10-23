import { Body, Controller, Post } from "@nestjs/common";
import { ExecutorService } from "./executor.service";
import { runWorkFlowDto } from "./Dto/runWorkFlowDto";

@Controller('Executor')

export class ExecutorController{

    constructor(private ExcecutorService: ExecutorService){}
    @Post()
    async runWorkFlow(@Body() runWorkFlowDto: runWorkFlowDto){
        await this.ExcecutorService.runWorkflow(runWorkFlowDto)
    }
}