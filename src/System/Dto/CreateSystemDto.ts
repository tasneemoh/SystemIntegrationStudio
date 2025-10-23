import { IsNotEmpty, IsString, ValidateNested } from "@nestjs/class-validator";
import { Type } from "class-transformer";
import { IsObject, IsOptional } from "class-validator";

export class Auth{
    @IsNotEmpty()
    type: string;

    @IsOptional()
    apiKey : string;

    @IsOptional()
    username : string;

    @IsOptional()
    password: string;

    @IsOptional()
    token: string;
}

export class CreateSystemDto
{
    @IsNotEmpty()
    @IsString()
    Name : string;

    // @IsNotEmpty()
    // @IsString()
    // BaseUrl : string;

    // @IsNotEmpty()
    // @ValidateNested()
    // @Type(() => Auth)
    // Auth: Auth;
}

