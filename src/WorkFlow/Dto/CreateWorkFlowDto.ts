import { IsNotEmpty } from "@nestjs/class-validator";
import { isString, IsString } from "class-validator";

export class workFlowSteps
{
    @IsNotEmpty()
    type: string
    system?: string;
    endpoint?: string;
    method?: string;
    transform? : Record<string, string>;
}

export class CreateWorkFlowDto
{
    @IsNotEmpty()
    @IsString()
    name: string

    @IsString()
    IntegrationName: string

    @IsString()
    EnvironmentName : string

    @IsNotEmpty()
    steps: workFlowSteps[]
}