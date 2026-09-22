import { IsArray, IsDate, IsNotEmpty, IsNumber, IsString, Matches } from 'class-validator';
import { Status } from '../enums/status.enum.js';
import { Category } from '../enums/category.enum.js';

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

    private static getRandomID(isstring: boolean): string {
        const chars = isstring ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' : '0123456789';
        let result = '';
        for (let i = 0; i < 3; i++) {
            result += chars.at(Math.floor(Math.random() * chars.length))
        }
        return result;
    }

    constructor(name: string, description: string, category: Category, address: string, services?: string[], status?: Status) {
        this._id = `plc_01${Locations.getRandomID(true)}${Locations.getRandomID(false)}`;
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