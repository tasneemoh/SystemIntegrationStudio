import { HttpException, Injectable } from "@nestjs/common";
import { CreateEndPointDto } from "./Dto/CreateEndPointDto";
import { InjectModel } from "@nestjs/mongoose";
import { EndPoint } from "src/Schemas/EndPoint.schema";
import { Model } from "mongoose";
import { System } from "src/Schemas/System.schema";
import { Mode } from "fs";
import { updateEndPointDto } from "./Dto/UpdateEndPointDto";


@Injectable()

export class EndPointService
{
    constructor(@InjectModel(EndPoint.name) private EndPointModel: Model<EndPoint>,
                @InjectModel(System.name) private systemModel: Model<System>){}

    async CreateEndPoint({systemName, ...createEndPointDto}: CreateEndPointDto)
    {
        const system = await this.systemModel.findOne({Name: systemName});
        if(!system){throw new HttpException("System Not found", 404)}

        const newEndPoint = new this.EndPointModel(createEndPointDto);
        const savedEndPoint = await newEndPoint.save();

        await system.updateOne({$push: {EndPoints: savedEndPoint}});

        return savedEndPoint;
    }


    async updateEndPoint(id:string, updateEndPointDto: updateEndPointDto){
        const endPoint = await this.EndPointModel.findByIdAndUpdate(id, updateEndPointDto);
        if(!endPoint){
            throw new HttpException("End point not found", 404);
        }
        return endPoint;


    }
}