import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from 'mongoose';

export type LocationDocument = HydratedDocument<Location>;

@Schema({ timestamps: true })
export class Rating {


    @Prop({ type: String })
    _id: string;

    @Prop({ type: String, required: true })
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