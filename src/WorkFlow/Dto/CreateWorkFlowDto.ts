import { IsEnum, IsNotEmpty, IsOptional, ValidateNested } from "@nestjs/class-validator";
import { Type } from "class-transformer";
import { IsString } from "class-validator";
import { arraySelector, FieldTypeEnum, stepTypeEnum, transformValueTypeEnum } from "src/Schemas/WorkFlowStep.schema";

export class TransformRuleDto
{
    @IsOptional()
    @IsString()
    SourceField?: string;

    @IsOptional()
    @IsString()
    DestinationField?: string;

    @IsOptional()
    @IsEnum(FieldTypeEnum, {message: 'Field type must be one of : string, boolean, number, date'})
    DestinationFieldType?: FieldTypeEnum;

    @IsOptional()
    @IsString()
    DefaultValue?: string;

    @IsNotEmpty()
    @IsEnum(transformValueTypeEnum, {message: 'Field type must be one of : defaultValue, mapValue'})
    ValueType : transformValueTypeEnum;

    arraySelector: arraySelector
}

export class workFlowStepDto
{
    @IsNotEmpty()
    @IsEnum(stepTypeEnum, { message: 'step type must be one of httpcall, transform' })
    type: stepTypeEnum;

    @IsOptional()
    @IsString()
    systemName?: string;

    @IsOptional()
    @IsString()
    endpointId?: string;

    @IsOptional()
    @IsString()
    EnvironmentId? : string;

    @ValidateNested({each: true})
    @Type(() => TransformRuleDto)
    @IsOptional()
    transform? : TransformRuleDto[];// Record<string, string>;
}

export class CreateWorkFlowDto
{
    @IsNotEmpty()
    @IsString()
    name: string

    @IsString()
    IntegrationId: string

    @IsNotEmpty()
    @ValidateNested()
    steps: workFlowStepDto[]
}