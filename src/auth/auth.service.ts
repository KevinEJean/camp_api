import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/Login.dto.js';
import { SigninDto } from './dto/Signin.dto.js';
import { UsersService } from '../users/users.service.js';
import { UsersResponseDto } from '../users/dto/response-users.dto.js';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwt: JwtService
  ) { }

  async login(dto: LoginDto): Promise<{ access_token: string }> {
    const user = await this.userService.findByNameWithPassword(dto.name);

    const passwordMatches = user
      ? await bcrypt.compare(dto.password, user.password)
      : false;

    if (!user || !passwordMatches)
      throw new UnauthorizedException('Invalid name or password.');

    const access_token = await this.jwt.signAsync({ sub: user._id });

    return { access_token };
  }

  async signin(dto: SigninDto): Promise<UsersResponseDto> {
    if (dto.password !== dto.passwordConfirmation)
      throw new BadRequestException("Passwords do not match.");

    return await this.userService.create({ name: dto.name, password: dto.password });
  }
}