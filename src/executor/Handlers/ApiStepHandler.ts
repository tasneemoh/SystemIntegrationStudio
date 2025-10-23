import { stepTypeEnum, WorkFlowStep } from "src/Schemas/WorkFlowStep.schema";
import { StepHandler } from "./StepHandler";
import axios from "axios";
import Ajv from "ajv";
import { HttpException, HttpStatus } from "@nestjs/common";
import { AuthenticationType, Environment } from "src/Schemas/Environment.schema";
import { log } from "console";

export class ApiStepHandler implements StepHandler
{
    private readonly ajv = new Ajv({ allErrors: true });

    CanHandle(step: WorkFlowStep): boolean {
        return step.type === stepTypeEnum.httpCall ?true :false;
    }


    async Execute(step: WorkFlowStep, input: any, baseUrl: string): Promise<any> 
    {
        //console.log("API step handler running ............ step:",  step)
        const endpoint = step.endpoint;
        if (!endpoint) throw new Error("Endpoint not defined for step");

        //validate payload
        // if (endpoint.payloadSchema?.schema){
            
        //     const validate = this.ajv.compile(endpoint.payloadSchema.schema);
        //     console.log("after compile");
            
        //     const valid = validate(input);
        //     if (!valid){
        //         console.log("Payload validation errors:", validate.errors);
        //         //throw new Error(`Invalid payload: ${ajv.errorsText(validate.errors)}`);
        //         throw new HttpException({
        //             message: "Invalid payload",
        //             details: this.ajv.errorsText(validate.errors),
        //             }, HttpStatus.BAD_REQUEST);
        //         }
        // }


        if (!step.endpoint) {
        throw new HttpException('Endpoint is missing for this step', 400);
        }
       // log(`BASE: ${baseUrl} ........ path : ${step.endpoint.path}`)
        const fullUrl = new URL(step.endpoint.path, baseUrl).toString();

        try{

            const headers: Record<string, string> = {
            'Accept': 'application/json',
            };
            let apiKey = step.environment.authType == AuthenticationType.apiKey ? step.environment.apiKey :undefined;
            if (apiKey) {
            headers['x-api-key'] = apiKey;
            }

            //console.log("URL: ", fullUrl)
            //log("payload: ", input)
            //log("method", step.endpoint?.method)

            const response = await axios({
            method: step.endpoint?.method,
            url: fullUrl,// `${baseUrl}${step.endpoint?.path}`,
            data: input,
            headers : headers
            });
            //console.log("response: ", response.data);

              if (response.status >= 200 && response.status < 300) {
                //console.log(`[API STEP SUCCESS] URL ${fullUrl} response: ${response}`);
                log("Response: ", response.data)
                return response.data;
            }
            
             console.warn(`[API STEP WARNING] ${endpoint.method} ${fullUrl} -> ${response.status}`);
            throw new HttpException(
                {
                message: `API responded with status ${response.status}`,
                details: response.data,
                },
                response.status, // use the actual status
            );


        }
        catch(error){
            if (axios.isAxiosError(error)) {
                const status = error.response?.status || 500;
                throw new HttpException(
                {
                    message: `Axios request failed`,
                    details: error.response?.data || error.message,
                },
                status,
                );
            }

            // Non-Axios error (unexpected)
            throw new HttpException(
                { message: 'Unexpected error in API handler', details: error.message },
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
}