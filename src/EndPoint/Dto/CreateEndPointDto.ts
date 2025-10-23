import { IsEnum, ValidateNested } from "@nestjs/class-validator";
import { IsNotEmpty, IsOptional } from "class-validator";
import { methodTypeEnum } from "src/Schemas/EndPoint.schema";
import { PayloadSchemaDto } from "./PayLoadSchemaDto";

export class CreateEndPointDto
{
    @IsNotEmpty()
    systemName: string;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsEnum(methodTypeEnum, { message: 'method must be one of get, post, patch, delete' })
    method: methodTypeEnum;

    @IsNotEmpty()
    path: string;

    @ValidateNested()
    @IsOptional()
    payloadSchema : PayloadSchemaDto;

    @ValidateNested()
    @IsOptional()
    responseSchema : PayloadSchemaDto
}