import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { System, SystemSchema } from "../Schemas/System.schema";
import { SystemController } from "./System.controller";
import { SystemService } from "./System.service";

@Module({
    imports : [MongooseModule.forFeature(
        [{name : System.name,
            schema : SystemSchema
        }]
    )],
    controllers : [SystemController],
    providers : [SystemService],
})

export class SystemModule {}