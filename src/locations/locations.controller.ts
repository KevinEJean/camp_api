import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { LocationsResponseDto } from './dto/response-locations.dto.js';
import { LocationsCreateDto } from './dto/create-locations.dto.js';
import { LocationsService } from './locations.service.js';

@Controller('locations')
export class LocationsController {

    private readonly service = new LocationsService();

    @Get()
    findAll(): LocationsCreateDto[] {
        return this.service.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): LocationsResponseDto {
        return this.service.findOne(id);
    }

    @Post()
    create(@Body() dto: LocationsCreateDto) {
        return this.service.create(dto);
    }
}
