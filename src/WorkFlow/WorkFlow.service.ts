import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { WorkFlow } from "src/Schemas/WorkFlow.schema";
import { CreateWorkFlowDto, workFlowSteps } from "./Dto/CreateWorkFlowDto";
import { Integration } from "src/Schemas/Integration.schema";
import { Environment } from "src/Schemas/Environment.schema";


@Injectable()

export class WorkFlowService
{
    constructor(@InjectModel(WorkFlow.name) private WorkFlowModel: Model<WorkFlow>,
                @InjectModel(Integration.name) private IntegrationModel: Model<Integration>,
            @InjectModel(Environment.name) private EnvironmentModel: Model<Environment>){}

    async CreateWorkFlow({IntegrationName, EnvironmentName, ...createWorkFlowDto}: CreateWorkFlowDto)
    {
        const Integration = this.IntegrationModel.findOne({name: IntegrationName});
        if(!Integration) { throw new HttpException("Integration not found", 404)}

        const Environment = this.EnvironmentModel.findOne({name: IntegrationName});
        if(!Environment) { throw new HttpException("Environment not found", 404)}

        const newWorkFlow = new this.WorkFlowModel(createWorkFlowDto);
        const savedWorkFlow = await newWorkFlow.save();
        Integration.updateOne({$push: {WorkFlows: savedWorkFlow}})
        Environment.updateOne({$push: {WorkFlows: savedWorkFlow}})
        return savedWorkFlow;
    }

    async getWorkFlows()
    {
        return this.WorkFlowModel.find().populate(Integration.name)
    }
}