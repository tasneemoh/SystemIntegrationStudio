import { Injectable, Post } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { System, SystemDocument } from "../Schemas/System.schema";
import { Model } from "mongoose";
import { CreateSystemDto } from "./Dto/CreateSystremDto";


@Injectable({})

export class SystemService {
    constructor(@InjectModel(System.name) private systemModel: Model<SystemDocument>){}

    async CreateSystem(createSystemDto : CreateSystemDto)
    {
        const newSystem = new this.systemModel(createSystemDto);
        //newSystem.isNew = false;
        return await newSystem.save();
    }
}