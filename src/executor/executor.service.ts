import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WorkFlow } from 'src/Schemas/WorkFlow.schema';
import { ApiStepHandler } from './Handlers/ApiStepHandler';
import { stepTypeEnum } from 'src/Schemas/WorkFlowStep.schema';
import { TransformStepHandler } from './Handlers/TransformStepHandler';
import { runWorkFlowDto } from './Dto/runWorkFlowDto';
import path from 'path';

@Injectable()
export class ExecutorService {

    constructor(@InjectModel(WorkFlow.name)private workFlowModel: Model<WorkFlow>,
                private apiStepHandler: ApiStepHandler,
            private transformStepHandler: TransformStepHandler){}

    async runWorkflow(runWorkFlowDto: runWorkFlowDto) {

        const workflow = await this.workFlowModel.findById(runWorkFlowDto.workFlowId)
        .populate({ path: "steps",
        populate : [{path: "system"},
        { path : "endpoint"},
        {path: "environment"}
        ]});


        if(!workflow){throw new HttpException('WorkFlowNotFound',404);}

        let context = runWorkFlowDto.input;
        let index = 1;
        for (const step of workflow.steps) {
            //console.log(`step ${index} type ${step.type}`)
            if (step.type === stepTypeEnum.httpCall) {
                context = await this.apiStepHandler.Execute(step, context, step.environment.BaseUrl);

            } else if (step.type === stepTypeEnum.transform) {
                context = await this.transformStepHandler.Execute(step, context, undefined);
            }

            console.log(`step ${index} done.. `)
            index ++;
        }
        return context;
    }
}
