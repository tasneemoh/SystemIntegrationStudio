import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { WorkFlow } from "src/Schemas/WorkFlow.schema";
import { CreateWorkFlowDto } from "./Dto/CreateWorkFlowDto";
import { Integration } from "src/Schemas/Integration.schema";
import { Environment } from "src/Schemas/Environment.schema";
import { System } from "src/Schemas/System.schema";
import { EndPoint } from "src/Schemas/EndPoint.schema";
import { WorkFlowStep } from "src/Schemas/WorkFlowStep.schema";
import path from "path";
import { updateEndPointDto } from "src/EndPoint/Dto/UpdateEndPointDto";


@Injectable()

export class WorkFlowService
{
    constructor(@InjectModel(WorkFlow.name) private WorkFlowModel: Model<WorkFlow>,
                @InjectModel(Integration.name) private IntegrationModel: Model<Integration>,
                @InjectModel(Environment.name) private EnvironmentModel: Model<Environment>,
                @InjectModel(System.name) private SystemModel: Model<System>,
                @InjectModel(EndPoint.name) private EndPointModel: Model<EndPoint>,
                @InjectModel(WorkFlowStep.name) private WorkFlowStepModel: Model<WorkFlowStep>){}

    async CreateWorkFlow({IntegrationId,steps, ...createWorkFlowDto}: CreateWorkFlowDto)
    {
        const Integration = await this.IntegrationModel.findById(IntegrationId);
        if(!Integration) { throw new HttpException("Integration not found", 404)}

        const newWorkFlow = new this.WorkFlowModel({
            ...createWorkFlowDto, 
            steps: []
            });

        for(const stepDto of steps)
        {
            let System : any;
            let Environment : any;
            let EndPoint : any;


            console.log("System name:", stepDto.systemName);

            if(stepDto.systemName){
                 System = await this.SystemModel.findOne({Name: stepDto.systemName})
                if(!System){
                    throw new HttpException(`System ${stepDto.systemName} not found`, 404)
                }
            }

            if(stepDto.EnvironmentId){
                Environment = await this.EnvironmentModel.findById(stepDto.EnvironmentId)
                if(!Environment){
                    throw new HttpException(`Environment ${stepDto.EnvironmentId} not found`, 404)
                }
            }

            if(stepDto.endpointId){
                EndPoint = await this.EndPointModel.findById( stepDto.endpointId)
                if(!EndPoint){
                    throw new HttpException(`EndPoint ${stepDto.endpointId} not found`, 404)
                }
            }

            const step = {
                type: stepDto.type,
                system:  System ??undefined,
                endpoint : EndPoint ?? undefined,
                environment : Environment ?? undefined,
                transform : stepDto.transform
            }


            const newStep = new this.WorkFlowStepModel(step);
            const savedStep = await newStep.save();
            newWorkFlow.steps.push(savedStep);

        }
        const savedWorkFlow = await newWorkFlow.save();

        await Integration.updateOne({$push: {WorkFlows: savedWorkFlow}})
        //Environment.updateOne({$push: {WorkFlows: savedWorkFlow}})
        return savedWorkFlow;
    }

    async getWorkFlows()
    {
        return this.WorkFlowModel.find()
        .populate({path: "steps",
            populate: [
                {path: "environment"},
                 {path: "endpoint"},
                {path: "system"}]}
        )
    }

    async updateWorkFlow(id, UpdateWorkFlowDto){

        const workFlow = this.WorkFlowModel.findByIdAndUpdate(id, UpdateWorkFlowDto);
        if(!workFlow){
            throw new HttpException("Workflow not found", 404)
        }
        return workFlow;
    }
}