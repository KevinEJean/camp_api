import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
    @ApiProperty({
        description: "Nom de l'utilisateur.",
        example: 'jean_dupont',
    })
    @IsNotEmpty()
    @IsString()
    name!: string;

    @ApiProperty({
        description: "Mot de passe de l'utilisateur.",
        format: 'password',
        example: 'MotDePasse123!',
    })
    @IsNotEmpty()
    password!: string;
}