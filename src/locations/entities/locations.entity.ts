import { IsArray, IsDate, IsNotEmpty, IsNumber, IsString, Matches } from 'class-validator';
import { Status } from '../enums/status.enum.js';
import { Category } from '../enums/category.enum.js';
import { Util } from '../../util/utils.js';

export class Locations {

    @IsString()
    @IsNotEmpty()
    @Matches(/^[plc_](\d{2}[A-Z]{3}\d{3})$/)
    _id!: string;

    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsString()
    @IsNotEmpty()
    description!: string;

    @IsString()
    @IsNotEmpty()
    category!: Category;

    @IsString()
    @IsNotEmpty()
    address!: string;

    @IsArray()
    @IsString({ each: true })
    services?: string[] = [];

    @IsString()
    status?: Status = Status.ACTIVE;

    @IsNumber()
    averageRating: number | null;

    @IsNumber()
    reviewCount: number;

    @IsDate()
    createdAt: Date;

    @IsDate()
    updatedAt: Date;

    constructor(name: string, description: string, category: Category, address: string, services?: string[], status?: Status) {
        const util = new Util();
        this._id = `plc_01${util.getRandomID(true, 3)}${util.getRandomID(false, 3)}`;
        this.name = name;
        this.description = description;
        this.category = category;
        this.address = address;
        this.services = services;
        this.status = status;
        this.averageRating = null; // check if ratings exists (float)
        this.reviewCount = 0 // check if reviews exists (int)
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
}