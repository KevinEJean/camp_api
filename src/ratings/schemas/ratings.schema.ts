import { Prop, SchemaFactory } from "@nestjs/mongoose";
import { Locations } from "../../locations/entities/locations.entity.js";

export class Rating extends Document {

    @Prop({ required: true })
    placeId!: Locations['_id'];
    
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

const RatingSchema = SchemaFactory.createForClass(Rating);