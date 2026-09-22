import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { RatingsService } from './ratings.service.js';
import { RatingsResponseDto } from './dto/response-ratings.dto.js';
import { RatingsCreateDto } from './dto/create-ratings.dto.js';
import { RatingsUpdateDto } from './dto/update-ratings.dto.js';
import { Ratings } from './entities/ratings.entity.js';

@Controller('ratings')
export class RatingsController {

    private readonly service = new RatingsService();

    @Get()
    findAll(): Ratings[] {
        return this.service.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): RatingsResponseDto {
        return this.service.findOne(id);
    }

    @Post()
    create(@Body() dto: RatingsCreateDto): RatingsResponseDto {
        return this.service.create(dto);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: RatingsUpdateDto): RatingsResponseDto {
        return this.service.update(id, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: string): RatingsResponseDto {
        return this.service.remove(id);
    }
}
