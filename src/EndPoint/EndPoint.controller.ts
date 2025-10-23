import { Body, Controller, HttpException, Param, Patch, Post, Put, UsePipes, ValidationPipe } from "@nestjs/common";
import { CreateEndPointDto } from "./Dto/CreateEndPointDto";
import { EndPointService } from "./EndPoint.service";
import { updateEndPointDto } from "./Dto/UpdateEndPointDto";
import { isValidObjectId } from "mongoose";


@Controller('EndPoint')

export class EndPointController
{
    constructor(private EndPointService: EndPointService){};


    @Post()
    @UsePipes(new ValidationPipe())
    async CreateEndPoint(@Body() CreateEndPointDto: CreateEndPointDto)
    {
        return await this.EndPointService.CreateEndPoint(CreateEndPointDto);
    }

    @Patch(':id')
    @UsePipes(new ValidationPipe())
    async updateEndPoint(@Param('id') id: string, @Body() updateEndPointDto: updateEndPointDto){
        var isValid = isValidObjectId(id);
        if(!isValid)
            throw new HttpException('Endpoint id in not valid', 400)
        return await this.EndPointService.updateEndPoint(id, updateEndPointDto);
    }
}