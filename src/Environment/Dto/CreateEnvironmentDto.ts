import { IsNotEmpty } from "@nestjs/class-validator";
import { IsOptional } from "class-validator";
import { AuthenticationType } from "src/Schemas/Environment.schema";


export class CreateEnvironmentDto 
{
    @IsNotEmpty()
    name: string;
    
    @IsNotEmpty()
    BaseUrl: string;

    @IsNotEmpty()
    authType: AuthenticationType;
    @IsOptional()
    apiKey?: string;

    @IsOptional()
    username?: string;

    @IsOptional()
    password?: string;

    @IsOptional()
    token?: string;

    @IsNotEmpty()
    SystemName : string

}