import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {

    @Prop({ type: String, required: true })
    _id!: string;

    @Prop({ type: String, required: true, unique: true, trim: true })
    name!: string;

    @Prop({ type: String, required: true, select: false })
    password!: string;

    @Prop({ default: Date.now() })
    createdAt?: Date;
    
    @Prop({ default: Date.now() })
    updatedAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);