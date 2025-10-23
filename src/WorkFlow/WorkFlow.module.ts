import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { WorkFlow, WorkFlowSchema } from "src/Schemas/WorkFlow.schema";
import { WorkFlowController } from "./WorkFlow.controller";
import { WorkFlowService } from "./WorkFlow.service";
import { Integration, IntegrationSchema } from "src/Schemas/Integration.schema";
import { Environment, EnvironmentSchema } from "src/Schemas/Environment.schema";
import { System, SystemSchema } from "src/Schemas/System.schema";
import { EndPoint, EndPointSchema } from "src/Schemas/EndPoint.schema";
import { WorkFlowStep, WorkFlowStepSchema } from "src/Schemas/WorkFlowStep.schema";


@Module({
    imports: [MongooseModule.forFeature(
            [{name : WorkFlow.name,
                    schema : WorkFlowSchema
                },
                {
                    name: Integration.name,
                    schema : IntegrationSchema
                },
                {
                    name: Environment.name,
                    schema : EnvironmentSchema
                },
                {
                    name: System.name,
                    schema : SystemSchema
                },
                {
                    name: EndPoint.name,
                    schema : EndPointSchema
                },
                {
                    name: WorkFlowStep.name,
                    schema : WorkFlowStepSchema
                }
            ]
            )],
    controllers : [WorkFlowController],
    providers: [WorkFlowService]
})

export class WorkFlowModule{}
