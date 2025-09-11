import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { WorkFlow } from "./WorkFlow.schema";
import mongoose from "mongoose";


@Schema()

export class Environment
{
    @Prop({required: true})
    name: string; // test, production

    @Prop({ required: true})
    BaseUrl: string;
    
    @Prop({ required: true })
    type: string; // apiKey, basic, oauth

    @Prop()
    apiKey?: string;

    @Prop()
    username?: string;

    @Prop()
    password?: string;

    @Prop()
    token?: string;

    @Prop({type: [{type: mongoose.Schema.ObjectId, ref: WorkFlow.name}]})
    WorkFlows : WorkFlow[]
}

export const EnvironmentSchema = SchemaFactory.createForClass(Environment)