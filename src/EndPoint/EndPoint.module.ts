import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Environment, EnvironmentSchema } from "src/Schemas/Environment.schema";
import { System, SystemSchema } from "src/Schemas/System.schema";
import { EndPointController } from "./EndPoint.controller";
import { EndPointService } from "./EndPoint.service";
import { EndPoint, EndPointSchema } from "src/Schemas/EndPoint.schema";


@Module({
    imports: [MongooseModule.forFeature(
                    [{name : EndPoint.name,
                        schema : EndPointSchema
                    },
                    {name: System.name,
                        schema: SystemSchema
                    }]
                )],
    controllers: [EndPointController],
    providers: [EndPointService]
})

export class EndPointModule{}