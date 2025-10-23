import { IsNotEmpty, IsString, ValidateNested } from "@nestjs/class-validator"
import { workFlowStepDto } from "./CreateWorkFlowDto"



export class UpdateWorkFlowDto
{
    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @ValidateNested()
    steps: workFlowStepDto[]
}