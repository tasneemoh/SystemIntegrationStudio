import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Environment } from "src/Schemas/Environment.schema";
import { CreateEnvironmentDto } from "./Dto/CreateEnvironmentDto";
import { System } from "src/Schemas/System.schema";


@Injectable()

export class EnvironmentService
{
    constructor(@InjectModel(Environment.name) private EnvironmentModel: Model<Environment>,
@InjectModel(System.name) private SystemModel: Model<System>  ){}

    async CreateEnvironment({SystemName,...createEnvironmentDto}: CreateEnvironmentDto)
    {
        const system = this.SystemModel.find({Name: SystemName});
        if(!system) {throw new HttpException("System Not found", 404)}

        const newEnvironment = new this.EnvironmentModel(createEnvironmentDto);
        const savedEnv = await newEnvironment.save()
        await system.updateOne({$push: {Environments: savedEnv}});

        return savedEnv;
    }
}