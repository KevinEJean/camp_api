import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Category } from '../enums/category.enum.js';
import { Status } from '../enums/status.enum.js';
import Util from '../../util/utils.js';

export type LocationDocument = HydratedDocument<Location>;

@Schema({ timestamps: true })
export class Location {

    @Prop({ type: String })
    _id: string;

    @Prop({ required: true, unique: true })
    name!: string;

    @Prop({ required: true })
    description!: string;

    @Prop({ required: true })
    category!: Category;

    @Prop({ required: true })
    address!: string;

    @Prop({ required: false, default: [] })
    services?: string[];

    @Prop({ required: false, default: Status.ACTIVE })
    status?: Status;

    @Prop({ default: null })
    averageRating: number;

    @Prop({ default: 0 })
    reviewCount: number;

    constructor() {
        const util = new Util();
        this._id = `plc_01${util.getRandomID(true, 3)}${util.getRandomID(false, 3)}`;
    }
}

export const LocationSchema = SchemaFactory.createForClass(Location);