import { System } from "./System.schema";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { EndPoint } from "./EndPoint.schema";
import mongoose from "mongoose";
import { Environment } from "./Environment.schema";


export enum stepTypeEnum{
  httpCall = 'httpcall',
  transform = 'transform',
  delay = 'delay'
}

export enum FieldTypeEnum{
  string = 'string',
  boolean = 'boolean',
  date = 'date',
  number = 'number'
}

export enum transformValueTypeEnum{
  defaultValue = 'defaultValue',
  //concat = 'concat',
  //formatDate = 'formatDate',
  mapValue = 'mapValue'
}

export class arraySelector {
  index? : number;
  filterField? : string;
  filterValue? : string;
}

export class TransformRule
{
    @Prop({ required: true })
  SourceField?: string;

    @Prop({ required: false })
  DestinationField?: string;

    @Prop({ required: false, enum: FieldTypeEnum })
  DestinationFieldType?: FieldTypeEnum;

  DefaultValue?: string;

    @Prop({ enum: transformValueTypeEnum, required: true })
  ValueType : transformValueTypeEnum;

  @Prop()
    arraySelector?: arraySelector
}



@Schema()
export class WorkFlowStep {
  @Prop({ required: true, enum: stepTypeEnum })
  type: stepTypeEnum; // e.g., httpCall, transform, delay

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'System'})
  system?: System;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: EndPoint.name})
  endpoint?: EndPoint;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: Environment.name})
  environment: Environment;

  @Prop({ type: [TransformRule], default: [] })
  transform?: TransformRule[]
}

export const WorkFlowStepSchema = SchemaFactory.createForClass(WorkFlowStep)