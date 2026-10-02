import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Category } from '../enums/category.enum.js';
import { Status } from '../enums/status.enum.js';

@Schema()
export class Location extends Document {
    @Prop({ required: true, unique: true })
    name!: string;

    @Prop({ required: true })
    description!: string;

    @Prop({ required: true })
    category!: Category;

    @Prop({ required: true })
    address!: string;

    @Prop({ required: false })
    services?: string[] = [];

    @Prop({ required: false })
    status?: Status = Status.ACTIVE;

    @Prop({ required: true })
    averageRating: number | null;

    @Prop({ default: 0 })
    reviewCount: number;

    @Prop({ default: Date.now() })
    createdAt: Date;

    @Prop({ default: Date.now() })
    updatedAt: Date;
}

export const LocationSchema = SchemaFactory.createForClass(Location);