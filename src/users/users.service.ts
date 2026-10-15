import {
    BadRequestException,
    ConflictException,
    Injectable,
    NotFoundException
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersCreateDto } from './dto/create-users.dto.js';
import { UsersResponseDto } from './dto/response-users.dto.js';
import { Users } from './entities/users.entity.js';
import { UsersRepository } from './users.repository.js';
import { User } from './schemas/users.schema.js';
import { Permit } from 'permitio';

const SALT_ROUNDS = 10;

@Injectable()
export class UsersService {

    constructor(private readonly repository: UsersRepository, private readonly permit: Permit) { }

    async findAll(): Promise<User[]> {
        return await this.repository.findAll();
    }

    async findOne(id: string): Promise<User> {
        const user = await this.repository.findById(id);

        if (!user)
            throw new NotFoundException(`User with ID ("${id}") not found`);

        return user;
    }

    async findByNameWithPassword(name: string): Promise<User | null> {
        return await this.repository.findByNameWithPassword(name);
    }

    async create(dto: Partial<UsersCreateDto>): Promise<UsersResponseDto> {
        if (!dto?.name || !dto?.password)
            throw new BadRequestException("Request is missing at least one of these values : name / password");

        const existing = await this.repository.findByName(dto.name);
        if (existing)
            throw new ConflictException(`A user named ("${dto.name}") already exists`);

        const hash = await bcrypt.hash(dto.password, SALT_ROUNDS);

        const newUser = new Users( // pour ajouter l'id
            dto.name,
            hash
        );

        const createdUser: Partial<User> = {
            _id: newUser._id,
            name: newUser.name,
            password: newUser.password,
        };

        await this.repository.create(createdUser);

        await this.permit.api.users.sync({
            key: `${createdUser._id}`,
            first_name: createdUser.name,
            role_assignments: [{ role: 'User', tenant: 'default' }],
        })

        return { code: 201, ...createdUser };
    }

    async remove(id: string): Promise<UsersResponseDto> {
        const user = await this.findOne(id);

        await this.repository.deleteById(id);

        await this.permit.api.users.delete(`${user._id}`);

        return { code: 204 };
    }
}