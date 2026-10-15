import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Category } from '../enums/category.enum.js';
import { Status } from '../enums/status.enum.js';

export type LocationDocument = HydratedDocument<Location>;

@Schema({ timestamps: true })
export class Location {

    @Prop({ type: String })
    _id: string;

    @Prop({ type: String, required: true, unique: true })
    name!: string;

    @Prop({ type: String, required: true })
    description!: string;

    @Prop({ type: String, required: true, enum: Object.values(Category) })
    category!: Category;

    @Prop({ type: String, required: true })
    address!: string;

    @Prop({ type: String, default: [] })
    services?: string[];

    @Prop({ type: String, default: Status.ACTIVE, enum: Object.values(Status) })
    status?: Status;

    @Prop({ type: Number, default: null })
    averageRating: number | null;

    @Prop({ type: Number, default: 0 })
    reviewCount: number;
}

export const LocationSchema = SchemaFactory.createForClass(Location);