import { IsEnum } from "class-validator";
import { payloadFormatEnum } from "src/Schemas/EndPoint.schema";


export class PayloadSchemaDto{
    @IsEnum(payloadFormatEnum, {message: "method must be one of json, xml, csv"})
      format: payloadFormatEnum;
      schema?: Record<string, any>; //for JSON
      example?: any;
}