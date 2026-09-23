import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { LocationsResponseDto } from './dto/response-locations.dto.js';
import { LocationsCreateDto } from './dto/create-locations.dto.js';
import { LocationsService } from './locations.service.js';
import { LocationsUpdateDto } from './dto/update-locations.dto.js';

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

    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: LocationsUpdateDto): LocationsResponseDto {
        return this.service.update(id, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: string): LocationsResponseDto {
        return this.service.remove(id);
    }
}
