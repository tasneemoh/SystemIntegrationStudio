import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { WorkFlowStep } from "./WorkFlowStep.schema";


@Schema()

export class WorkFlow 
{
    @Prop({required: true})
    name: string

    //embedded workFlow step.. nest it inside the parent "workflow" instead of making a new collection ..
    //schema provides validation, fields, types "seperated document"
    @Prop({type: [WorkFlowStep] , default : []})
    steps: WorkFlowStep[]
}

export type WorkFlowDocument = WorkFlow & Document

export const WorkFlowSchema = SchemaFactory.createForClass(WorkFlow)