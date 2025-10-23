import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export enum methodTypeEnum{
    GET = 'get',
    POST = 'post',
    PATCH = 'patch',
    DELETE = 'delete'
}
export enum payloadFormatEnum
{
    JSON = 'json',
    XML = 'xml',
    CSV = 'csv',
}


@Schema({ _id: false }) 
export class PayloadSchema {
  @Prop({ required: true, enum: payloadFormatEnum })
  format: payloadFormatEnum;

  @Prop({ type: Object })
  schema?: Record<string, any>; //for JSON

  @Prop({ type: Object })
  example?: any;
}
export const PayloadSchemaSchema = SchemaFactory.createForClass(PayloadSchema);

@Schema()
export class EndPoint
{
    name: string

    @Prop({required: true, enum: methodTypeEnum})
    method: methodTypeEnum

    @Prop({required: true})
    path: string

    @Prop({type: PayloadSchemaSchema})
    payloadSchema : PayloadSchema

    @Prop({type: PayloadSchemaSchema})
    responseSchema : PayloadSchema
}

export const EndPointSchema = SchemaFactory.createForClass(EndPoint)

