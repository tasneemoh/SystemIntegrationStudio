import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { WorkFlow, WorkFlowSchema } from "src/Schemas/WorkFlow.schema";
import { WorkFlowController } from "./WorkFlow.controller";
import { WorkFlowService } from "./WorkFlow.service";
import { Integration, IntegrationSchema } from "src/Schemas/Integration.schema";
import { Environment, EnvironmentSchema } from "src/Schemas/Environment.schema";


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
            }]
            )],
    controllers : [WorkFlowController],
    providers: [WorkFlowService]
})

export class WorkFlowModule{}
