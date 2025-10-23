import { stepTypeEnum, transformValueTypeEnum, WorkFlowStep } from "src/Schemas/WorkFlowStep.schema";
import { StepHandler } from "./StepHandler";
import { HttpException } from "@nestjs/common";
import { log } from "console";
import { extractValue } from "./executorHelper";


export class TransformStepHandler implements StepHandler
{
    CanHandle(step: WorkFlowStep): boolean {
        return step.type === stepTypeEnum.transform ?true :false;
    }
    Execute(step: WorkFlowStep, input: any, baseUrl?: string): Promise<any> 
    {
        log("Transform step handler running...............................")
         const output: any = {};
        if(!step.transform){ throw new HttpException("Transform rules empty", 404)}

        for(const rule of step.transform){
            log("ValueType: ", rule.ValueType)
            log("Destination field: ", rule.DestinationField)
            if(!rule.DestinationField){throw new HttpException("Destination Field not found", 404)}
            if(rule.ValueType == transformValueTypeEnum.defaultValue){
                output[rule.DestinationField] = rule.DefaultValue;
            }

            else if(rule.ValueType == transformValueTypeEnum.mapValue){
                if(!rule.SourceField){throw new HttpException("Destination Field not found", 404)}              

                // if the response data fron http call is array .. we have to select field upon conditions
                //log("input:", input)
                // if(Array.isArray(input)){
                //     log("Is Array")
                //     if(rule.arraySelector){
                //         log("Array selector")
                //         if(rule.arraySelector.index){
                //             log("has index")
                //             const item = input[rule.arraySelector.index];
                //             log("Item:", item)
                //             value =  extractValue(item, rule.SourceField)
                //             log("Value from index:", value)
                //         }

                //         else if(rule.arraySelector.filterField && rule.arraySelector.filterValue){
                //             // if(!rule.arraySelector?.filterField){
                //             //     throw new HttpException("", 404);
                //             // }
                //             log("Has filter field")
                //             const item = input.find(x => extractValue(x,rule.arraySelector?.filterField! ) == rule.arraySelector?.filterValue)
                //             value = item ? extractValue(item, rule.SourceField) :undefined;
                //         }
                //         else {
                //         // Default: take all
                //         log("Has not index nor filter")
                //             value = input.map(item => extractValue(item, rule.SourceField!));
                //         }
                //     }
                //     else {
                //         log("Has not array selector")
                //         value = input.map(item => extractValue(item, rule.SourceField!));
                //     }
                // }

                // else{
                //     log("Is not array")
                //     value = extractValue(input, rule.SourceField);
                // }

                    const value = extractValue(input, rule.SourceField!, rule.arraySelector);
                    output[rule.DestinationField!] = value;

                log("VALUE: ", value)
                //output[rule.DestinationField] = value
            }

        }
        return Promise.resolve(output)
    }

//     //return value of obj or nested json obj
//    extractValue(data: any, path: string): any {
//         if (data == null) return undefined;
//         const parts = path.split('.');
//         let current = data;
//         for (const part of parts) {
//         if (current == null) return undefined;
//         current = current[part];
//         }
//         return current;
//     }
}