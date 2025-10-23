import { IsNotEmpty } from "@nestjs/class-validator";


export class runWorkFlowDto{

    @IsNotEmpty()
    workFlowId : string;

     input: any
}