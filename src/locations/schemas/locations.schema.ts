import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Category } from '../enums/category.enum.js';
import { Status } from '../enums/status.enum.js';

@Schema({ timestamps: true })
export class Location extends Document {
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

    @Prop({ default: Date.now() })
    createdAt: Date;

    @Prop({ default: Date.now() })
    updatedAt: Date;
}

export const LocationSchema = SchemaFactory.createForClass(Location);