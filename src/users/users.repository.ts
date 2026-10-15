import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/users.schema.js';

@Injectable()
export class UsersRepository {

    constructor(@InjectModel(User.name) private readonly userModel: Model<User>) { }

    async findAll(): Promise<User[]> {
        return await this.userModel.find().lean<User[]>().exec();
    }

    async findById(id: string): Promise<User | null> {
        return await this.userModel.findById(id).lean<User>().exec();
    }

    async findByName(name: string): Promise<User | null> {
        return await this.userModel.findOne({ name }).lean<User>().exec();
    }

    async findByNameWithPassword(name: string): Promise<User | null> {
        return await this.userModel.findOne({ name }).select('+password').lean<User>().exec();
    }

    async create(user: Partial<User>): Promise<User> {
        return await this.userModel.create(user);
    }

    async deleteById(id: string): Promise<void> {
        await this.userModel.findByIdAndDelete(id).exec();
    }
}