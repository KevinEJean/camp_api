import { IsArray, IsDate, IsNotEmpty, IsNumber, IsString, Matches } from 'class-validator';
import { Locations } from "../../locations/entities/locations.entity.js";
import { Util } from "../../util/utils.js";

export class Ratings {

    @IsString()
    @IsNotEmpty()
    @Matches(/^[rev_](\d{2}[A-Z]{4}\d{2})$/)
    _id!: string;

    @IsString()
    @IsNotEmpty()
    @Matches(/^[plc_](\d{2}[A-Z]{3}\d{3})$/)
    placeId!: Locations['_id'];
    
    @IsString()
    @IsNotEmpty()
    authorName!: string;

    @IsNumber()
    @IsNotEmpty()
    rating!: number;

    @IsString()
    @IsNotEmpty()
    comment!: string;

    @IsDate()
    createdAt: Date;

    @IsDate()
    updatedAt: Date;

    constructor(placeId: Locations['_id'], authorName: string, rating: number, comment: string) {
        const util = new Util();
        this._id = `rev_01${util.getRandomID(true, 4)}${util.getRandomID(false, 2)}`;
        this.placeId = placeId;
        this.authorName = authorName;
        this.rating = rating;
        this.comment = comment;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
}