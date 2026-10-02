import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Rating extends Document {

    @Prop({ required: true })
    placeId!: string;
    
    @Prop({ required: true })
    authorName!: string;

    @Prop({ required: true })
    rating!: number;

    @Prop({ required: true })
    comment!: string;

    @Prop({ default: Date.now() })
    createdAt: Date;

    @Prop({ default: Date.now() })
    updatedAt: Date;
}

export const RatingSchema = SchemaFactory.createForClass(Rating);