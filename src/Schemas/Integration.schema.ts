import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { WorkFlow } from "./WorkFlow.schema";
import mongoose from "mongoose";


@Schema()

export class Integration
{
    @Prop({required: true})
    name: string;

    @Prop({type: [{type: mongoose.Schema.ObjectId, ref: WorkFlow.name}]})
    WorkFlows: WorkFlow[]
}

export const IntegrationSchema = SchemaFactory.createForClass(Integration)