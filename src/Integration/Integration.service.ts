import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Integration } from "src/Schemas/Integration.schema";
import { CreateIntegrationDto } from "./Dto/CreateIntegrationDto";
import { System } from "src/Schemas/System.schema";


@Injectable({})
export class IntegrationService
{
    constructor(@InjectModel(Integration.name) private integrationModel: Model<Integration>,
                @InjectModel(System.name) private SystemModel: Model<System>){}

    async CreateIntegration({SystemName, ...createIntegrationDto}: CreateIntegrationDto)
    {
        const system = await this.SystemModel.findOne({Name: SystemName});
        if(!system) throw new HttpException("System Not found", 404)

        const newIntegration = new this.integrationModel(createIntegrationDto);
        //without a wait .. a promise obj type is returned.. that mean "pending data" .. we should have to use .then() or await
        const savedIntegration = await newIntegration.save()

        await system.updateOne({$push: {Integrations: savedIntegration}});
        
        return savedIntegration;
    }

}