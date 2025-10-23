import { IsEnum, IsNotEmpty, IsOptional, ValidateNested } from "@nestjs/class-validator";
import { methodTypeEnum } from "src/Schemas/EndPoint.schema";
import { PayloadSchemaDto } from "./PayLoadSchemaDto";


export class updateEndPointDto{

    @IsEnum(methodTypeEnum, { message: 'method must be one of get, post, patch, delete' })
    method: methodTypeEnum;
    
    path: string;

    @ValidateNested()
    @IsOptional()
    payloadSchema : PayloadSchemaDto;

    @ValidateNested()
    @IsOptional()
    responseSchema : PayloadSchemaDto;
}