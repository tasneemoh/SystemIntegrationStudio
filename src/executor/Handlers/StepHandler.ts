import { WorkFlowStep } from "src/Schemas/WorkFlowStep.schema";


export interface StepHandler
{
    CanHandle(step: WorkFlowStep) : boolean;
    Execute(step: WorkFlowStep, input: any, baseUrl: string): Promise<any>;
}