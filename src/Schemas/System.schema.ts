import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { Integration } from "./Integration.schema";
import { Environment } from "./Environment.schema";
import { EndPoint } from "./EndPoint.schema";


@Schema()

export class System
{
    @Prop({ Required: true})
    Name : string;

    // @Prop({ required: true})
    // BaseUrl: string;

    // // Embedded Obj
    // @Prop({type: Auth})
    // Auth: 
    // {
    //     type: string;
    //     apiKey? : string;
    //     username?: string;
    //     password? : string ;
    //     token? : string;
    // }

    @Prop({type: [{type : mongoose.Schema.ObjectId, ref: Environment.name}]})
    Environments: Environment []

    @Prop({type: [{type: mongoose.Schema.ObjectId, ref: Integration.name}]})
    Integrations : Integration[]

    @Prop({type: [{type: mongoose.Schema.ObjectId, ref: EndPoint.name}]})
    EndPoints : EndPoint[]
}

export type SystemDocument = System & Document;

export const SystemSchema = SchemaFactory.createForClass(System);