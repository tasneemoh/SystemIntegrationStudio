import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Integration, IntegrationSchema } from "src/Schemas/Integration.schema";
import { System, SystemSchema } from "src/Schemas/System.schema";
import { IntegrationController } from "./Integration.controller";
import { IntegrationService } from "./Integration.service";


@Module({
    imports: [MongooseModule.forFeature(
            [{name : Integration.name,
                schema : IntegrationSchema
            },
            {name: System.name,
                schema: SystemSchema
            }]
        )],
    controllers :[IntegrationController],
    providers : [IntegrationService]
})

export class IntegrationModule {}