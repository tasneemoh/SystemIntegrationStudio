import { IsNotEmpty } from "@nestjs/class-validator";
import { IsOptional } from "class-validator";


export class CreateEnvironmentDto 
{
    @IsNotEmpty()
    name: string;
    
    @IsNotEmpty()
    BaseUrl: string;

    @IsNotEmpty()
    type: string; 
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