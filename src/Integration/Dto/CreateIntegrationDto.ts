import { IsNotEmpty, IsString } from "@nestjs/class-validator";


export class CreateIntegrationDto
{
    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    SystemName : string
}