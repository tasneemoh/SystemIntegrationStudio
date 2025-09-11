import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Environment, EnvironmentSchema } from "src/Schemas/Environment.schema";
import { System, SystemSchema } from "src/Schemas/System.schema";
import { EnvironmentController } from "./Environment.controller";
import { EnvironmentService } from "./Environment.service";


@Module({
    imports: [MongooseModule.forFeature(
                [{name : Environment.name,
                    schema : EnvironmentSchema
                },
                {name: System.name,
                    schema: SystemSchema
                }]
            )],
    controllers : [EnvironmentController],
    providers : [EnvironmentService]
})

export class EnvironmentModule {}